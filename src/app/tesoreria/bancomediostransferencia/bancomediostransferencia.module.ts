import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { BancomediostransferenciaRoutingModule } from './bancomediostransferencia-routing.module';
import { MediotransferenciaModule } from '../mediotransferencia/mediotransferencia.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    BancomediostransferenciaRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    MediotransferenciaModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class BancomediostransferenciaModule { }
