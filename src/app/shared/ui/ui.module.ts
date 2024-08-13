import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

import { PagetitleComponent } from './pagetitle/pagetitle.component'
import { LoaderComponent } from './loader/loader.component'
import { SimpleLoaderComponent } from './simple-loader/simple-loader.component'
import { TablaNewComponent } from './tabla-new/tabla-new.component'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { PaginationModule } from 'ngx-bootstrap/pagination'
@NgModule({
	declarations: [
    PagetitleComponent,
    LoaderComponent,
    SimpleLoaderComponent,
    TablaNewComponent
  ],
	imports: [
		CommonModule,
		FormsModule,
		BsDatepickerModule.forRoot(),
		TimepickerModule.forRoot(),
		BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
	],
	exports: [
    PagetitleComponent,
    LoaderComponent,
    SimpleLoaderComponent,
    TablaNewComponent
  ],
})
export class UIModule {}
