import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
		path: 'fondo-operativo',
		loadChildren: () => import('./fondo-operativo/fondo-operativo.module').then(m => m.FondoOperativoModule),
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTesoreriaRoutingModule { }
