import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FondosOperativosComponent } from './fondos-operativos/fondos-operativos.component';
import { FormularioComponent } from './fondos-operativos/formulario/formulario.component';
import { ListaComponent } from './fondos-operativos/lista/lista.component';
import { DetalleFondoComponent } from './fondos-operativos/detalle-fondo/detalle-fondo.component';


const routes: Routes = [
  { path: 'operativos', component: FondosOperativosComponent, children:[
    {path: '', component: ListaComponent},
    {path: 'editar/:id', component: FormularioComponent},
    {path: 'detalleFondo/:id', component: DetalleFondoComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FondoRoutingModule { }
