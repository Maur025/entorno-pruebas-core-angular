import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListaComponent } from './lista/lista.component';
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormAnticipoComponent } from './form-anticipo/form-anticipo.component';
import { AnticipoProveedorRoutingModule } from './anticipo-proveedor-routing.module';
import { FormDevolucionComponent } from './form-devolucion/form-devolucion.component';
import { ListAnticiposComponent } from './form-devolucion/list-anticipos/list-anticipos.component';


@NgModule({
  declarations: [
    ListaComponent,
    FormAnticipoComponent,
    FormDevolucionComponent,
    ListAnticiposComponent
  ],
  imports: [
    CommonModule,
    AnticipoProveedorRoutingModule,
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
export class AnticipoProveedorModule { }