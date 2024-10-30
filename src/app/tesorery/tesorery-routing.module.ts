import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { InicioComponent } from './inicio/inicio.component'
import { DefaultComponent } from './default/default.component'

const routes: Routes = [
	{ path: '', component: DefaultComponent },
	{ path: 'inicio', component: InicioComponent },
	{
		path: 'empleado',
		loadChildren: () =>
			import('./empleado/empleado.module').then(m => m.EmpleadoModule),
	},
	{
		path: 'banco',
		loadChildren: () => import('./banco/banco.module').then(m => m.BancoModule),
	},
	{
		path: 'caja',
		loadChildren: () => import('./caja/caja.module').then(m => m.CajaModule),
	},
	{
		path: 'anticipo',
		loadChildren: () =>
			import('./anticipo/anticipo.module').then(m => m.AnticipoModule),
	},
	{
		path: 'fondo',
		loadChildren: () => import('./fondo/fondo.module').then(m => m.FondoModule),
	},
	{
		path: 'credito',
		loadChildren: () =>
			import('./credito/credito.module').then(m => m.CreditoModule),
	},
	{
		path: 'transacciones',
		loadChildren: () =>
			import('./transacciones/transacciones.module').then(
				m => m.TransaccionesModule
			),
	},
	{
		path: 'gestion',
		loadChildren: () =>
			import('./gestion-contable/gestion-contable.module').then(
				module => module.GestionContableModule
			),
	},
	{
		path: 'operacion_financiera',
		loadChildren: () =>
			import('./financial-transaction/financial-transaction.module').then(
				module => module.FinancialTransactionModule
			),
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TesoreryRoutingModule {}
