import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
		path: '',
		component: InicioComponent,
  },
  {
		path: 'gestion',
		loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionModule),
	},
  {
		path: 'bancos',
		loadChildren: () => import('./bancos/bancos.module').then(m => m.BancosModule),
	},
  {
		path: 'cajas',
		loadChildren: () => import('./cajas/cajas.module').then(m => m.CajasModule),
	},
  {
		path: 'pagos',
		loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule),
	},
  {
		path: 'fondo-operativo',
		loadChildren: () => import('./fondo-operativo/fondo-operativo.module').then(m => m.FondoOperativoModule),
	},
  {
		path: 'fondo-rendir',
		loadChildren: () => import('./fondo-rendir/fondo-rendir.module').then(m => m.FondoRendirModule),
	},
  {
		path: 'anticipos',
		loadChildren: () => import('./anticipos/anticipos.module').then(m => m.AnticiposModule),
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTesoreriaRoutingModule { }
