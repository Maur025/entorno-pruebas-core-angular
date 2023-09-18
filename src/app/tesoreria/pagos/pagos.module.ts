import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { PagosRoutingModule } from './pagos-routing.module';
import { DeudorModule } from '../deudor/deudor.module';
import { TipopagoModule } from '../tipopago/tipopago.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    DeudorModule,
TipopagoModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class PagosModule { }
