import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxMaskModule } from 'ngx-mask';


import { ComponentesGeneralRoutingModule } from './componentes-general-routing.module';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { TransaccionesArrayComponent } from './transacciones-array/transacciones-array.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { InputFechaComponent } from './input-fecha/input-fecha.component';



@NgModule({
  declarations: [
    OperacionesComponent,
    TransaccionesArrayComponent,
    InputFechaComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeneralRoutingModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    NgxMaskModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exports:[
    OperacionesComponent,
    TransaccionesArrayComponent,
    InputFechaComponent
  ]
})
export class ComponentesGeneralModule { }
