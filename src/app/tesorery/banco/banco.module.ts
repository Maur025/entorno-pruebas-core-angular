import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HerramientasModule } from 'src/app/core/herramientas/herramientas.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WidgetModule } from 'src/app/shared/widget/widget.module'
import { UIModule } from 'src/app/shared/ui/ui.module'
import { NgSelectModule } from '@ng-select/ng-select'
import { ListaComponent } from './lista/lista.component'
import { FormularioComponent } from './formulario/formulario.component'
import { CuentaListaComponent } from './cuenta/cuenta-lista/cuenta-lista.component'
import { CuentaFormularioComponent } from './cuenta/cuenta-formulario/cuenta-formulario.component'
import { BancoRoutingModule } from './banco-routing.module'
import { CuentasBancoComponent } from './cuentas-banco/cuentas-banco.component'
import { CuentaDetalleMovimientosComponent } from './cuenta/cuenta-detalle-movimientos/cuenta-detalle-movimientos.component'
import { UiSwitchModule } from 'ngx-ui-switch'
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'
import { MedioTransferenciaCuentaListFormComponent } from './cuenta/medio-transferencia-cuenta-list-form/medio-transferencia-cuenta-list-form.component';
import { FormularioNewCuentaComponent } from './cuenta/formulario-new-cuenta/formulario-new-cuenta.component';
import { CuentasPorTransferenciaComponent } from './cuenta/cuentas-por-transferencia/cuentas-por-transferencia.component'


@NgModule({
	declarations: [
		ListaComponent,
		FormularioComponent,
		CuentaListaComponent,
		CuentaFormularioComponent,
		CuentasBancoComponent,
		CuentaDetalleMovimientosComponent,
		MedioTransferenciaCuentaListFormComponent,
  		FormularioNewCuentaComponent,
    CuentasPorTransferenciaComponent,
	],
	imports: [
		CommonModule,
		BancoRoutingModule,
		NgSelectModule,
		HerramientasModule,
		FormsModule,
		ReactiveFormsModule,
		WidgetModule,
		UIModule,
		UiSwitchModule,
		NgbPopoverModule,
	],
	exports: [
		ListaComponent,
		FormularioComponent,
		CuentaListaComponent,
		CuentaFormularioComponent,
		CuentasBancoComponent,
	],
})
export class BancoModule {}
