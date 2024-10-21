import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicializacionComponent } from './inicializacion/inicializacion.component';

const routes: Routes = [
  { path: "", component: InicializacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicializacionRoutingModule { }
