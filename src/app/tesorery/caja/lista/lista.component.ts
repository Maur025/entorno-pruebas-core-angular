import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FuncionesComponent } from '../../funciones.component'
import { CajaService } from 'src/app/tesorery/services/tesoreria/caja.service'
import { FormularioCajaComponent } from '../formulario/formulario.component'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { Router } from '@angular/router'
import { ErrorResponseStandard } from 'src/app/shared/interface/common-api-response'

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.scss'],
})
export class ListaCajaComponent extends FuncionesComponent implements OnInit {
	@ViewChild('appFormCaja') appFormCaja: FormularioCajaComponent
	breadCrumbItems: object[]
	breadCrumbTitle: string = 'Cajas'
	textoBuscar = 'Ingrese criterio de busqueda: nombre y nit/ci'
	@Input() rel_prefix: any
	@Input() rel_field: any
	@Input() rel_id: any
	titulo: string = 'Lista de Cajas'
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

	titleModal: any
	caja: any
	tipoMovimiento: any
	cajaIdNoUse: any

	protected onSubmitFormStatus: boolean = false

	constructor(
		public cajaService: CajaService,
		private router: Router,
		private modalService: BsModalService,
		private notificacionService: NotificacionService
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

	getCabeceras() {
		return {
			cabeceras: {
				acciones: this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
				id: this.getOpcionesCabecera('id', 12, 'number', false),
				nombre: this.getOpcionesCabecera('Nombre', 12),
				responsable: this.getOpcionesCabecera('Responsable', 12),
				saldo: this.getOpcionesCabecera('Saldo', 12),
				aperturaCierre: this.getOpcionesCabecera('Estado', 6),
			},
		}
	}

	crear = (template: TemplateRef<unknown>): void => {
		this.caja = undefined
		this.titleModal = 'Nueva Caja'
		this.tipoMovimiento = undefined
		this.cajaIdNoUse = undefined
		this.modalConfig.class = `modal-lg modal-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

	editar = (data: object, template: TemplateRef<unknown>): void => {
		this.caja = data
		this.tipoMovimiento = undefined
		this.cajaIdNoUse = undefined
		this.titleModal = 'Editar Caja'
		this.modalConfig.class = `modal-lg modal-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

	aperturar = (data: object, template: TemplateRef<unknown>) => {
		this.caja = data
		this.tipoMovimiento = 'APERT'
		this.cajaIdNoUse = undefined
		this.titleModal = 'Apertura de Caja'
		this.modalConfig.class = `modal-lg modal-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

  dataCaja:any;
  aperturarCaja(data: object, template: TemplateRef<unknown>){
    this.dataCaja=data;
    this.modalRef = this.modalService.show(template, this.modalConfig)
  }

	cierre = (data: { id: string }, template: TemplateRef<unknown>): void => {
		this.caja = data
		this.tipoMovimiento = 'CIERR'
		this.cajaIdNoUse = data.id
		this.titleModal = 'Cierre de Caja'
		this.modalConfig.class = `modal-lg modal-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

	habilitar = (data: { id: string }, component, texto): void => {
		this.notificacionService.inhabilitarAlerta(texto, (response: boolean) => {
			if (!response) {
				return
			}
			this.cajaService.habilitar(data.id).subscribe({
				next: () => {
					component.obtenerDatos()
					this.notificacionService.successStandar(
						`Registro ${
							texto === 'habilitar' ? 'habilitado' : 'inhabilitado'
						} exitosamente.`
					)
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
		})
	}

	detalleCaja = (data: { id: string }): void => {
		this.router.navigate(['caja/detalleCaja', data.id])
	}

	cerrarModal = (): void => {
		this.modalService.hide()
		this.onSubmitFormStatus = false
	}

	isChangeSubmitStatus = (): void => {
		this.onSubmitFormStatus = !this.onSubmitFormStatus
	}
}
