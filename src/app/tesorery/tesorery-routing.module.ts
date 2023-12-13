import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaneldecontrolComponent } from '../tesoreria/paneldecontrol/paneldecontrol.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [


  { path: "", component: InicioComponent },
  { path: 'dashboard', component: InicioComponent },
  { path: '', component: PaneldecontrolComponent },
  { path: "banco", loadChildren: () => import('./banco/banco.module').then(m => m.BancoModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesoreryRoutingModule { }
