import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
	FormatListInterface,
	ResponseDataStandard,
} from 'src/app/shared/interface/common-list-interface'
import { FuncionesComponent } from 'src/app/tesorery/funciones.component'
import { TesoreriaProveedorService } from 'src/app/tesorery/services/tesoreria/tesoreria-proveedor.service'

@Component({
	selector: 'app-pending-payments-beneficiaries-list',
	templateUrl: './pending-payments-beneficiaries-list.component.html',
	styleUrls: ['./pending-payments-beneficiaries-list.component.scss'],
})
export class PendingPaymentsBeneficiariesListComponent
	extends FuncionesComponent
	implements OnInit
{
	@Input() rel_prefix: boolean = false

	public tableTitle: string = 'Lista de Beneficiarios - Pago Pendiente'
	public searchText: string = 'Ingrese criterio de búsqueda: Nombre.'
	public format: FormatListInterface = null

	constructor(
		protected tesoreriaProveedorService: TesoreriaProveedorService,
		private router: Router
	) {
		super()
	}

	ngOnInit(): void {
		this.format = this.getHeadersList()

		this.tesoreriaProveedorService?.getEnabledRecords().subscribe({
			next: response => console.log(response),
			error: error => console.log(error),
		})
	}

	getHeadersList = () => {
		return {
			cabeceras: {
				acciones: this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
				nombreProveedor: this.getOpcionesCabecera('Proveedor', 12),
				nroDocumento: this.getOpcionesCabecera('NIT/CI', 12),
				deudaPendiente: this.getOpcionesCabecera('Deuda Pendiente', 12),
				deleted: this.getOpcionesCabecera('Estado', 6),
			},
		}
	}

	navigateToBeneficiaryDetails = (rowData: ResponseDataStandard): void => {
		this.router?.navigate([
			'/operacion_financiera/efectuar_pago/detalle_beneficiario',
			rowData?.id,
		])
	}
}
