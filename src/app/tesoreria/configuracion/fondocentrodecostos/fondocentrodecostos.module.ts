import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { FondocentrodecostosRoutingModule } from './fondocentrodecostos-routing.module';
import { CentrodecostosModule } from '../centrodecostos/centrodecostos.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    FondocentrodecostosRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    CentrodecostosModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class FondocentrodecostosModule { }
