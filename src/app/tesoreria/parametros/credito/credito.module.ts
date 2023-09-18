import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { CreditoRoutingModule } from './credito-routing.module';
import { CuotastiempoModule } from '../cuotastiempo/cuotastiempo.module';
import { TiempointeresModule } from '../tiempointeres/tiempointeres.module';
import { TipointeresModule } from '../tipointeres/tipointeres.module';
import { FormapagoModule } from '../formapago/formapago.module';
import { TipopagoModule } from '../tipopago/tipopago.module';
import { AcreedorModule } from '../acreedor/acreedor.module';
import { DeudorModule } from '../deudor/deudor.module';
import { CreditoestadoModule } from '../creditoestado/creditoestado.module';
import { CreditopagosModule } from '../creditopagos/creditopagos.module';

@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    CreditoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    CuotastiempoModule,
    TiempointeresModule,
    TipointeresModule,
    FormapagoModule,
    TipopagoModule,
    AcreedorModule,
    DeudorModule,
    CreditoestadoModule,
    CreditopagosModule
  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class CreditoModule { }
