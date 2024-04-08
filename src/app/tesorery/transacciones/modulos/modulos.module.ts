import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HerramientasModule as HerramientasCompartidas } from 'src/app/core/herramientas/herramientas.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModulosRoutingModule } from './modulos-routing.module';
import { FormularioModuloComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';
import { FondoModule } from '../../fondo/fondo.module';
import { CreditoModule } from '../../credito/credito.module';
import { FormularioFormaPagoComponent } from './formulario-forma-pago/formulario-forma-pago.component';


@NgModule({
  declarations: [
    ListaComponent,
    FormularioModuloComponent,
    FormularioFormaPagoComponent,
  ],
  imports: [
    CommonModule,
    HerramientasCompartidas,
    FondoModule,
    CreditoModule,
    UIModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    UiSwitchModule,
    ModulosRoutingModule
  ]
})
export class ModulosModule { }
