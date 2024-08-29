import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancosRoutingModule } from './bancos-routing.module';
import { ListaComponent } from './lista/lista.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module';
import { CuentaBancoFormComponent } from './cuenta-banco-form/cuenta-banco-form.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CuentaBancoListComponent } from './cuenta-banco-list/cuenta-banco-list.component';
import { ListMovimientoCuentaBancoComponent } from './list-movimiento-cuenta-banco/list-movimiento-cuenta-banco.component';


@NgModule({
  declarations: [
    ListaComponent,
    CuentaBancoFormComponent,
    CuentaBancoListComponent,
    ListMovimientoCuentaBancoComponent
  ],
  imports: [
    CommonModule,
    BancosRoutingModule,
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
export class BancosModule { }
