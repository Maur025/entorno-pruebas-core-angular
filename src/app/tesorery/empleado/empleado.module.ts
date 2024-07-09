import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    NgSelectModule,
		HerramientasModule,
		FormsModule,
		ReactiveFormsModule,
		WidgetModule,
		UIModule,
  ]
})
export class EmpleadoModule { }
