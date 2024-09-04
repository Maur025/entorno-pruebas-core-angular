import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { HerramientasModule } from "src/app/core/herramientas/herramientas.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UIModule } from "src/app/shared/ui/ui.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { NgxMaskModule } from "ngx-mask";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { InputFechaComponent } from "./input-fecha/input-fecha.component";
import { TransaccionArrayComponent } from "./transaccion-array/transaccion-array.component";
import { FechaFormatPipe } from "src/app/core/pipes/fechaFormat.pipe";
import { DecimalAmountPipe } from "src/app/core/pipes/decimal-amount.pipe";
import { FormAnticipoComponent } from "./form-anticipo/form-anticipo.component";
import { esLocale } from "ngx-bootstrap/locale";
import { defineLocale } from "ngx-bootstrap/chronos";
defineLocale("es", esLocale);
@NgModule({
  declarations: [
    FechaFormatPipe,
    DecimalAmountPipe,
    TransaccionArrayComponent,
    InputFechaComponent,
    FormAnticipoComponent,
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
  exports: [
    FechaFormatPipe,
    DecimalAmountPipe,
    TransaccionArrayComponent,
    InputFechaComponent,
    FormAnticipoComponent,
  ],
})
export class ComponentesCompartidosModule {}
