import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { BancoRoutingModule } from './banco-routing.module';
import { ContactobancoModule } from '../contactobanco/contactobanco.module';
import { CuentabancoModule } from '../cuentabanco/cuentabanco.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    BancoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    ContactobancoModule,
CuentabancoModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class BancoModule { }
