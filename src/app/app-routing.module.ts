import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { ModulesRoutingModule } from './modules/modules-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), 
    AuthRoutingModule, 
    ModulesRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
