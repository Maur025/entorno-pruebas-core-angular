import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { FondoRoutingModule } from './fondo-routing.module';
import { FondoresponsablesModule } from '../fondoresponsables/fondoresponsables.module';
import { FondocentrodecostosModule } from '../fondocentrodecostos/fondocentrodecostos.module';
import { FondoformacobroModule } from '../fondoformacobro/fondoformacobro.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    FondoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    FondoresponsablesModule,
FondocentrodecostosModule,
FondoformacobroModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class FondoModule { }
