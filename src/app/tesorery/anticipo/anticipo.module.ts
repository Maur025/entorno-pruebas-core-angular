import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AnticipoRoutingModule } from './anticipo-routing.module'
import { ListaComponent as ListaAplicacionComponent } from './aplicacion/lista/lista.component'
import { FormularioComponent as FormularioAplicacionComponent } from './aplicacion/formulario/formulario.component'

import { ListaComponent } from './lista/lista.component'
import { FormularioComponent } from './formulario/formulario.component'

import { NgSelectModule } from '@ng-select/ng-select'
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UIModule } from 'src/app/shared/ui/ui.module'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { NgxMaskModule } from 'ngx-mask'
import { ComponentesGeneralModule } from '../componentes-general/componentes-general.module';
import { NuevoComponent } from './nuevo/nuevo.component'

@NgModule({
	declarations: [
		ListaComponent,
		FormularioComponent,
		ListaAplicacionComponent,
		FormularioAplicacionComponent,
  NuevoComponent,
	],
	imports: [
		CommonModule,
		AnticipoRoutingModule,
		NgSelectModule,
		HerramientasModule,
		ComponentesGeneralModule,
		FormsModule,
		ReactiveFormsModule,
		UIModule,
		BsDatepickerModule,
		CollapseModule.forRoot(),
		NgxMaskModule.forRoot(),
	],
})
export class AnticipoModule {}
