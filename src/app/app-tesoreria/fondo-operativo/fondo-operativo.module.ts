import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FondoOperativoRoutingModule } from './fondo-operativo-routing.module';
import { ListaComponent } from './lista/lista.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AperturaFormComponent } from './apertura-form/apertura-form.component';
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';


@NgModule({
  declarations: [
    ListaComponent,
    AperturaFormComponent
  ],
  imports: [
    CommonModule,
    FondoOperativoRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    HerramientasModule,
    TooltipModule.forRoot(),
    ComponentesCompartidosModule
  ]
})
export class FondoOperativoModule { }