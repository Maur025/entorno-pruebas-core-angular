import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AperturaCierreComponent } from './apertura-cierre/apertura-cierre.component';
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    EmpleadosComponent,
    AperturaCierreComponent,
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
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
export class GestionModule { }
