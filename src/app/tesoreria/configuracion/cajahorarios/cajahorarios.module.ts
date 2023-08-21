import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { CajahorariosRoutingModule } from './cajahorarios-routing.module';
import { HorariosModule } from '../horarios/horarios.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    CajahorariosRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    HorariosModule,
UsuariosModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class CajahorariosModule { }
