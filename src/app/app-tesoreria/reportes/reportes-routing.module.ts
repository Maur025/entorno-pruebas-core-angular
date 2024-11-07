import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteEstadoCuentaComponent } from './cliente-estado-cuenta/cliente-estado-cuenta.component';

const routes: Routes = [
  {
    path:":clientes-estado-cuentas",
    component:ClienteEstadoCuentaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
