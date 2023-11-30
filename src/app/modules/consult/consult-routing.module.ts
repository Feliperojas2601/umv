import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsultComponent } from './consult.component';
import { PlateComponent } from './pages/plate/plate.component';
import { IdComponent } from './pages/id/id.component';
import { PlateInformationComponent } from './pages/plate-information/plate-information.component';
import { IdInformationComponent } from './pages/id-information/id-information.component';

const routes: Routes = [
    { 
        path: '', 
        component: ConsultComponent,
    },
    {
        path: 'plate',
        component: PlateComponent,
    },
    {
        path: 'id',
        component: IdComponent,
    },
    {
        path: 'plate-information/:id',
        component: PlateInformationComponent,
    },
    {
        path: 'id-information/:id',
        component: IdInformationComponent,
    }
];

@NgModule({    
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConsultRoutingModule {}