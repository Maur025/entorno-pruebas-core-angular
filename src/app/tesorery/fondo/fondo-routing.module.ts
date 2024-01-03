import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FondosOperativosComponent } from './fondos-operativos/fondos-operativos.component';
import { FormularioOperativoComponent } from './fondos-operativos/formulario/formulario.component';
import { ListaOperativoComponent } from './fondos-operativos/lista/lista.component';
import { DetalleFondoComponent } from './fondos-operativos/detalle-fondo/detalle-fondo.component';

import { FondosCajaComponent } from './fondos-caja/fondos-caja.component';
import { FormularioCajaComponent } from './fondos-caja/formulario/formulario.component';
import { ListaCajaComponent} from './fondos-caja/lista/lista.component';

import { FondosRendirComponent } from './fondos-rendir/fondos-rendir.component';
import { ListaRendirComponent } from './fondos-rendir/lista/lista.component';
import { FormularioRendirComponent } from './fondos-rendir/formulario/formulario.component';
import { DetalleFondoRendirComponent } from './fondos-rendir/detalle-fondo/detalle-fondo.component';

const routes: Routes = [
  { path: 'operativos', component: FondosOperativosComponent, children:[
    {path: '', component: ListaOperativoComponent},
    {path: 'editar/:id', component: FormularioOperativoComponent},
    {path: 'detalleFondo/:id', component: DetalleFondoComponent},
  ]},
  { path: 'caja', component: FondosCajaComponent, children:[
    {path: '', component: ListaCajaComponent},
    {path: 'editar/:id', component: FormularioCajaComponent},
  ]},
  { path: 'rendir', component: FondosRendirComponent, children:[
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
