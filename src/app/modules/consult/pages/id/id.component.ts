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

  public async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando la imagen...',
      duration: 30000,
    });
    loading.present();
  }

}
