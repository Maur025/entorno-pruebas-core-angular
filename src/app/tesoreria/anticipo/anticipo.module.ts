import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { AnticipoRoutingModule } from './anticipo-routing.module';
import { DocumentoModule } from '../documento/documento.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    AnticipoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentoModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class AnticipoModule { }
