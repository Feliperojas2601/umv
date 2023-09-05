import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
    { 
        path: 'umv', 
        component: ModulesComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                redirectTo: 'consult',
                pathMatch: 'full'
            },
            {
                path: 'consult',
                loadChildren: () => import('./consult/consult-routing.module').then(m => m.ConsultRoutingModule)
            }, 
        ]
    },
];

@NgModule({    
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ModulesRoutingModule {}