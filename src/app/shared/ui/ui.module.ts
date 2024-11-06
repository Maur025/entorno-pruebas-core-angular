import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { PagetitleComponent } from "./pagetitle/pagetitle.component";
import { LoaderComponent } from "./loader/loader.component";
import { SimpleLoaderComponent } from "./simple-loader/simple-loader.component";
import { TablaNewComponent } from "./tabla-new/tabla-new.component";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { LoaderButtonComponent } from "./loader-button/loader-button.component";
import { PaginationOnlyComponent } from './pagination-only/pagination-only.component';
@NgModule({
  declarations: [
    PagetitleComponent,
    LoaderComponent,
    SimpleLoaderComponent,
    TablaNewComponent,
    LoaderButtonComponent,
    PaginationOnlyComponent,
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
    TablaNewComponent,
    LoaderButtonComponent,
    PaginationOnlyComponent
  ],
})
export class UIModule {}
