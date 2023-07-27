
import { HerramientasModule } from '../core/herramientas/herramientas.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TesoreriaRoutingModule } from './tesoreria-routing.module';
import { CargandoDirective } from '../core/directives/cargando.directive';
import { PaneldecontrolComponent } from './paneldecontrol/paneldecontrol.component';
import { DefaultComponent } from './default/default.component';
import { WidgetModule } from '../shared/widget/widget.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DefaultComponent,
    CargandoDirective,
    PaneldecontrolComponent,
  ],
  imports: [
    CommonModule,
    TesoreriaRoutingModule,
    HerramientasModule,
    UIModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    WidgetModule,
    NgApexchartsModule,
  ]
})
export class TesoreriaModule { }
