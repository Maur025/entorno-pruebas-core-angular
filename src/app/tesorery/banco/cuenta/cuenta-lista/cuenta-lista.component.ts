import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { ActivatedRoute, Router } from '@angular/router'
import { CuentaBancoService } from 'src/app/tesorery/services/tesoreria/cuenta-banco.service'
import { CuentaFormularioComponent } from '../cuenta-formulario/cuenta-formulario.component'
import { FuncionesComponent } from 'src/app/tesorery/funciones.component'
import { ResponseDataStandard } from 'src/app/shared/interface/commonListInterfaces'
import { ErrorResponseStandard } from 'src/app/shared/interface/commonApiResponse'

@Component({
	selector: 'app-cuenta-lista',
	templateUrl: './cuenta-lista.component.html',
	styleUrls: ['./cuenta-lista.component.scss'],
})
export class CuentaListaComponent extends FuncionesComponent implements OnInit {
	@ViewChild('appFormCuenta') appFormCuenta: CuentaFormularioComponent

	breadCrumbItems: object[]
	breadCrumbTitle: string = 'Adminstrar Cuentas de Banco'
	@Input() titulo: string = 'Lista de Cuentas de Banco'
	@Input() rel_prefix: any
	@Input() rel_field: any
	@Input() rel_id: any
	@Input() getAll = 'getAll'
	@Input() id
	@Input() direccion = true
	textoBuscar: string = 'Ingrese criterio de búsqueda: nro cuenta y descripción'
	editCreateWithModal = false
	dataEdit = null
	modalRef?: BsModalRef
	formato: any
	servicio = null
	cuenta: any

	constructor(
		public CuentaBancoService: CuentaBancoService,
		private modalService: BsModalService,
		private notificacionService: NotificacionService,
		private route: ActivatedRoute,
		private router: Router
	) {
		super()
	}

	ngOnInit(): void {
		this.breadCrumbItems = [
			{ label: this.breadCrumbTitle },
			{ label: this.titulo, active: true },
		]
		if (this.rel_prefix) this.servicio.setPrefix(this.rel_prefix)
		this.formato = this.getCabeceras()
		if (this.rel_prefix && this.rel_field) {
			this.formato.cabeceras[this.rel_field].visible = false
			this.formato.cabeceras[this.rel_field].visibleCheck = false
		}
	}

	getCabeceras() {
		return {
			cabeceras: {
				acciones: this.getOpcionesCabecera('Acciones', 12),
				id: this.getOpcionesCabecera('id', 12, 'number', false),
				nroCuenta: this.getOpcionesCabecera('Nro Cuenta', 12),
				descripcion: this.getOpcionesCabecera('Descripción', 12),
				/* "banco": this.getOpcionesCabecera('Banco', 12), */
				moneda: this.getOpcionesCabecera('Moneda', 12),
				saldo: this.getOpcionesCabecera('Saldo', 12),
				estadoContabilidad: this.getOpcionesCabecera('Estado Contabilidad', 6),
				estado: this.getOpcionesCabecera('Estado', 6),
			},
		}
	}

	crear(template: string | TemplateRef<unknown>) {
		this.modalRef = this.modalService.show(template, {
			class: `modal-lg modal-scrollable`,
		})
	}

	editar(data: object, template: string | TemplateRef<unknown>) {
		this.cuenta = data
		this.modalRef = this.modalService.show(template, {
			class: `modal-lg modal-scrollable`,
		})
	}

	verMovimientos(data) {
		this.router.navigate(['./detalleMovimientos/' + data.id, {}], {
			relativeTo: this.route,
		})
	}

	habilitar(data: ResponseDataStandard, component, texto) {
		this.notificacionService.inhabilitarAlerta(texto, (response: boolean) => {
			if (response) {
				this.CuentaBancoService.habilitar(data.id).subscribe(
					() => {
						component.obtenerDatos()
						this.notificacionService.successStandar(
							`Registro ${
								texto === 'habilitar' ? 'habilitado' : 'inhabilitado'
							} exitosamente`
						)
					},
					(error: ErrorResponseStandard) => {
						this.notificacionService.alertError(error)
					}
				)
			}
		})
	}

	eliminar(data: ResponseDataStandard, component) {
		this.notificacionService.alertaEliminacion(
			data.nombre,
			(response: boolean) => {
				if (response) {
					this.servicio.delete(data.id).subscribe(
						() => {
							component.obtenerDatos()
							this.notificacionService.successStandar(
								'Registro eliminado exitosamente.'
							)
						},
						(error: ErrorResponseStandard) => {
							this.notificacionService.alertError(error)
						}
					)
				}
			}
		)
	}

	cerrarModal() {
		this.modalService.hide()
	}
}
