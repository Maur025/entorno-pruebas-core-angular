import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { TipopagoviaRoutingModule } from './tipopagovia-routing.module';
import { ViasModule } from '../vias/vias.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    TipopagoviaRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    ViasModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class TipopagoviaModule { }
