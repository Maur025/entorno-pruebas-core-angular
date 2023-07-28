import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    CommonModule,
    UIModule,
    HerramientasModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    TabsModule
  ]
})
export class ConfiguracionModule { }
