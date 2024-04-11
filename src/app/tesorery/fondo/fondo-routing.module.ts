import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioOperativoComponent } from './fondos-operativos/formulario/formulario.component';
import { ListaOperativoComponent } from './fondos-operativos/lista/lista.component';
import { DetalleFondoComponent } from './fondos-operativos/detalle-fondo/detalle-fondo.component';

import { FormularioCajaComponent } from './fondos-caja/formulario/formulario.component';
import { ListaCajaComponent} from './fondos-caja/lista/lista.component';

import { ListaRendirComponent } from './fondos-rendir/lista/lista.component';
import { FormularioRendirComponent } from './fondos-rendir/formulario/formulario.component';
import { DetalleFondoRendirComponent } from './fondos-rendir/detalle-fondo/detalle-fondo.component';

const routes: Routes = [
  { path: 'operativos', children:[
    {path: '', component: ListaOperativoComponent},
    {path: 'editar/:id', component: FormularioOperativoComponent},
    {path: 'detalleFondo/:id', component: DetalleFondoComponent},
  ]},
  { path: 'caja', children:[
    {path: '', component: ListaCajaComponent},
    {path: 'editar/:id', component: FormularioCajaComponent},
  ]},
  { path: 'rendir', children:[
    {path: '', component: ListaRendirComponent},
    {path: 'editar/:id', component: FormularioRendirComponent},
    {path: 'detalleFondo/:id', component: DetalleFondoRendirComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FondoRoutingModule { }
