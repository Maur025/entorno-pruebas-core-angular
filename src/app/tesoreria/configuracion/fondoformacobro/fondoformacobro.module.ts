import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { FondoformacobroRoutingModule } from './fondoformacobro-routing.module';
import { FormacobroModule } from '../formacobro/formacobro.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    FondoformacobroRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    FormacobroModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class FondoformacobroModule { }
