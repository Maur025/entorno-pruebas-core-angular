import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InicializacionRoutingModule } from "./inicializacion-routing.module";
import { InicializacionComponent } from "./inicializacion/inicializacion.component";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { UIModule } from "src/app/shared/ui/ui.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { IniClienteComponent } from "./ini-cliente/ini-cliente.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IniProveedorComponent } from './ini-proveedor/ini-proveedor.component';

@NgModule({
  declarations: [InicializacionComponent, IniClienteComponent, IniProveedorComponent],
  imports: [
    CommonModule,
    InicializacionRoutingModule,
    TooltipModule.forRoot(),
    UIModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InicializacionModule {}
