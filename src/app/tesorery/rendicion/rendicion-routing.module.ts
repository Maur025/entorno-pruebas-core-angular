import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: "", component: ListaComponent },
  { path: ":id", component: FormularioComponent },
  { path: "nuevo", component: FormularioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendicionRoutingModule { }
