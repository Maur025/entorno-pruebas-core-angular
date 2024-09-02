import { Component, OnInit } from '@angular/core'
import { FuncionesComponent } from '../../funciones.component'
import { CobroService } from 'src/app/core/services/tesoreria/cobro.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-client-pending-collection-list',
	templateUrl: './client-pending-collection-list.component.html',
	styleUrls: ['./client-pending-collection-list.component.scss'],
})
export class ClientPendingCollectionListComponent
	extends FuncionesComponent
	implements OnInit
{
	protected breadCrumbItems: object[] = []
	protected tableHeadersFormat: { [key: string]: unknown } = {}

	constructor(protected cobroService: CobroService, private router: Router) {
		super()
	}

	ngOnInit(): void {
		this.breadCrumbItems = [
			{ label: 'Cobros' },
			{ label: 'Gestión de cobros', active: true },
		]
		this.getHeaders()
	}

	getHeaders = (): void => {
		this.tableHeadersFormat = {
			cabeceras: {
				acciones: this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
				razonSocial: this.getOpcionesCabecera('Razón Social', 12),
				nombreComercial: this.getOpcionesCabecera('Nombre Comercial', 12),
				nroDocumento: this.getOpcionesCabecera('N° Documento', 12),
				totalCreditos: this.getOpcionesCabecera('Total Créditos', 12),
				totalPagado: this.getOpcionesCabecera('Total Pagado', 12),
				totalSaldo: this.getOpcionesCabecera('Saldo Pendiente', 12),
			},
		}
	}

	navigateToCollectForm = (): void => {
		this.router.navigateByUrl('pago-form')
	}
}
