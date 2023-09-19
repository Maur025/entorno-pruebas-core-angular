import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { TiposolicitudModule } from '../tiposolicitud/tiposolicitud.module';
import { ContactoModule } from '../contacto/contacto.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    TiposolicitudModule,
ContactoModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class SolicitudesModule { }
