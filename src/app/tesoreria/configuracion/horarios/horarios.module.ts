import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { HorariosRoutingModule } from './horarios-routing.module';
import { HorariodiaModule } from '../horariodia/horariodia.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    HorariodiaModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class HorariosModule { }
