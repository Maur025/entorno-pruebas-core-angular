import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CobroRoutingModule } from './cobro-routing.module'
import { ClientPendingCollectionListComponent } from './client-pending-collection-list/client-pending-collection-list.component'
import { UIModule } from '../../shared/ui/ui.module'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { ComponentesCompartidosModule } from '../componentes-compartidos/componentes-compartidos.module'

@NgModule({
	declarations: [ClientPendingCollectionListComponent],
	imports: [
		CommonModule,
		CobroRoutingModule,
		NgSelectModule,
		FormsModule,
		ReactiveFormsModule,
		UIModule,
		BsDatepickerModule.forRoot(),
		BsDropdownModule.forRoot(),
		TooltipModule.forRoot(),
		ComponentesCompartidosModule,
	],
})
export class CobroModule {}
