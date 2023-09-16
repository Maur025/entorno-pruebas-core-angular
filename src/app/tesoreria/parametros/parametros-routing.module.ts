

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
{ path: 'variablesconfiguracion', loadChildren: () => import('./variablesconfiguracion/variablesconfiguracion.module').then(m => m.VariablesconfiguracionModule  )},

{ path: 'tipodato', loadChildren: () => import('./tipodato/tipodato.module').then(m => m.TipodatoModule  )},


];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
