import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultComponent } from './consult.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IdComponent } from './pages/id/id.component';
import { PlateComponent } from './pages/plate/plate.component';
import { PlateInformationComponent } from './pages/plate-information/plate-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdInformationComponent } from './pages/id-information/id-information.component';

@NgModule({
  declarations: [
    ConsultComponent,
    IdComponent, 
    PlateComponent, 
    PlateInformationComponent,
    IdInformationComponent,
  ],
  imports: [
    CommonModule, 
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ConsultModule { }
