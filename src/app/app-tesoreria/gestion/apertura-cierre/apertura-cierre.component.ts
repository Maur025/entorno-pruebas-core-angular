import { Component, ViewChild } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { TablaNewComponent } from 'src/app/shared/ui/tabla-new/tabla-new.component';
import { FuncionesComponent } from '../../funciones.component';
import { AperturaCierreService } from 'src/app/core/services/tesoreria/apertura-cierre.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { FormatListInterface, ResponseDataStandard } from 'src/app/shared/interface/common-list-interface';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { GestionService } from 'src/app/core/services/tesoreria/gestion.service';

@Component({
  selector: 'app-apertura-cierre',
  templateUrl: './apertura-cierre.component.html',
  styleUrls: ['./apertura-cierre.component.scss']
})
export class AperturaCierreComponent extends FuncionesComponent {
  @ViewChild('tabla') tabla: TablaNewComponent;

	public tableTitle: string = 'Listado de Meses'
	public filterData: {
		gestionId: string | number
		keyword: string
		aperturado: boolean
	} = null
	public formatList: FormatListInterface = null
	public accountingPeriodData: ResponseDataStandard[] = []

	constructor(
		private responseHandlerService: ResponseHandlerService,
		private gestionService: GestionService,
		protected aperturaCierreService: AperturaCierreService,
		private notificacionService: NotificacionService
	) {
		super()
	}

	ngOnInit(): void {
		this.setFormatList()
		this.getAccountingPeriod()
	}

	getAccountingPeriod = (): void => {
		this.gestionService.getRecordsEnabled().subscribe({
			next: (response: ApiResponseStandard) => {
				this.accountingPeriodData =
					this.responseHandlerService?.handleResponseAsArray(response)

				this.filterData = {
					...this.filterData,
					gestionId: this.accountingPeriodData[0]?.id || null,
				}
			},
			error: (error: ErrorResponseStandard) => {
				this.notificacionService.alertError(error)
			},
		})
	}

	toggleStatus = (rowData: ResponseDataStandard): void => {
		this.notificacionService?.alertInhabilitarCierreApertura(
			`${rowData.aperturado ? 'cierre' : 'apertura'} del mes ${
				rowData.mes || 'N/A'
			}`,
			(response: { isConfirmed: boolean; value: string }) => {
				if (response.isConfirmed && response.value) {
					this.aperturaCierreService
						.toggleStatus({
							aperturaCierreId: rowData?.id || null,
							descripcion: response.value || 'N/A',
						})
						?.subscribe({
							next: () => {
								this.notificacionService?.successStandar(
									`Mes ${rowData.mes || 'N/A'} ${
										rowData.aperturado ? 'cerrado' : 'aperturado'
									} exitosamente.`
								)
								this.tabla.obtenerDatos()
							},
							error: (error: ErrorResponseStandard) => {
								this.notificacionService?.alertError(error)
							},
						})
				}
			}
		)
	}

	setFormatList = (): void => {
		this.formatList = {
			cabeceras: {
				acciones: this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
				mes: this.getOpcionesCabecera('Mes', 12),
				fechaIni: this.getOpcionesCabecera('Fecha Inicio', 12, 'text'),
				fechaFin: this.getOpcionesCabecera('Fecha fin', 12, 'text'),
				deleted: this.getOpcionesCabecera('Estado', 6),
			},
		}
	}
}
