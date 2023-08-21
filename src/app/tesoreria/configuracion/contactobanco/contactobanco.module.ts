import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { ContactobancoRoutingModule } from './contactobanco-routing.module';
import { ContactoModule } from '../contacto/contacto.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    ContactobancoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    ContactoModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class ContactobancoModule { }
