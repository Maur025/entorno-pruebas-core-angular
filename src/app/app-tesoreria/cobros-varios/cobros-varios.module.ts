import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesCompartidosModule } from "../componentes-compartidos/componentes-compartidos.module";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { UIModule } from "src/app/shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CobrosVariosRoutingModule } from './cobros-varios-routing.module';
import { ListComponent } from './list/list.component';
import { CobrosVariosFormComponent } from './cobros-varios-form/cobros-varios-form.component';


@NgModule({
  declarations: [
    ListComponent,
    CobrosVariosFormComponent
  ],
  imports: [
    CommonModule,
    CobrosVariosRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ComponentesCompartidosModule,
  ]
})
export class CobrosVariosModule { }
