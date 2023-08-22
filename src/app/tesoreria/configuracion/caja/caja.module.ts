import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { CajaRoutingModule } from './caja-routing.module';
import { FondoModule } from '../fondo/fondo.module';
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
    FondoModule,
CajahorariosModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class CajaModule { }
