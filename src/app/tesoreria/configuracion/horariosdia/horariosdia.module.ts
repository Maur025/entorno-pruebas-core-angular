import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { HorariosdiaRoutingModule } from './horariosdia-routing.module';
import { HorariosdiaService } from './servicios/horariosdia.service';


@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    HorariosdiaRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ],
  providers: [
    HorariosdiaService
  ]
})
export class HorariosdiaModule { }
