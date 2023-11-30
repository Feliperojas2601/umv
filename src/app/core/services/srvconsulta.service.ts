import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapacitorException, ExceptionCode } from '@capacitor/core';
import { from } from 'rxjs';
import { SrvauthService } from '../../core/services/srvauth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SrvconsultaService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
      }),
  };

  constructor(private http: HttpClient, private srv:SrvauthService ) { }

  async consultaPLACA(loginData:any){
    const urlConsulta = "https://testfront.umv.gov.co/SiCapital-backend/api/consultar/consultarSAI";      
    try{
      let bodyQuery = {
        usuario:this.srv.userSession.login,
        filtro:"CODIGO_PLACA='"+ loginData  +"'",
        operacion:"pr_consulta_x_placa_appmovil"
      }
      let bodyQuery2 = "{'usuario':'"+this.srv.userSession.login+"','filtro:CODIGO_PLACA'='102867','operacion':'pr_consulta_x_placa_appmovil'}";
      let tok=this.srv.userSession.token;
      this.httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+tok
        }),
      };
      const rtaServidor: any = await lastValueFrom(this.http.post<any>(urlConsulta, bodyQuery,this.httpOptions));
      return rtaServidor;
    }
    catch(error:any){
      let entrar:boolean=false;
      if(error.status==200){
        entrar=true;
      }
      if(error.status==401){
        entrar=false;
      }
      return {sucess:false,msj:"excepcion Consulta Servicio"};
    }
  }

  async consultaIDE(loginData:any){
    //const urlConsulta = "https://e737f4db-b09a-4ad4-9e4a-da66acf04261.mock.pstmn.io/SiCapital-backend/api/consultar/consultarSAI";      
    const urlConsulta = "https://testfront.umv.gov.co/SiCapital-backend/api/consultar/consultarSAI";      
    try{
      let bodyLogin = {
        usuario: "jhon.cordero",
        filtro: "'IDENTIFICACION='79306337'",
        operacion: "pr_consulta_x_identificacion_appmovil"
      }
      let bodyQuery = {
        usuario:this.srv.userSession.login,
        filtro:"IDENTIFICACION='"+ loginData  +"'",
        operacion:"pr_consulta_x_identificacion_appmovil"
      }
      let tok=this.srv.userSession.token;
      this.httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+tok
        }),
      };
      const rtaServidor: any = await lastValueFrom(this.http.post<any>(urlConsulta, bodyQuery, this.httpOptions));
      console.log(rtaServidor.respuesta);      
      return rtaServidor;
    }
    catch(error:any){
      let entrar:boolean=false;
      if(error.status==200){
        entrar=true;
      }
      if(error.status==401){
        entrar=false;
      }
      return {sucess:false,msj:"excepcion Consulta Servicio"};
    }
  }


  
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.srv.getToken();
    if (idToken) {
          const cloned = req.clone({
              headers: req.headers.set("Authorization",
                  "Bearer " + idToken)
          });
          return next.handle(cloned).pipe(
         )
    }
    else {
      return next.handle(req).pipe(
      );
    }
  }

}
