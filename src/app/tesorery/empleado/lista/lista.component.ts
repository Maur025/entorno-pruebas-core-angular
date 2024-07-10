import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { EmpleadoService } from '../../services/tesoreria/empleado.service'
import { FuncionesComponent } from '../../funciones.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FormularioComponent } from '../formulario/formulario.component'
import { EntidadService } from '../../services/tesoreria/entidad.service'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { ErrorResponseStandard } from 'src/app/shared/interface/common-api-response'

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.scss'],
})
export class ListaComponent extends FuncionesComponent implements OnInit {
	@ViewChild(FormularioComponent) formEmpleados: FormularioComponent
	@ViewChild(FormularioComponent) prueba: FormularioComponent
	@Input() rel_prefix: any
	@Input() rel_field: any
	@Input() rel_id: any

	breadCrumbItems: object[]
	breadCrumbTitle: string = 'Empleados'

	textoBuscar: string = 'Ingrese criterio de busqueda: nombre y nit/ci'
	titulo: string = 'Lista de empleados'
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

	empleado: any
	titleModal: string = ''

	public onSubmitFormStatus: boolean = false

	constructor(
		public entidadService: EntidadService,
		public empleadoService: EmpleadoService,
		private modalService: BsModalService,
		private NotificacionService: NotificacionService
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
				nitCi: this.getOpcionesCabecera('NIT - CI', 12),
				deleted: this.getOpcionesCabecera('Estado', 6),
			},
		}
	}

	crear = (template: TemplateRef<unknown>): void => {
		this.empleado = null
		this.titleModal = 'Nuevo'
		this.modalConfig.class = `modal-dialog modal-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

	editar = (data: object, template: TemplateRef<unknown>): void => {
		this.empleado = data
		this.titleModal = 'Editar'
		this.modalConfig.class = `modal-dialog modal-scrollable`
		this.modalRef = this.modalService.show(template, this.modalConfig)
	}

	habilitar = (data: { id: string }, component, texto) => {
		this.NotificacionService.inhabilitarAlerta(texto, (response: boolean) => {
			if (!response) {
				return
			}
			this.empleadoService.habilitar(data.id).subscribe({
				next: () => {
					this.NotificacionService.successStandar(
						`Registro ${
							texto === 'habilitar' ? 'habilitado' : 'inhabilitado'
						} exitosamente`
					)
				},
				error: (error: ErrorResponseStandard) => {
					this.NotificacionService.alertError(error)
				},
			})
		})
	}

	closeModal = (): void => {
		this.modalService.hide()
		this.onSubmitFormStatus = false
	}

	isChangeSubmitStatus = (): void => {
		this.onSubmitFormStatus = !this.onSubmitFormStatus
	}
}
