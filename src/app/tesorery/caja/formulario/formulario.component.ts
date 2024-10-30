import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	FormArray,
} from '@angular/forms'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { CentrocostoService } from 'src/app/tesorery/services/tesoreria/centrocosto.service'
import { EstadosService } from 'src/app/tesorery/services/tesoreria/estados.service'
import { CajaService } from 'src/app/tesorery/services/tesoreria/caja.service'
import { FondoCajaService } from 'src/app/tesorery/services/tesoreria/fondo-caja.service'
import { MovimientoCajaService } from 'src/app/tesorery/services/tesoreria/movimiento-caja.service'
import { EmpleadoService } from '../../services/tesoreria/empleado.service'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/common-api-response'
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service'
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface'
import { UtilityService } from 'src/app/shared/services/utilityService.service'
import { ScreenshotService } from '../../services/tesoreria/screenshot.service'

@Component({
	selector: 'app-formulario-caja',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.scss'],
})
export class FormularioCajaComponent implements OnInit {
	@Input() caja
	@Input() cajaIdNoUse
	@Input() tipoMovimiento
	@Output() alActualizar = new EventEmitter<void>()
	@Output() isChangeSubmitStatus: EventEmitter<void> = new EventEmitter<void>()

	public formGroup: FormGroup
	public submitted: boolean = false
	public listaCentroCostos: ResponseDataStandard[] = []
	public listaEstadosCaja: ResponseDataStandard[] = []
	public listaResponsables: ResponseDataStandard[] = []
	public listaFondoCajas: ResponseDataStandard[] = []

	constructor(
		private responseHandlerService: ResponseHandlerService,
		private screenshotService: ScreenshotService,
		private cajaService: CajaService,
		private centroCostosService: CentrocostoService,
		private fondoCajaService: FondoCajaService,
		private movimientoCajaService: MovimientoCajaService,
		private formBuilder: FormBuilder,
		private estadosService: EstadosService,
		private notificacionService: NotificacionService,
		private _localeService: BsLocaleService,
		private empleadoService: EmpleadoService,
		protected utilityService: UtilityService,
	) {
		this._localeService.use('es')
	}

	ngOnInit(): void {
    this.getCentroCostos();
	this.getEmployeesList();
	this.setForm();
	
		/*if (this.caja) this.setCaja()
		this.tipoForm()*/

	}

	setForm() {
		this.formGroup = this.formBuilder.group({
			id: [null, []],
			nombre: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
			empleadoId: [null, [Validators.required]],
			centroCostoId: [null, [Validators.required]],
		})
	}

	/*tipoForm() {
		if (this.tipoMovimiento) {
			if (this.tipoMovimiento == 'APERT') {
				this.formGroup.disable()
				this.addFormApertura()
			} else if (this.tipoMovimiento == 'CIERR') {
				this.formGroup.disable()
				this.addFormMovimiento()
				this.form.monto.disable()
				this.form.monto.setValue(this.caja.saldo)
				this.form.centroCostoId.disable()
			}
		}
	}

	

 	get operaciones(): FormArray {
		return this.formGroup.get('operaciones') as FormArray
	}*/
	get form() {return this.formGroup.controls}
	setCaja() {
		this.formGroup.patchValue({
			id: this.caja.id,
			nombre: this.caja.nombre,
			monto: this.caja.saldo,
			empleadoId: this.caja['empleado']['id'],
			centroCostoId: this.caja['centroCosto']['id'],
		})
	}

	getCentroCostos() {
		this.centroCostosService.habilitados().subscribe({
			next: (response: ApiResponseStandard) => {
				this.listaCentroCostos =
					this.responseHandlerService?.handleResponseAsArray(response)
			},
			error: (error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error),
		})
	}

	getEmployeesList = (): void => {
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

	/*addFormApertura() {
		this.formGroup.addControl(
			'monto',
			new FormControl(null, [Validators.required, Validators.min(1)])
		)
		this.formGroup.addControl(
			'operaciones',
			this.formBuilder.array([], Validators.required)
		)
		this.formGroup.addControl(
			'estadoCajaId',
			new FormControl(null, Validators.required)
		)
	}

	addFormMovimiento() {
		this.formGroup.addControl(
			'monto',
			new FormControl(null, [Validators.required])
		)
		this.formGroup.addControl(
			'estadoCajaId',
			new FormControl(null, Validators.required)
		)
		if (this.caja.saldo != 0) {
			this.formGroup.addControl(
				'operaciones',
				this.formBuilder.array([], Validators.required)
			)
		}
	}

	cambioResponsable = (): void => {
		const employeeIdValue: string = this.formGroup?.get('empleadoId')?.value

		if (!employeeIdValue) {
			return
		}
		const foundEmployeeData: ResponseDataStandard =
			this.listaResponsables?.find(
				rowEmployee => rowEmployee.id === employeeIdValue
			)
		this.formGroup?.patchValue({
			responsable: foundEmployeeData?.nombre || null,
		}) 
	}*/

	confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true

		if (!this.formGroup.valid) {
			return
		}

		this.isChangeSubmitStatus?.emit()
		const dataImg = await this.screenshotService?.takeScreenshot(
			'form-create-edit-cash'
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


   guardar =(): void=>{
    if (this.caja) {
			this.cajaService.update(this.formGroup.value).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
		} else {
			 this.cajaService.register(this.formGroup.value).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
		}
  }

 /* 	guardar = (): void => {
		const data = this.formGroup.getRawValue()

		if (this.tipoMovimiento) {
			data.cajaId = this.caja.id
			data.fecha = new Date()
			data.origen = 'MOVIMIENTO CAJA'
			if (this.tipoMovimiento == 'APERT') {
				data.ingresoEgreso = 'INPUT'
			} else if (this.tipoMovimiento == 'CIERR') {
				data.ingresoEgreso = 'OUT'
			}
			this.movimientoCajaService.register(data).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
			return
		}


    console.log("DATA", data);

		if (this.caja) {
			this.cajaService.update(data).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
		} else {
			this.cajaService.register(data).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
		}
	} */
}
