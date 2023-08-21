import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { FondoresponsablesRoutingModule } from './fondoresponsables-routing.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    FondoresponsablesRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class FondoresponsablesModule { }
