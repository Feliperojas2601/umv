import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.scss'],
})
export class IdComponent  implements OnInit {
  public idForm!: FormGroup; 
  public text: string | void = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private photoService: PhotoService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.idForm = this.fb.group({
      clientId: ['', Validators.required]
    });
  }

  public consultId(): void {
    this.router.navigate(['/umv/consult/id-information',this.idForm.get('clientId')?.value]);
    this.idForm.reset();
  }

  public async scan(): Promise<void> {
    this.showLoading();
    this.text = await this.photoService.scan()
    if (!this.text) {
      this.text = '';
    }
    // deja texto con solo caracteres numericos
    this.text = this.text.replace(/[^0-9]/g, '');
    await this.loadingCtrl.dismiss();
    this.idForm.patchValue({
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
