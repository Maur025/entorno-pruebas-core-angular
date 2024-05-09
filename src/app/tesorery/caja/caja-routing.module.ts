import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioCajaComponent } from './formulario/formulario.component';
import { ListaCajaComponent } from './lista/lista.component';
import { DetalleCajaComponent } from './detalle-caja/detalle-caja.component';

const routes: Routes = [
    {path: "", component: ListaCajaComponent},
    {path: ":id", component: FormularioCajaComponent},
    {path: "detalleCaja/:cajaId", component: DetalleCajaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
