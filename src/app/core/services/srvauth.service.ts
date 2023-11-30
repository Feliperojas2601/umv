import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class SrvauthService {
  userSession: any;
  private KEY_LENGTH = 10;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'events'
  };

  constructor(private http: HttpClient) 
  { 
  }
  
  async login(loginData:any){
    const urlLogin = "https://testfront.umv.gov.co/SiCapital-backend/api/usuario/login"
    try{
      let bodyLogin = {
        usuario: loginData.username,
        username: loginData.username,
        password: loginData.password
      }
      const response: any = await lastValueFrom(this.http.post<any>(urlLogin, bodyLogin,this.httpOptions));
      let encontro:Boolean=false;
      if (response.codError=0)
      {
        encontro=true;
      }
      this.userSession = {
        login: response.body.respuesta[0].login,
        idUsuario: response.body.respuesta[0].id_usuario,
        nombre: response.body.respuesta[0].nombre,
        id_entidad: response.body.respuesta[0].id_entidad,
        id_localidad: response.body.respuesta[0].codigo_localidad,
        token: response.headers.get('token')
      }       
      this.saveSession(this.userSession);
      return {sucess:true,msj:response.msgError};
    }
    catch(error:any){
      let entrar:boolean=false;
      if(error.status==200){
        entrar=true;
      }
      if(error.status==401){
        entrar=false;
      }
      return -1;
    }
  }

  private saveSession(authResult:any){
    localStorage.setItem('localData',authResult);
  }

  getToken(){
    return this.userSession?.token;
  }
  
  logout(){
    localStorage.removeItem("localData");
    this.userSession = null;
  }

  
  getExpiration() {
    const expiration = this.userSession?.expiresAt;
    if(!expiration){
      return null;
    }
    const expiresAt = expiration !== null ?JSON.parse(expiration):null;
    return expiresAt;
  }

}
