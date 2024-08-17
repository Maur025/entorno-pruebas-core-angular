import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AppTesoreriaRoutingModule } from './app-tesoreria-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppTesoreriaRoutingModule
  ],
  providers: [
		DecimalPipe,
  ]
})
export class AppTesoreriaModule { }
