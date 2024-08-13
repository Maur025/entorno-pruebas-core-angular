import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxMaskModule } from 'ngx-mask';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { InputFechaComponent } from './input-fecha/input-fecha.component';
import { TransaccionArrayComponent } from './transaccion-array/transaccion-array.component';



@NgModule({
  declarations: [
    TransaccionArrayComponent,
    InputFechaComponent
  ],
  imports: [
    CommonModule,
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
    TransaccionArrayComponent,
    InputFechaComponent
  ]
})
export class ComponentesCompartidosModule { }
