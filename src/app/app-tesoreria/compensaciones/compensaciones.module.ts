import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CompensacionesRoutingModule } from "./compensaciones-routing.module";
import { ComponentesCompartidosModule } from "../componentes-compartidos/componentes-compartidos.module";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { UIModule } from "src/app/shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CompensationFormComponent } from "./compensation-form/compensation-form.component";
import { CompensationListComponent } from "./compensation-list/compensation-list.component";
import { SalePendingCollectionListComponent } from "./sale-pending-collection-list/sale-pending-collection-list.component";
import { CompensacionesMovimientoOrigenComponent } from './compensaciones-movimiento-origen/compensaciones-movimiento-origen.component';

@NgModule({
  declarations: [
    CompensationFormComponent,
    CompensationListComponent,
    SalePendingCollectionListComponent,
    CompensacionesMovimientoOrigenComponent,
  ],
  imports: [
    CommonModule,
    CompensacionesRoutingModule,
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
export class CompensacionesModule {}
