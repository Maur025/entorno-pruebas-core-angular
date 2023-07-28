import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'horariodia', loadChildren: () => import('./horariodia/horariodia.module').then(m => m.HorariodiaModule  )},

{ path: 'horarios', loadChildren: () => import('./horarios/horarios.module').then(m => m.HorariosModule  )},

{ path: 'dias', loadChildren: () => import('./dias/dias.module').then(m => m.DiasModule  )},

{ path: 'monedas', loadChildren: () => import('./monedas/monedas.module').then(m => m.MonedasModule  )},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
