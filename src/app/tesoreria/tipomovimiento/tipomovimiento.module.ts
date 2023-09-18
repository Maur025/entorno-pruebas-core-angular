import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { TipomovimientoRoutingModule } from './tipomovimiento-routing.module';


@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    TipomovimientoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class TipomovimientoModule { }
