import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { VariablesconfiguracionRoutingModule } from './variablesconfiguracion-routing.module';
import { TipodatoModule } from '../tipodato/tipodato.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    VariablesconfiguracionRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    TipodatoModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class VariablesconfiguracionModule { }
