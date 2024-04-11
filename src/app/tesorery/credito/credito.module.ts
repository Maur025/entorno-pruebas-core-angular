import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CreditoRoutingModule } from './credito-routing.module';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FormularioPagoComponent } from './formulario-pago/formulario-pago.component';


@NgModule({
  declarations: [
    ListaComponent,
    DetalleComponent,
    FormularioPagoComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    CreditoRoutingModule,
    BsDatepickerModule.forRoot(),
    WidgetModule,
    UIModule
  ],
  exports: [
    ListaComponent,
  ]
})
export class CreditoModule { }
