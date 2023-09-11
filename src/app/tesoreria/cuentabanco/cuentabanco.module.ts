import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { CuentabancoRoutingModule } from './cuentabanco-routing.module';
import { MonedaModule } from '../moneda/moneda.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    CuentabancoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    MonedaModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class CuentabancoModule { }
