import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
		path: 'fondo-operativo',
		loadChildren: () => import('./fondo-operativo/fondo-operativo.module').then(m => m.FondoOperativoModule),
	},
  {
		path: 'bancos',
		loadChildren: () => import('./bancos/bancos.module').then(m => m.BancosModule),
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTesoreriaRoutingModule { }
