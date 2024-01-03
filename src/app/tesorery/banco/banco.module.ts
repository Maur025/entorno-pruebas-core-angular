import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CuentaListaComponent } from './cuenta/cuenta-lista/cuenta-lista.component';
import { CuentaFormularioComponent } from './cuenta/cuenta-formulario/cuenta-formulario.component';

import { BancoRoutingModule } from './banco-routing.module';
import { CuentasBancoComponent } from './cuentas-banco/cuentas-banco.component';

@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent,
    CuentaListaComponent,
    CuentaFormularioComponent,
    CuentasBancoComponent
  ],
  imports: [
    CommonModule,
    BancoRoutingModule,
    NgSelectModule,
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
    CuentaFormularioComponent,
    CuentasBancoComponent
  ]
})
export class BancoModule { }
