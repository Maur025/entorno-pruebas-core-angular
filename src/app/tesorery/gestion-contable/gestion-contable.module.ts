import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GestionContableRoutingModule } from './gestion-contable-routing.module'
import { AperturaCierreComponent } from './apertura-cierre/apertura-cierre.component'
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module'

@NgModule({
	declarations: [AperturaCierreComponent],
	imports: [CommonModule, GestionContableRoutingModule, HerramientasModule],
})
export class GestionContableModule {}
