import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';

import { FormularioPagosComponent } from './pago-contado/formulario/formulario.component';
import { ListaPagosComponent } from './pago-contado/lista/lista.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TransaccionesKafkaComponent } from './transacciones-kafka/transacciones-kafka.component';
import { ListaTransaccionesComponent } from './transacciones-kafka/lista/lista.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    FormularioPagosComponent,
    ListaPagosComponent,
    TransaccionesKafkaComponent,
    ListaTransaccionesComponent,
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
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    HerramientasModule,
    UiSwitchModule,
  ],
  exports: [
    FormularioPagosComponent,
    ListaPagosComponent,
    TransaccionesKafkaComponent,
    ListaTransaccionesComponent,
  ]
})
export class ConfiguracionModule { }
