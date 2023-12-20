import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
/* Mis importaciones */
import { ListaComponent as FormEntidadesComponent } from './lista/lista.component';
import { FormularioComponent as ListaEntidadesComponent  } from './formulario/formulario.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ListaEntidadesComponent,
    FormEntidadesComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    UIModule
  ],
  exports: [
    ListaEntidadesComponent,
    FormEntidadesComponent,
  ]
})
export class EntidadesModule { }
