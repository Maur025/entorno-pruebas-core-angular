import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { CajaRoutingModule } from './caja-routing.module';
import { CajahorariosModule } from '../cajahorarios/cajahorarios.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    CajaRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    CajahorariosModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class CajaModule { }
