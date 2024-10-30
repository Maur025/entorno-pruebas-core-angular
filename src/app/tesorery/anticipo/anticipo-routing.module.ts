import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent as  ListaAplicacionComponent } from './aplicacion/lista/lista.component';
import { ListaComponent } from './lista/lista.component';


const routes: Routes = [
  {path:"", component: ListaComponent},
  // aplicacion
 {path:":id/aplicacion", component: ListaAplicacionComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnticipoRoutingModule { }
