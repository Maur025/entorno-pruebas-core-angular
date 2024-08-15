import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FondoRendirRoutingModule } from './fondo-rendir-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';
import { ListaComponent } from './lista/lista.component';
import { DesembolsoFormComponent } from './desembolso-form/desembolso-form.component';


@NgModule({
  declarations: [
    ListaComponent,
    DesembolsoFormComponent
  ],
  imports: [
    CommonModule,
    FondoRendirRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ComponentesCompartidosModule
  ]
})
export class FondoRendirModule { }