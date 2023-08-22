import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LineacreditoComponent } from './lineacredito/lineacredito.component';

const routes: Routes = [
    { path: "lineacredito", component: LineacreditoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedimientosRoutingModule { }
