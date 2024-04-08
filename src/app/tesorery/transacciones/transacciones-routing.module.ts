import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioModuloComponent } from './modulos/formulario/formulario.component';
import { ListaComponent } from './modulos/lista/lista.component';

const routes: Routes = [
  { path: 'modulo', loadChildren: () => import('./modulos/modulos.module').then(m => m.ModulosModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionesRoutingModule { }
