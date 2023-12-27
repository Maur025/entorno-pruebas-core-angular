import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { RendicionRoutingModule } from './rendicion-routing.module';

import { FormularioComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';


@NgModule({
  declarations: [
    FormularioComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    UIModule,
    RendicionRoutingModule
  ],
  exports: [
    ListaComponent,
    FormularioComponent
  ]
})
export class RendicionModule { }
