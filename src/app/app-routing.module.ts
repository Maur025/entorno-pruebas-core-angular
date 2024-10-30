import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { Page404Component } from './extrapages/page404/page404.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./app-tesoreria/app-tesoreria.module').then(m => m.AppTesoreriaModule), canActivate: [AuthGuard],data:{roles: ["kbi-admin"]} },
  { path: '', component: LayoutComponent, loadChildren: () => import('./tesorery/tesorery.module').then(m => m.TesoreryModule), canActivate: [AuthGuard],data:{roles: ["kbi-admin"]} },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule) },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
