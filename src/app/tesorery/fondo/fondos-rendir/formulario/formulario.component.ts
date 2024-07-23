import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	FormArray,
	AbstractControl,
} from '@angular/forms'
import { FondoRendirService } from 'src/app/tesorery/services/tesoreria/fondo-rendir.service'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { CentrocostoService } from 'src/app/tesorery/services/tesoreria/centrocosto.service'
import { DetalleFondoRendirService } from 'src/app/tesorery/services/tesoreria/detalle-fondo-rendir.service'
import { EstadosService } from 'src/app/tesorery/services/tesoreria/estados.service'
import { EmpleadoService } from 'src/app/tesorery/services/tesoreria/empleado.service'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/common-api-response'
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service'
import { UtilityService } from 'src/app/shared/services/utilityService.service'
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface'
import { ScreenshotService } from 'src/app/tesorery/services/tesoreria/screenshot.service'

@Component({
	selector: 'app-formulario-rendir',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.scss'],
})
export class FormularioRendirComponent implements OnInit {
	@Input() esquema
	@Input() transaccion
	@Input() fondo
	@Input() tipoDescargo
	@Output() alActualizar = new EventEmitter<void>()
	@Output() isChangeSubmitStatus: EventEmitter<void> = new EventEmitter<void>()
	formGroup: FormGroup
	submitted = false
	listaCentroCostos: any
	listaBancos: any
	listaResponsables: any
	listaCuentasBanco: any
	listaMedioTransferencias: any
	listaEstados: any
	fechaActual: any
	creditoForm = []
	montoPagar: any
	montoExcedentePagar: any
	importeTotalCredito = 0
	isDevolucion: any
	isPlanPagos: any

	constructor(
		private responseHandlerService: ResponseHandlerService,
		private screenshotService: ScreenshotService,
		private formBuilder: FormBuilder,
		private fondoRendirService: FondoRendirService,
		private empleadoService: EmpleadoService,
		private estadosService: EstadosService,
		private detalleFondoRendirService: DetalleFondoRendirService,
		private centroCostosService: CentrocostoService,
		private notificacionService: NotificacionService,
		private _localeService: BsLocaleService,
		protected utilityService: UtilityService
	) {
		this._localeService.use('es')
	}

	ngOnInit(): void {
		this.initForm()
		this.getResponsables()
		this.getCentroCostos()
		this.getEstados()
		if (this.fondo) this.setFondo()
		if (this.esquema) this.setTransaccion()
		this.fechaActual = new Date()
		this.fechaActual.setHours(0, 0, 0, 0)
		this.tipoDescargoForm()
	}

	initForm() {
		this.formGroup = this.formBuilder.group({
			id: [null, []],
			fechaSolicitud: [null, [Validators.required]],
			nroSolicitud: [
				null,
				[Validators.required, Validators.pattern(/^[0-9]*$/)],
			],
			importe: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
			aperturado: [null],
			descripcion: [null, [Validators.required]],
			empleadoId: [null, [Validators.required]],
			centroCostoId: [null, [Validators.required]],
		})
	}

	tipoDescargoForm() {
		if (this.tipoDescargo) {
			if (this.tipoDescargo == 'DESE') {
				this.addFormDesembolso()
			} else {
				this.formGroup.disable()
				this.addFormDescargo()
				this.form.descripcion.setValue(null)
				this.form.descripcion.enable()
				this.form.saldo.setValue(this.fondo.saldo)
				this.form.saldo.disable()
				if (this.tipoDescargo == 'CIERR') {
					if (this.fondo.saldo < 0) {
						this.form.monto.setValue(Math.abs(this.form.saldo.value))
						this.montoExcedentePagar = this.form.monto.value
						this.form.monto.disable()
						this.montoPagar = this.form.monto.value
					} else if (this.fondo.saldo >= 0) {
						this.form.monto.setValue(this.form.saldo.value)
						this.montoPagar = this.form.monto.value
						this.form.monto.disable()
					}
				}
			}
		}
	}

