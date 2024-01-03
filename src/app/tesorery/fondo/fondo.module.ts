import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FechasimplePipe } from 'src/app/core/pipes/fechasimple.pipe';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';

import { FondoRoutingModule } from './fondo-routing.module';

import { FondosOperativosComponent } from './fondos-operativos/fondos-operativos.component';
import { FormularioOperativoComponent } from './fondos-operativos/formulario/formulario.component';
import { ListaOperativoComponent } from './fondos-operativos/lista/lista.component';
import { DetalleFondoComponent } from './fondos-operativos/detalle-fondo/detalle-fondo.component';
import { FondosCajaComponent } from './fondos-caja/fondos-caja.component';
import { FormularioCajaComponent } from './fondos-caja/formulario/formulario.component';
import { ListaCajaComponent} from './fondos-caja/lista/lista.component';
import { FondosRendirComponent } from './fondos-rendir/fondos-rendir.component';
import { ListaRendirComponent } from './fondos-rendir/lista/lista.component';
import { FormularioRendirComponent } from './fondos-rendir/formulario/formulario.component';
import { DetalleFondoRendirComponent } from './fondos-rendir/detalle-fondo/detalle-fondo.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    FondosOperativosComponent,
    FormularioOperativoComponent,
    ListaOperativoComponent,
    FechasimplePipe,
    DetalleFondoComponent,
    FondosCajaComponent,
    FormularioCajaComponent,
    ListaCajaComponent,
    FondosRendirComponent,
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
    WidgetModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    HerramientasModule,
  ],
  exports: [
    FondosOperativosComponent,
    FormularioOperativoComponent,
    ListaOperativoComponent,
    FechasimplePipe,
    DetalleFondoComponent,
    FondosCajaComponent,
    FormularioCajaComponent,
    ListaCajaComponent,
    FondosRendirComponent,
    ListaRendirComponent,
    FormularioRendirComponent,
    DetalleFondoRendirComponent
  ]
})
export class FondoModule { }
