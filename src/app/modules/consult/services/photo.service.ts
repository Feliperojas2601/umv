import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { createWorker } from 'tesseract.js';
//import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx'; // Importa el plugin de escaneo de códigos de barras

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(
    //private barcodeScanner: BarcodeScanner
  ) {}

  public async addNewToGallery(): Promise<string | void> {
    let capturedPhoto: Photo;
    try {
      capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100
      });
    } catch (error) {
      console.error('Error photo.service.ts addNewToGallery getPhoto 1: ', error);
      return;
    }
      
    if (!capturedPhoto) {
      console.error('Error photo.service.ts addNewToGallery getPhoto 2: ', capturedPhoto);
      return;
    }

    /*let savedPhoto;
    try {
      savedPhoto = await this.savePicture(capturedPhoto);
    } catch (error) {
      console.error('Error photo.service.ts addNewToGallery savePicture: ', error);
      return;
    }

    if(!savedPhoto) {
      console.error('Error photo.service.ts addNewToGallery savePicture 2: ', savedPhoto);
      return;
    }

    const photoPath = savedPhoto.webviewPath || '';
    */
    const image = capturedPhoto.dataUrl || '';
    const text = await this.performOCR(image);
    return text;
  }

  private async savePicture(photo: Photo): Promise<{ filepath: string; webviewPath: string } | void> {
    let base64Data: string;
    try {
      base64Data = await this.readAsBase64(photo);
    } catch (error) {
      console.error('Error photo.service.ts savePicture readAsBase64: ', error);
      return;
    }

    if(!base64Data) {
      console.error('Error photo.service.ts savePicture readAsBase64 2: ', base64Data);
      return;
    }
  
    const fileName = Date.now() + '.jpeg';

    let savedFile;
    try {
      savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data
      });
    } catch (error) {
      console.error('Error photo.service.ts savePicture writeFile: ', error);
      return;
    }

    if(!savedFile) {
      console.error('Error photo.service.ts savePicture writeFile 2: ', savedFile);
      return;
    }
    
    return {
      filepath: fileName,
      webviewPath: photo.webPath || ''
    };
  }

  private async performOCR(imageUri: string): Promise<string> {
    let worker;
    try {
      worker = await createWorker();
    } catch (error) {
      console.error('Error photo.service.ts performOCR createWorker: ', error);
      return '';
    }

    if(!worker) {
      console.error('Error photo.service.ts performOCR createWorker 2: ', worker);
      return '';
    }

    try {
      await worker.load();
      await worker.loadLanguage('spa');
      await worker.initialize('spa');      
    } catch (error) {
      console.error('Error photo.service.ts performOCR load: ', error);
      return '';
    }

    let recognizeResponse;
    let text;
    try {
      recognizeResponse = await worker.recognize(imageUri); 
      text = recognizeResponse.data.text;
    } catch (error) {
      console.error('Error photo.service.ts performOCR recognize 1: ', error);
      return '';
    }

    if(!recognizeResponse || !text) {
      console.error('Error photo.service.ts performOCR recognize 2: ', recognizeResponse, text);
      return '';
    }

    try {
      await worker.terminate();
    } catch (error) {
      console.error('Error photo.service.ts performOCR terminate: ', error);
      return '';
    }

    return text;
  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
