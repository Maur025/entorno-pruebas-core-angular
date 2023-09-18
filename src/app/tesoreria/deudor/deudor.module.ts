import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { DeudorRoutingModule } from './deudor-routing.module';
import { EntidadesModule } from '../entidades/entidades.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    DeudorRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    EntidadesModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class DeudorModule { }