	addFormDesembolso() {
		this.formGroup.addControl(
			'estado',
			new FormControl(null, Validators.required)
		)
		this.formGroup.addControl(
			'operaciones',
			this.formBuilder.array([], [Validators.required])
		)
	}

	addFormDescargo() {
		if (this.tipoDescargo == 'DEVO') {
			this.formGroup.addControl(
				'monto',
				new FormControl(null, [
					Validators.required,
					Validators.min(1),
					this.validatorMontoDevolucion(this.fondo.saldo),
				])
			)
		} else if (this.tipoDescargo == 'CIERR') {
			this.formGroup.addControl(
				'monto',
				new FormControl(null, [Validators.required, Validators.min(1)])
			)
		}
		this.formGroup.addControl(
			'saldo',
			new FormControl(null, [Validators.required])
		)
		this.formGroup.addControl(
			'estado',
			new FormControl(null, Validators.required)
		)
		this.formGroup.addControl(
			'operaciones',
			this.formBuilder.array([], [Validators.required])
		)
		this.form.descripcion.setValidators([Validators.required])
	}

	getCentroCostos() {
		this.centroCostosService.habilitados().subscribe(
			data => {
				this.listaCentroCostos = data.content
			},
			error => this.notificacionService.alertError(error)
		)
	}

	getResponsables = (): void => {
		this.empleadoService?.listarHabilitados().subscribe({
			next: (response: ApiResponseStandard) => {
				this.listaResponsables =
					this.responseHandlerService?.handleResponseAsArray(response)
			},
			error: (error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			},
		})
	}

	getEstados() {
		this.estadosService.habilitadosFondoRendir().subscribe(
			data => {
				this.listaEstados = data.content
				if (this.tipoDescargo)
					this.form.estado.setValue(
						this.listaEstados.find(e => e.codigo == this.tipoDescargo).id
					)
			},
			error => this.notificacionService.alertError(error)
		)
	}

	get form() {
		return this.formGroup.controls
	}

	setFondo() {
		this.formGroup.patchValue({
			fechaSolicitud: new Date(this.fondo.fechaSolicitud),
			nroSolicitud: this.fondo.nroSolicitud,
			importe: this.fondo.importe,
			saldo: this.fondo.saldo,
			aperturado: this.fondo.aperturado,
			descripcion: this.fondo.descripcion,
			empleadoId: this.fondo?.empleadoId,
			centroCostoId: this.fondo.centroCostoId,
		})
	}

	setTransaccion() {
		const fecha =
			this.transaccion.fechaMovimiento.substring(5, 7) +
			'-' +
			this.transaccion.fechaMovimiento.substring(8, 10) +
			'-' +
			this.transaccion.fechaMovimiento.substring(0, 4)

		this.formGroup.patchValue({
			fechaMovimiento: new Date(fecha),
			centroCostoId: this.transaccion.centroCostoId,
			monto: this.transaccion.monto,
			empleadoId: this.transaccion?.empleadoId,
		})
		this.form.monto.disable()
		this.form.centroCostoId.disable()
		this.form.fechaMovimiento.disable()
		this.cambioMontoMovimiento()
	}

	get planPagos(): FormArray {
		return this.formGroup.get('planPagos') as FormArray
	}

	newPago(): FormGroup {
		return this.formBuilder.group({
			fechaPago: [null, Validators.required],
			importe: [null, [Validators.required, Validators.min(1)]],
		})
	}

	addPago() {
		this.planPagos.push(this.newPago())
	}

	removePago(index) {
		this.planPagos.removeAt(index)
	}

