import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatodecimalesPipe } from './pipes/formatodecimales.pipe';
import { FormatodecimalesComasPipe } from './pipes/formatodecimalescomas.pipe';

@NgModule({
  declarations: [
    FormatodecimalesPipe,
    FormatodecimalesComasPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
