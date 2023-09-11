
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ParametrosRoutingModule } from './parametros-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HerramientasModule,
    ParametrosRoutingModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    WidgetModule,
    NgApexchartsModule,
  ]
})
export class ParametrosModule { }
