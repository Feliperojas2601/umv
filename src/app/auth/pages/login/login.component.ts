import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from '../../interfaces/login-form.interface';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup; 
  public loginFormValue!: LoginForm; 

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public loginUser(): void {
    this.loginFormValue = this.loginForm.value as LoginForm;
    this.authService.login(this.loginFormValue).subscribe({
      next: (response) => {
        this.loginForm.reset();
        this.router.navigate(['/umv/consult']);
      },
      error: async (error) => {
        console.log(error);
        this.loginForm.reset();
        let message = '';
        if (error.status === 401){
          message = JSON.parse(error.error.respuesta[0].json).msgError;
        } else if (error.status === 0) {
          message = error.message;
        } 
        await this.presentErrorAlert(this.setMessage(message));
      }
    });
  }

  public async presentErrorAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  public setMessage(message: string){
    if (message === 'USUARIO NO EXISTE EN CALIOPE'){
      return 'El usuario no existe en el sistema.';
    } else if (message === 'Login Fallido Usuario o clave incorrectos.'){
      return 'Nombre de usuario o contraseña incorrectos.';
    } else if (message === 'Http failure response for https://testfront.umv.gov.co/SiCapital-backend/api/usuario/login: 0 Unknown Error') {
      return 'CORS error.';
    } else {
      return 'Error desconocido.';
    }
  }

}
