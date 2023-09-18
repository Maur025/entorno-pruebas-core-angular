import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { CajabancomedioRoutingModule } from './cajabancomedio-routing.module';
import { CajabancotransferenciaModule } from '../cajabancotransferencia/cajabancotransferencia.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    CajabancomedioRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    CajabancotransferenciaModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class CajabancomedioModule { }
