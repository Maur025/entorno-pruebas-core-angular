import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TesoreryRoutingModule } from './tesorery-routing.module'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { UIModule } from 'src/app/shared/ui/ui.module'
import { WidgetModule } from '../shared/widget/widget.module'
import { NgApexchartsModule } from 'ng-apexcharts'
import { HerramientasModule } from '../core/herramientas/herramientas.module'

import { PaneldecontrolComponent } from '../tesoreria/paneldecontrol/paneldecontrol.component'
import { InicioComponent } from './inicio/inicio.component';
import { DefaultComponent } from './default/default.component'

@NgModule({
	declarations: [PaneldecontrolComponent, InicioComponent, DefaultComponent],
	imports: [
		CommonModule,
		TesoreryRoutingModule,
		HerramientasModule,
		UIModule,
		FormsModule,
		ReactiveFormsModule,
		TabsModule.forRoot(),
		WidgetModule,
		NgApexchartsModule,
	],
})
export class TesoreryModule {}
