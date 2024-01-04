import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevengadoRoutingModule } from './devengado-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { DetalleDevengadoComponent } from './detalle-devengado/detalle-devengado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent,
    DetalleDevengadoComponent,
  ],
  imports: [
    CommonModule,
    DevengadoRoutingModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    UIModule,
    BsDatepickerModule
    
  ]
})
export class DevengadoModule { }
