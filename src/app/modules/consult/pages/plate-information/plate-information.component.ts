import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultService } from '../../services/consult.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-plate-information',
  templateUrl: './plate-information.component.html',
  styleUrls: ['./plate-information.component.scss'],
})
export class PlateInformationComponent  implements OnInit {

  public selectedSegment: string = 'data';
  public strPlaca: any;
  public strNumeroPlaca:any;
  public strId:any;
  public strdescripcion:any;
  public strtipoelemento:any;
  public strnumerovigencia:any;
  public strnumeroingreso:any;
  public strvalorhistorico:any;
  public strcantidadvidautil:any;
  public strfechaservicio:any;
  public strubicacion:any;
  public strcuentacontable:any;
  public strnumeroserial:any;
  public strmarca:any;
  public strmodelo:any;
  public strreferencia:any;
  public strestadoelemento:any;
  public strcodigo:any;
  public strdependencia:any;
  public strtiporesponsable:any;
  public strinternofuncionarioresp:any;
  public strcodigoidentificacion:any;
  public strresponsable:any;
  public strsede:any;
  public strpiso:any;
  public strmodulo:any;
  public strpuesto:any;

  constructor(
    private consultService: ConsultService,
    private route: ActivatedRoute, 
    private loadingController: LoadingController, 
    private alertController: AlertController, 
    private router: Router
  ) { }

  async ngOnInit() {
    this.strPlaca =  this.route.snapshot.paramMap.get('id')?.toString();
    const loading = await this.loadingController.create({
      message: 'Consultando la placa...',
      duration: 30000,
    });
    loading.present();
    this.consultService.consultPlate(this.strPlaca).subscribe({
      next: async (response) => {
        loading.dismiss();
        if (response.body.codError != 0) {
          await this.presentErrorAlert();
        } else {
          this.strNumeroPlaca=response.body.respuesta[0].numero_placa;
          this.strId=response.body.respuesta[0].id;
          this.strdescripcion=response.body.respuesta[0].descripcion;
          this.strtipoelemento=response.body.respuesta[0].tipo_elemento;
          this.strnumerovigencia=response.body.respuesta[0].numero_vigencia;
          this.strnumeroingreso=response.body.respuesta[0].numero_ingreso;
          this.strvalorhistorico=response.body.respuesta[0].valor_historico;
          this.strcantidadvidautil=response.body.respuesta[0].cantidad_vida_util;
          this.strfechaservicio=response.body.respuesta[0].fecha_servicio;
          const date = new Date(this.strfechaservicio);
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();  
          this.strfechaservicio= `${day}-${month}-${year}`;
          this.strubicacion==response.body.respuesta[0].ubicacion;
          this.strcuentacontable=response.body.respuesta[0].cuenta_contable;
          this.strnumeroserial=response.body.respuesta[0].numero_serial;
          this.strmarca=response.body.respuesta[0].marca;
          this.strmodelo=response.body.respuesta[0].modelo;
          this.strreferencia=response.body.respuesta[0].referencia;
          this.strestadoelemento=response.body.respuesta[0].estado_elemento;
          this.strcodigo=response.body.respuesta[0].codigo;
          this.strdependencia=response.body.respuesta[0].dependencia;
          this.strtiporesponsable=response.body.respuesta[0].tipo_responsable;
          this.strnumerovigencia=response.body.respuesta[0].numero_vigencia;
          this.strinternofuncionarioresp=response.body.respuesta[0].interno_funcionario_resp;
          this.strcodigoidentificacion=response.body.respuesta[0].codigo_identificacion;
          this.strresponsable=response.body.respuesta[0].responsable;
          this.strsede=response.body.respuesta[0].sede;
          this.strpiso=response.body.respuesta[0].piso;
          this.strmodulo=response.body.respuesta[0].modulo;
          this.strpuesto=response.body.respuesta[0].puesto;
        }
      }, 
      error: async (error) => {
        loading.dismiss();
        await this.presentErrorAlert();
      }
    });
  }

  public async presentErrorAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se encontraron datos para la placa ingresada.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/umv/consult/plate']);
        }
      }],
    });
    await alert.present();
  }

}
