import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AperturaCierreComponent } from './apertura-cierre/apertura-cierre.component';

const routes: Routes = [
  {
    path: 'empleado', component: EmpleadosComponent,
  },
  {
    path: 'apertura-cierre', component: AperturaCierreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
