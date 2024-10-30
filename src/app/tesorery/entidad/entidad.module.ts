import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { EntidadRoutingModule } from './entidad-routing.module';

import { ListaComponent } from 'src/app/tesorery/entidad/lista/lista.component';
import { FormularioComponent } from 'src/app/tesorery/entidad/formulario/formulario.component';

@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    EntidadRoutingModule,
    WidgetModule,
    UIModule
  ],
  exports: [
    ListaComponent,
    FormularioComponent
  ]
})
export class EntidadModule { }
