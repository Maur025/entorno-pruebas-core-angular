import { Component, OnInit } from '@angular/core'
import { GestionService } from '../../services/tesoreria/gestion.service'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/commonApiResponse'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { AperturaCierreService } from '../../services/tesoreria/apertura-cierre.service'
import {
	FormatListInterface,
	ResponseDataStandard,
} from 'src/app/shared/interface/commonListInterfaces'

@Component({
	selector: 'app-apertura-cierre',
	templateUrl: './apertura-cierre.component.html',
	styleUrls: ['./apertura-cierre.component.scss'],
})
export class AperturaCierreComponent implements OnInit {
	public tableTitle: string = 'Listado de Meses'
	public filterData: {
		gestionId: string
		keyword: string
		aperturado: boolean
	} = null
	public formatList: FormatListInterface = null

	constructor(
		private gestionService: GestionService,
		protected aperturaCierreService: AperturaCierreService,
		private notificacionService: NotificacionService
	) {}

	ngOnInit(): void {
		this.setFormatList()
		this.getAccountingPeriod()
	}

	getAccountingPeriod = (): void => {
		this.gestionService.getRecordsEnabled().subscribe({
			next: (response: ApiResponseStandard) => {
				console.log(response)
				this.filterData = {
					...this.filterData,
					gestionId: response?.content[0]?.id || null,
				}
			},
			error: (error: ErrorResponseStandard) => {
				this.notificacionService.alertError(error)
			},
		})
	}

	toggleStatus = (rowData: ResponseDataStandard): void => {}

	setFormatList = (): void => {
		this.formatList = {
			cabeceras: {
				acciones: {
					visible: true,
					visibleCheck: true,
					buscable: false,
					texto: 'Acciones',
					filtrable: false,
					filtrotipo: null,
				},
				mes: {
					visible: true,
					visibleCheck: true,
					buscable: true,
					texto: 'Mes',
					filtrable: true,
					filtrotipo: 'string',
				},
				fechaIni: {
					visible: true,
					visibleCheck: true,
					buscable: true,
					texto: 'Fecha Inicio',
					filtrable: true,
					filtrotipo: 'string',
				},
				fechaFin: {
					visible: true,
					visibleCheck: true,
					buscable: true,
					texto: 'Fecha Fin',
					filtrable: true,
					filtrotipo: 'string',
				},
				deleted: {
					visible: true,
					visibleCheck: true,
					buscable: true,
					texto: 'Estado',
					filtrable: true,
					filtrotipo: 'string',
				},
			},
		}
	}
}
