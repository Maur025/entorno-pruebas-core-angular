import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';

import { PagoContadoComponent } from './pago-contado/pago-contado.component';
import { FormularioPagosComponent } from './pago-contado/formulario/formulario.component';
import { ListaPagosComponent } from './pago-contado/lista/lista.component';
import { UiSwitchModule } from 'ngx-ui-switch';


@NgModule({
  declarations: [
    PagoContadoComponent,
    FormularioPagosComponent,
    ListaPagosComponent,
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    HerramientasModule,
    UiSwitchModule,
  ],
  exports: [
    PagoContadoComponent,
    FormularioPagosComponent,
    ListaPagosComponent,
  ]
})
export class ConfiguracionModule { }
