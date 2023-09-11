import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { EntidadestipoentidadRoutingModule } from './entidadestipoentidad-routing.module';
import { TipoentidadModule } from '../tipoentidad/tipoentidad.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    EntidadestipoentidadRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    TipoentidadModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class EntidadestipoentidadModule { }
