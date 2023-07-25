import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { FormularioImportExcelComponent } from './formimportexcel/formimportexcel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';
import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CargandotoolsDirective } from '../core/directives/cargandotools.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    TablaComponent,
    FormularioImportExcelComponent,
    CargandotoolsDirective
  ],
  imports: [
    CommonModule,
    FormsModule,

    NgApexchartsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,

    UIModule,
    WidgetModule,
    FullCalendarModule,
    LightboxModule,
    SimplebarAngularModule,
    NgSelectModule,

    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),

    LeafletModule,
  ],
  exports: [
    TablaComponent,
    FormularioImportExcelComponent
  ]
})
export class HerramientasModule { }
