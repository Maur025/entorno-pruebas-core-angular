import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
    { path: "", component: ListaComponent },
    { path: ":id", component: FormularioComponent },
    { path: "nuevo", component: FormularioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadRoutingModule { }
