import { Injectable } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'POST,GET,OPTIONS,DELETE',
      'Access-Control-Allow-Headers':'x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN'
    }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  public login(loginForm: LoginForm) : Observable<any> {
    const loginFormData = {
      ...loginForm,
      usuario: loginForm.username,
    }
    return this.http.post(`${baseUrl}/usuario/login`, loginFormData, this.httpOptions);
  }
}
