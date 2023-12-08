import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { DocumentoRoutingModule } from './documento-routing.module';
import { DocumentotipoModule } from '../documentotipo/documentotipo.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    DocumentoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentotipoModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class DocumentoModule { }
