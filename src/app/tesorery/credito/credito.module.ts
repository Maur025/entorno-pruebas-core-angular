import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { CreditoRoutingModule } from './credito-routing.module';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';


@NgModule({
  declarations: [
    ListaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    CreditoRoutingModule,
    WidgetModule,
    UIModule
  ],
  exports: [
    ListaComponent,
  ]
})
export class CreditoModule { }
