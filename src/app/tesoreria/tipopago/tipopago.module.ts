import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { TipopagoRoutingModule } from './tipopago-routing.module';
import { TipopagomediosModule } from '../tipopagomedios/tipopagomedios.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    TipopagoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    TipopagomediosModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class TipopagoModule { }
