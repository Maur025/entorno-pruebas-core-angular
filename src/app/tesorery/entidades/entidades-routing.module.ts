import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent as FormEntidadesComponent } from './lista/lista.component';
import { FormularioComponent as ListaEntidadesComponent  } from './formulario/formulario.component';

const routes: Routes = [
  /* ruta de entidades*/
  {path:"", component: ListaEntidadesComponent},
  {path:'id/:id', component: FormEntidadesComponent},
  {path:'nuevo', component: FormEntidadesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesRoutingModule { }
