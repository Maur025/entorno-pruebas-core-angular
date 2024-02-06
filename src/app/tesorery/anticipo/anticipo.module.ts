import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnticipoRoutingModule } from './anticipo-routing.module';
import { ListaComponent as ListaAplicacionComponent} from './aplicacion/lista/lista.component';
import { FormularioComponent as FormularioAplicacionComponent} from './aplicacion/formulario/formulario.component';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent,
    ListaAplicacionComponent,
    FormularioAplicacionComponent,
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
    BsDatepickerModule,
    CollapseModule.forRoot(),
    NgxMaskModule.forRoot(),
  ]
})
export class AnticipoModule { }
