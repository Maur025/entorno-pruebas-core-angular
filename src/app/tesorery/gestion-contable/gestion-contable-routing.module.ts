import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AperturaCierreComponent } from './apertura-cierre/apertura-cierre.component'

const routes: Routes = [
	{
		path: 'aperturaCierre',
		component: AperturaCierreComponent,
		data: { tituloPagina: 'Apertura y Cierre' },
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GestionContableRoutingModule {}
