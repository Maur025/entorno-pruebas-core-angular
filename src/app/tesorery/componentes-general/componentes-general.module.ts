import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxMaskModule } from 'ngx-mask';


import { ComponentesGeneralRoutingModule } from './componentes-general-routing.module';
import { OperacionesComponent } from './operaciones/operaciones.component';


@NgModule({
  declarations: [
    OperacionesComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralRoutingModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    UIModule,
    BsDatepickerModule,
    CollapseModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  exports:[
    OperacionesComponent
  ]
})
export class ComponentesGeneralModule { }
