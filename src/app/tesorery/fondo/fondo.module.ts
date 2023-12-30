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
import { FormularioComponent as FormularioOperativoComponent} from './fondos-operativos/formulario/formulario.component';
import { ListaComponent as ListaOperativoComponent} from './fondos-operativos/lista/lista.component';
import { DetalleFondoComponent } from './fondos-operativos/detalle-fondo/detalle-fondo.component';
import { FondosCajaComponent } from './fondos-caja/fondos-caja.component';
import { FormularioCajaComponent } from './fondos-caja/formulario/formulario.component';
import { ListaCajaComponent} from './fondos-caja/lista/lista.component';

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
  ]
})
export class FondoModule { }
