import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormularioComponent } from './formulario/formulario.component';
import { BancoRoutingModule } from './banco-routing.module';
import { CuentabancoModule } from '../cuentabanco/cuentabanco.module';
import { LineacreditobancoModule } from '../lineacreditobanco/lineacreditobanco.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [
    ListadoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    BancoRoutingModule,
    HerramientasModule,
    FormsModule,
    ReactiveFormsModule,
    CuentabancoModule,
    LineacreditobancoModule,
    WidgetModule,
    UIModule

  ],
  exports: [
    ListadoComponent,
    FormularioComponent
  ]
})
export class BancoModule { }
