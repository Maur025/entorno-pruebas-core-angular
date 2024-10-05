import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagosVariosRoutingModule } from "./pagos-varios-routing.module";
import { ComponentesCompartidosModule } from "../componentes-compartidos/componentes-compartidos.module";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { UIModule } from "src/app/shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ListComponent } from "./list/list.component";
import { PagosVariosFormComponent } from "./pagos-varios-form/pagos-varios-form.component";

@NgModule({
  declarations: [ListComponent, PagosVariosFormComponent],
  imports: [
    CommonModule,
    PagosVariosRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ComponentesCompartidosModule,
  ],
})
export class PagosVariosModule {}
