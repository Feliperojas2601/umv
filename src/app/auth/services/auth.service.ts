import { Injectable } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  public login(loginForm: LoginForm) : Observable<any> {
    const loginFormData = {
      ...loginForm,
      usuario: loginForm.username,
    }
    return this.http.post(`${baseUrl}/usuario/login`, loginFormData);
  }
}
