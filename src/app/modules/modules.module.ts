import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesComponent } from './modules.component';
import { ConsultModule } from './consult/consult.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    ConsultModule,
    SharedModule, 
    RouterModule,
  ]
})
export class ModulesModule { }
