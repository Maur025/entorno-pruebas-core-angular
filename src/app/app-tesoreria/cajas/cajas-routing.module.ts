import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { MovimientoCajaListComponent } from './movimiento-caja-list/movimiento-caja-list.component';

const routes: Routes = [
  {
    path: '', component: ListaComponent,
  },
  {
    path:":id/caja",
    component:MovimientoCajaListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajasRoutingModule { }
