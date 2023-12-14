/* Importaciones generales */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
/* Mis importaciones */
import { BancoRoutingModule } from './banco-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CuentaListaComponent } from './cuenta/cuenta-lista/cuenta-lista.component';
import { CuentaFormularioComponent } from './cuenta/cuenta-formulario/cuenta-formulario.component';

@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent,
    CuentaListaComponent,
    CuentaFormularioComponent
  ],
  imports: [
    CommonModule,
    BancoRoutingModule,

    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    UIModule
  ],
  exports: [
    ListaComponent,
    FormularioComponent,
    CuentaListaComponent,
    CuentaFormularioComponent
  ]
})
export class BancoModule { }
