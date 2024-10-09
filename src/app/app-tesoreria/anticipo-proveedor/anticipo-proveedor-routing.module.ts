import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { ListaAnticiposProveedorComponent } from './lista-anticipos-proveedor/lista-anticipos-proveedor.component';

const routes: Routes = [
  {
    path: '', component: ListaComponent,
  },
  {
    path:":id/anticipos-list",
    component:ListaAnticiposProveedorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnticipoProveedorRoutingModule { }
