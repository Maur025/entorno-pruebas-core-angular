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
  { path: 'entidad', loadChildren: () => import('./entidad/entidad.module').then(m => m.EntidadModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesoreryRoutingModule { }
