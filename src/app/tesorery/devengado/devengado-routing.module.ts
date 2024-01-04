import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { DetalleDevengadoComponent } from './detalle-devengado/detalle-devengado.component';

const routes: Routes = [
  { path: "", component: ListaComponent },
  { path: 'detalleDevengado/:id', component: DetalleDevengadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevengadoRoutingModule { }
