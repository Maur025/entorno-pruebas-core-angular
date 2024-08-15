import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnticiposRoutingModule } from './anticipos-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AnticipoFormComponent } from './anticipo-form/anticipo-form.component';


@NgModule({
  declarations: [
    ListaComponent,
    AnticipoFormComponent
  ],
  imports: [
    CommonModule,
    AnticiposRoutingModule,
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
export class AnticiposModule { }
