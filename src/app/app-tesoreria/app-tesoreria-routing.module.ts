import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
		path: 'bancos',
		loadChildren: () => import('./bancos/bancos.module').then(m => m.BancosModule),
	},
  {
		path: 'fondo-operativo',
		loadChildren: () => import('./fondo-operativo/fondo-operativo.module').then(m => m.FondoOperativoModule),
	},
  {
		path: 'fondo-rendir',
		loadChildren: () => import('./fondo-rendir/fondo-rendir.module').then(m => m.FondoRendirModule),
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTesoreriaRoutingModule { }
