import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevengadoProveedorRoutingModule } from './devengado-proveedor-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DetalleDevengadoComponent } from './detalle-devengado/detalle-devengado.component';


@NgModule({
  declarations: [
    ListaComponent,
    DetalleDevengadoComponent
  ],
  imports: [
    CommonModule,
    DevengadoProveedorRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ComponentesCompartidosModule
  ]
})
export class DevengadoProveedorModule { }
