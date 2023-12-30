import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FondosOperativosComponent } from './fondos-operativos/fondos-operativos.component';
import { FormularioComponent as FormularioOperativoComponent} from './fondos-operativos/formulario/formulario.component';
import { ListaComponent as ListaoperativoComponent} from './fondos-operativos/lista/lista.component';
import { DetalleFondoComponent } from './fondos-operativos/detalle-fondo/detalle-fondo.component';

import { FondosCajaComponent } from './fondos-caja/fondos-caja.component';
import { FormularioCajaComponent } from './fondos-caja/formulario/formulario.component';
import { ListaCajaComponent} from './fondos-caja/lista/lista.component';


const routes: Routes = [
  { path: 'operativos', component: FondosOperativosComponent, children:[
    {path: '', component: ListaoperativoComponent},
    {path: 'editar/:id', component: FormularioOperativoComponent},
    {path: 'detalleFondo/:id', component: DetalleFondoComponent},
  ]},
  { path: 'caja', component: FondosCajaComponent, children:[
    {path: '', component: ListaCajaComponent},
    {path: 'editar/:id', component: FormularioCajaComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FondoRoutingModule { }
