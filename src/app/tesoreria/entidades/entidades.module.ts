import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { EntidadesRoutingModule } from './entidades-routing.module';
import { EntidadestipoentidadModule } from '../entidadestipoentidad/entidadestipoentidad.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    EntidadesRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    EntidadestipoentidadModule,
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class EntidadesModule { }
