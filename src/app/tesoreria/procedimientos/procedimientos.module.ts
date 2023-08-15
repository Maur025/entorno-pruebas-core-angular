import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineacreditoComponent } from './lineacredito/lineacredito.component';
import { SelectoresModule } from '../selectores/selectores.module';
import { ProcedimientosRoutingModule } from './procedimientos-routing.module';

import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  declarations: [
    LineacreditoComponent
  ],
  imports: [
    CommonModule,
    ArchwizardModule,
    SelectoresModule,
    ProcedimientosRoutingModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProcedimientosModule { }
