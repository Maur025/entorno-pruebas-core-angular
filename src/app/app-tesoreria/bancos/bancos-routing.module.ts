import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { CuentaBancoListComponent } from './cuenta-banco-list/cuenta-banco-list.component';

const routes: Routes = [
  {
    path: '', component: ListaComponent,
  },
  {
    path:":id/cuenta-banco",
    component:CuentaBancoListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancosRoutingModule { }
