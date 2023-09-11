import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { EntidadcontactosRoutingModule } from './entidadcontactos-routing.module';
import { ContactoModule } from '../contacto/contacto.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    EntidadcontactosRoutingModule,
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
export class EntidadcontactosModule { }
