import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PagoFormComponent } from './pago-form/pago-form.component';
import { ListComprasProveedorComponent } from './list-compras-proveedor/list-compras-proveedor.component';
import { DetallePagoProveedorComponent } from './detalle-pago-proveedor/detalle-pago-proveedor.component';


@NgModule({
  declarations: [
    ListaComponent,
    PagoFormComponent,
    ListComprasProveedorComponent,
    DetallePagoProveedorComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule,
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
export class PagosModule { }
