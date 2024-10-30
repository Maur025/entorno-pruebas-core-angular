import { Component, Input, OnInit, TemplateRef } from '@angular/core'
import { FondoRendirService } from 'src/app/tesorery/services/tesoreria/fondo-rendir.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { Router } from '@angular/router'
import { FuncionesComponent } from 'src/app/tesorery/funciones.component'
import { ErrorResponseStandard } from 'src/app/shared/interface/common-api-response'

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.scss'],
})
export class ListaRendirComponent extends FuncionesComponent implements OnInit {
	breadCrumbItems: object[]
	breadCrumbTitle: string = 'Fondos a Rendir'
	textoBuscar =
		'Ingrese criterio de busqueda: nombre, nro solicitud y descripción'
	@Input() rel_prefix: any
	@Input() rel_field: any
	@Input() rel_id: any
	titulo: string = 'Lista de Fondos a Rendir'
	formato: any
	modalRef?: BsModalRef

	private modalConfig: {
		ignoreBackdropClick: boolean
		keyboard: boolean
		class: string
	} = {
		ignoreBackdropClick: true,
		keyboard: false,
		class: 'modal-xl modal-scrollable',
	}

	fondo: any
	titleModal: any
	tipoDescargo: any
	tipoTexto: any

	public onSubmitFormStatus: boolean = false

	constructor(
		public fondoRendirService: FondoRendirService,
		private modalService: BsModalService,
		private notificacion: NotificacionService,
		private router: Router
	) {
		super()
	}

	ngOnInit(): void {
		this.breadCrumbItems = [
			{ label: this.breadCrumbTitle },
			{ label: this.titulo, active: true },
		]
		this.formato = this.getCabeceras()
		if (this.rel_prefix && this.rel_field) {
			this.formato.cabeceras[this.rel_field].visible = false
			this.formato.cabeceras[this.rel_field].visibleCheck = false
		}
	}

	getCabeceras = (): object => {
		return {
			cabeceras: {
				acciones: this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
				id: this.getOpcionesCabecera('id', 12, 'number', false),
				nroSolicitud: this.getOpcionesCabecera('Nro Solicitud', 12),
				fechaSolicitud: this.getOpcionesCabecera('Fecha Solicitud', 12),
				descripcion: this.getOpcionesCabecera('Descripción', 6),
				importe: this.getOpcionesCabecera('Monto de Apertura', 12),
				saldo: this.getOpcionesCabecera('Saldo', 12),
				reponsable: this.getOpcionesCabecera('Responsable', 12),
				aperturado: this.getOpcionesCabecera('Aperturado', 12),
				cierre: this.getOpcionesCabecera('Cerrado', 12),
				deleted: this.getOpcionesCabecera('Estado', 6),
			},
		}
	}

	aperturarNuevo = (template: TemplateRef<unknown>): void => {
		this.fondo = null
		this.tipoDescargo = 'DESE'
		this.titleModal = 'Nuevo Desembolso de Fondo a Rendir'
		this.modalConfig.class = `modal-xl modal-dialog-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

	editar = (data: object, template: TemplateRef<unknown>): void => {
		this.fondo = data
		this.tipoDescargo = null
		this.titleModal = 'Editar Fondo a Rendir'
		this.modalConfig.class = `modal-xl modal-dialog-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

	descargos = (
		data: object,
		template: TemplateRef<unknown>,
		tipo,
		tipoTexto
	): void => {
		this.fondo = data
		this.tipoDescargo = tipo
		this.titleModal = tipoTexto + ' de Fondo a Rendir '
		this.modalConfig.class = `modal-xl modal-dialog-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

	detalleFondo = (data: { id: string }): void => {
		this.fondo = data
		this.router.navigate(['fondo/rendir/detalleFondo', data.id])
	}

	cerrar = (data, tabla): void => {
		this.notificacion.alertaSimpleConfirmacionBoton(
			`Esta seguro que desea cerrar el fondo operativo: ${data?.nombre}.`,
			'Sí, cerrar',
			(response: boolean) => {
				if (!response) {
					return
				}
				this.fondoRendirService.cerrarFondo(data.id).subscribe({
					next: () => {
						tabla.obtenerDatos()
						this.notificacion.successStandar('Registro cerrado exitosamente.')
					},
					error: (error: ErrorResponseStandard) => {
						this.notificacion.alertError(error)
					},
				})
			}
		)
	}

	cerrarModal = (): void => {
		this.modalService.hide()
		this.onSubmitFormStatus = false
	}

	habilitar = (data: { id: string }, component, texto): void => {
		this.notificacion.inhabilitarAlerta(texto, (response: boolean) => {
			if (!response) {
				return
			}
			this.fondoRendirService.habilitar(data.id).subscribe({
				next: () => {
					component.obtenerDatos()
					this.notificacion.successStandar(
						`Registro ${
							texto === 'habilitar' ? 'habilitado' : 'inhabilitado'
						} exitosamente.`
					)
				},
				error: (error: ErrorResponseStandard) => {
					this.notificacion.alertError(error)
				},
			})
		})
	}

	isChangeSubmitStatus = (): void => {
		this.onSubmitFormStatus = !this.onSubmitFormStatus
	}
}
