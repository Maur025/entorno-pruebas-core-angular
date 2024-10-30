import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormularioModuloComponent } from './formulario/formulario.component';

const routes: Routes = [
  { path: ":modulo_id/lista", component: ListaComponent },
  { path: ":modulo_id/formulario/:transaccion_id/tipo/:codigo_proceso/:esquema_id", component: FormularioModuloComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
