import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';

import { FondoRoutingModule } from './fondo-routing.module';

import { FormularioOperativoComponent } from './fondos-operativos/formulario/formulario.component';
import { ListaOperativoComponent } from './fondos-operativos/lista/lista.component';
import { DetalleFondoComponent } from './fondos-operativos/detalle-fondo/detalle-fondo.component';
import { FormularioCajaComponent } from './fondos-caja/formulario/formulario.component';
import { ListaCajaComponent} from './fondos-caja/lista/lista.component';
import { ListaRendirComponent } from './fondos-rendir/lista/lista.component';
import { FormularioRendirComponent } from './fondos-rendir/formulario/formulario.component';
import { DetalleFondoRendirComponent } from './fondos-rendir/detalle-fondo/detalle-fondo.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ComponentesGeneralModule } from '../componentes-general/componentes-general.module';

@NgModule({
  declarations: [
    FormularioOperativoComponent,
    ListaOperativoComponent,
    DetalleFondoComponent,
    FormularioCajaComponent,
    ListaCajaComponent,
    ListaRendirComponent,
    FormularioRendirComponent,
    DetalleFondoRendirComponent
  ],
  imports: [
    CommonModule,
    FondoRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    HerramientasModule,
    ComponentesGeneralModule,
  ],
  exports: [
    FormularioOperativoComponent,
    ListaOperativoComponent,
    DetalleFondoComponent,
    FormularioCajaComponent,
    ListaCajaComponent,
    ListaRendirComponent,
    FormularioRendirComponent,
    DetalleFondoRendirComponent
  ]
})
export class FondoModule { }
