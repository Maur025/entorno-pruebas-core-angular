import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioPagosComponent } from './pago-contado/formulario/formulario.component';
import { ListaPagosComponent } from './pago-contado/lista/lista.component';
import { TransaccionesKafkaComponent } from './transacciones-kafka/transacciones-kafka.component';
import { ListaTransaccionesComponent } from './transacciones-kafka/lista/lista.component';
import { ListaProcesosComponent } from './procesos-automaticos/lista/lista.component';
import { FormularioProcesosComponent } from './procesos-automaticos/formulario/formulario.component';

const routes: Routes = [
  { path: 'pagoContado', children:[
    {path: '', component: ListaPagosComponent},
    {path: 'editar/:id', component: FormularioPagosComponent},
  ]},
  { path: 'procesosAutomaticos', children:[
    {path: '', component: ListaProcesosComponent},
    {path: 'editar/:id', component: FormularioProcesosComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
