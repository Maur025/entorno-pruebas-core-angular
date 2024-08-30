import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { ListFondoRendirEmpleadoComponent } from './list-fondo-rendir-empleado/list-fondo-rendir-empleado.component';

const routes: Routes = [
  {
    path: '', component: ListaComponent
  },
  {
    path:":id/desembolso-list",
    component:ListFondoRendirEmpleadoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FondoRendirRoutingModule { }
