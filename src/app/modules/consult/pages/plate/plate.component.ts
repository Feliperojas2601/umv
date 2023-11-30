import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent  implements OnInit {

  public plateForm!: FormGroup; 
  public text: string | void = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private photoService: PhotoService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.plateForm = this.fb.group({
      plate: ['', Validators.required]
    });
  }

  public consultPlate(): void {
    this.router.navigate(['/umv/consult/plate-information', this.plateForm.get('plate')?.value]);
    this.plateForm.reset();
  }

  public async scan(): Promise<void> {
    this.showLoading();
    this.text = await this.photoService.scan()
    if (!this.text) {
      this.text = '';
    }
    this.text = this.text.replace(/[^0-9]/g, '');
    await this.loadingCtrl.dismiss();
    this.plateForm.patchValue({
      plate: this.text
    });
  }

  public async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando la imagen...',
      duration: 30000,
    });
    loading.present();
  }
}
