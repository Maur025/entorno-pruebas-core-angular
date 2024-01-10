import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagoContadoComponent } from './pago-contado/pago-contado.component';
import { FormularioPagosComponent } from './pago-contado/formulario/formulario.component';
import { ListaPagosComponent } from './pago-contado/lista/lista.component';
import { TransaccionesKafkaComponent } from './transacciones-kafka/transacciones-kafka.component';
import { ListaTransaccionesComponent } from './transacciones-kafka/lista/lista.component';

const routes: Routes = [
  { path: 'pagoContado', component: PagoContadoComponent, children:[
    {path: '', component: ListaPagosComponent},
    {path: 'editar/:id', component: FormularioPagosComponent},
  ]},
  { path: 'transaccionesKafka', component: TransaccionesKafkaComponent, children:[
    {path: '', component: ListaTransaccionesComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
