import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CajaRoutingModule } from './caja-routing.module';

import { FormularioCajaComponent } from './formulario/formulario.component';
import { ListaCajaComponent } from './lista/lista.component';
import { DetalleCajaComponent } from './detalle-caja/detalle-caja.component';
import { ComponentesGeneralModule } from '../componentes-general/componentes-general.module';
import { AccionCajaComponent } from './accion-caja/accion-caja.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    FormularioCajaComponent,
    ListaCajaComponent,
    DetalleCajaComponent,
    AccionCajaComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    HerramientasModule,
    ComponentesGeneralModule,
    FormsModule,
    ReactiveFormsModule,
    CajaRoutingModule,
    BsDropdownModule.forRoot(),
    UIModule,
    TooltipModule.forRoot(),
  ],
  exports: [
    ListaCajaComponent,
    FormularioCajaComponent
  ]
})
export class CajaModule { }
