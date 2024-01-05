import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagoContadoComponent } from './pago-contado/pago-contado.component';
import { FormularioPagosComponent } from './pago-contado/formulario/formulario.component';
import { ListaPagosComponent } from './pago-contado/lista/lista.component';

const routes: Routes = [
  { path: 'pagoContado', component: PagoContadoComponent, children:[
    {path: '', component: ListaPagosComponent},
    {path: 'editar/:id', component: FormularioPagosComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
