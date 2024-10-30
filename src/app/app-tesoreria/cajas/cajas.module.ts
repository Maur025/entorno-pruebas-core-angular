import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajasRoutingModule } from './cajas-routing.module';

import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListaComponent } from './lista/lista.component';
import { AperturaCajaComponent } from './apertura-caja/apertura-caja.component';
import { MovimientoCajaListComponent } from './movimiento-caja-list/movimiento-caja-list.component';


@NgModule({
  declarations: [
    ListaComponent,
    AperturaCajaComponent,
    MovimientoCajaListComponent
  ],
  imports: [
    CommonModule,
    CajasRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    UiSwitchModule,
    TooltipModule.forRoot(),
    ComponentesCompartidosModule
  ]
})
export class CajasModule { }
