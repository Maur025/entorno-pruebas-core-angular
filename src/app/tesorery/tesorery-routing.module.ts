import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaneldecontrolComponent } from '../tesoreria/paneldecontrol/paneldecontrol.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [


  { path: "", component: InicioComponent },
  { path: 'dashboard', component: InicioComponent },
  { path: '', component: PaneldecontrolComponent },
  { path: "banco", loadChildren: () => import('./banco/banco.module').then(m => m.BancoModule) },
  { path: "anticipo", loadChildren: () => import('./anticipo/anticipo.module').then(m => m.AnticipoModule) },
  { path: "entidad", loadChildren: () => import('./entidad/entidad.module').then(m => m.EntidadModule) },
  { path: "fondo", loadChildren: () => import('./fondo/fondo.module').then(m => m.FondoModule) },
  { path: "configuracion", loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule) },
  { path: "rendicion", loadChildren: () => import('./rendicion/rendicion.module').then(m => m.RendicionModule) },
  { path: "devengado", loadChildren: () => import('./devengado/devengado.module').then(m => m.DevengadoModule) },
  { path: "credito", loadChildren: () => import('./credito/credito.module').then(m => m.CreditoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesoreryRoutingModule { }
