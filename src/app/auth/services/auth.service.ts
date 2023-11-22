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
      'Content-Type': 'application/json'
    }),
	  observe: 'response' as 'events',
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
