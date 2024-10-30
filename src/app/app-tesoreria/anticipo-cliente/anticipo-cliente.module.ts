import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListaComponent } from "./lista/lista.component";
import { AnticipoClienteRoutingModule } from "./anticipo-cliente-routing.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UIModule } from "src/app/shared/ui/ui.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { UiSwitchModule } from "ngx-ui-switch";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ComponentesCompartidosModule } from "../componentes-compartidos/componentes-compartidos.module";

@NgModule({
  declarations: [ListaComponent],
  imports: [
    CommonModule,
    AnticipoClienteRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    UiSwitchModule,
    TooltipModule.forRoot(),
    ComponentesCompartidosModule,
  ],
})
export class AnticipoClienteModule {}
