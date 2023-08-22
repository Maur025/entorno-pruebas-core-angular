

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { DefaultComponent } from './default/default.component';
import { PaneldecontrolComponent } from './paneldecontrol/paneldecontrol.component';

const routes: Routes = [
    { path: "", component: DefaultComponent },
    { path: 'dashboard', component: DefaultComponent },
    { path: '', component: PaneldecontrolComponent },

    { path: 'configuracion', loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule )},
    { path: 'procedimientos', loadChildren: () => import('./procedimientos/procedimientos.module').then(m => m.ProcedimientosModule )},
    //{ path: 'clientes', loadChildren: () => import('./parametricas/clientes/clientes.module').then(m => m.ClientesModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class TesoreriaRoutingModule { }
