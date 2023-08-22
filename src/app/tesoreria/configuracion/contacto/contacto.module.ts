import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactogrupoModule } from '../contactogrupo/contactogrupo.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    ContactoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    ContactogrupoModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class ContactoModule { }
