import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FechasimplePipe } from 'src/app/core/pipes/fechasimple.pipe';

import { FondoRoutingModule } from './fondo-routing.module';

import { FondosOperativosComponent } from './fondos-operativos/fondos-operativos.component';
import { FormularioComponent } from './fondos-operativos/formulario/formulario.component';
import { ListaComponent } from './fondos-operativos/lista/lista.component';
import { DetalleFondoComponent } from './fondos-operativos/detalle-fondo/detalle-fondo.component';


@NgModule({
  declarations: [
    FondosOperativosComponent,
    FormularioComponent,
    ListaComponent,
    FechasimplePipe,
    DetalleFondoComponent
  ],
  imports: [
    CommonModule,
    FondoRoutingModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    UIModule,
    BsDatepickerModule.forRoot(),

  ],
  exports: [
    ListaComponent,
    FormularioComponent
  ]
})
export class FondoModule { }
