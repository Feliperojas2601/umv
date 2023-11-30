import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 
    }),
	  observe: 'response' as 'events',
  };

  constructor(private http: HttpClient, private authService: AuthService ) { }

  public consultPlate(plate:string): Observable<any> {
    const body = {
      usuario: this.authService.getLoginData(),
      filtro: `CODIGO_PLACA='${plate}'`,
      operacion: 'pr_consulta_x_placa_appmovil'
    }
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post(`${baseUrl}/consultar/consultarSAI`, body, this.httpOptions);
  }

  public consultId(id:string): Observable<any> {
    const body = {
      usuario: this.authService.getLoginData(),
      filtro: `IDENTIFICACION='${id}'`,
      operacion: 'pr_consulta_x_identificacion_appmovil'
    }
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post(`${baseUrl}/consultar/consultarSAI`, body, this.httpOptions);
  }
}