	generarPlanPagos() {
		this.submitted = true
		if (this.montoExcedentePagar > 0) {
			this.planPagos.controls = []
			let cuotas = this.creditoForm['cuotas'] ?? 1
			let montoCalculado = this.montoExcedentePagar / cuotas
			let fechaPago = new Date()
			if (
				this.creditoForm['tipoCuota'] == 2 &&
				this.creditoForm['cuotas'] > 0
			) {
				cuotas = 100 / this.creditoForm['cuotas']
				montoCalculado =
					(this.montoExcedentePagar * this.creditoForm['cuotas']) / 100
			}
			for (let ic = 0; ic < cuotas; ic++) {
				if (this.creditoForm['dias'] > 0)
					fechaPago = this.addHoursToDate(
						fechaPago,
						parseInt(this.creditoForm['dias']) * 24
					)
				this.addPago()
				this.planPagos.controls[ic]['controls'].fechaPago.setValue(fechaPago)
				this.planPagos.controls[ic]['controls'].importe.setValue(montoCalculado)
			}
			this.calcularCuotas()
		}
	}

	calcularCuotas() {
		this.importeTotalCredito = 0
		this.planPagos.controls.forEach(pago => {
			this.importeTotalCredito += pago['controls']['importe'].value
		})
		if (this.importeTotalCredito != this.montoExcedentePagar) {
			const ultimaCuotaIndice = this.planPagos.controls.length - 1
			this.planPagos.controls[ultimaCuotaIndice]['controls'][
				'importe'
			].setValue(
				this.planPagos.controls[ultimaCuotaIndice]['controls']['importe']
					.value +
					(this.montoExcedentePagar - this.importeTotalCredito)
			)
			this.calcularCuotas()
		}
	}

	addHoursToDate(objDate, intHours) {
		const numberOfMlSeconds = objDate.getTime()
		const addMlSeconds = intHours * 60 * 60000
		const newDateObj = new Date(numberOfMlSeconds + addMlSeconds)
		return newDateObj
	}

	cambioMontoApertura() {
		this.montoPagar = this.form.importe.value
	}

	cambioMontoMovimiento() {
		this.montoPagar = this.form.monto.value
	}

	confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true
		if (!this.formGroup?.valid) {
			return
		}
		this.isChangeSubmitStatus?.emit()
		const dataImg = await this.screenshotService.takeScreenshot(
			'form-new-edit-operation-fund-to-render'
		)
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>
			this.sweetAlertVerifyHandleResponse(response)
		)
	}

	sweetAlertVerifyHandleResponse = (response: boolean): void => {
		if (response) {
			this.guardar()
		}
		this.isChangeSubmitStatus.emit()
	}

	guardar = (): void => {
		const data = this.formGroup.getRawValue()
		data.nroReferencia = data.nroSolicitud
		data.refId = null
		data.reponsable =
			this.listaResponsables.find(
				(employee: ResponseDataStandard) => employee?.id == data.empleadoId
			)?.nombre || null

		if (this.tipoDescargo && this.fondo) {
			data.fondoRendirId = this.fondo.id
			if (this.tipoDescargo == 'DESE') {
				data.ingresoEgreso = 'OUT'
				data.aperturado = true
			} else {
				data.ingresoEgreso = 'INPUT'
			}
			data.fechaMovimiento = new Date()
			this.detalleFondoRendirService.register(data).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
		} else if (!this.tipoDescargo && this.fondo) {
			data.id = this.fondo.id
			this.fondoRendirService.update(data).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
		} else {
			this.fondoRendirService.register(data).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
		}
	}

	validatorFecha() {
		return (control: AbstractControl): any => {
			let errores = 'invalido'
			const diaActual = new Date()
			diaActual.setHours(0, 0, 0, 0)
			if (control.value && new Date(control.value) >= diaActual)
				errores = 'valido'
			if (control.value && errores == 'invalido')
				return { fechaInvalida: 'INVALID' }
			else return null
		}
	}

	validatorMontoDevolucion(monto) {
		return (control: AbstractControl): any => {
			let errores = 'invalido'
			if (control.value && control.value <= monto) errores = 'valido'
			if (control.value && errores == 'invalido')
				return { montoDevolucion: 'INVALID' }
			else return null
		}
	}
}
