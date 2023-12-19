import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnticipoRoutingModule } from './anticipo-routing.module';
import { ListaComponent } from './aplicacion/lista/lista.component';
import { FormularioComponent } from './aplicacion/formulario/formulario.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    AnticipoRoutingModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    UIModule,
    BsDatepickerModule
  ]
})
export class AnticipoModule { }
