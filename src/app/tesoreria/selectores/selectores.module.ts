import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BancosComponent } from './bancos/bancos.component';

import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BancosComponent
  ],
  imports: [
    CommonModule,UIModule,FormsModule, ReactiveFormsModule
  ],
  exports: [
    BancosComponent
  ]
})
export class SelectoresModule { }
