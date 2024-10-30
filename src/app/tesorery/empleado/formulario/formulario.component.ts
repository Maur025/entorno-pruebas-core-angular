import { EmpleadoService } from './../../services/tesoreria/empleado.service'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
	UntypedFormBuilder,
	UntypedFormGroup,
	Validators,
} from '@angular/forms'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/common-api-response'
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface'
import { ScreenshotService } from '../../services/tesoreria/screenshot.service'
import { UtilityService } from 'src/app/shared/services/utilityService.service'

@Component({
	selector: 'formulario-empleado',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
	submitted = false
	formEmpleado: UntypedFormGroup
	@Input() empleado
	@Output() alGuardar: EventEmitter<void> = new EventEmitter<void>()
	@Output() alActualizar: EventEmitter<void> = new EventEmitter<void>()
	@Output() isChangeSubmitStatus: EventEmitter<void> = new EventEmitter<void>()

	constructor(
		private responseHandlerService: ResponseHandlerService,
		private screenshotService: ScreenshotService,
		protected utilityService: UtilityService,
		public formBuilder: UntypedFormBuilder,
		private empleadoService: EmpleadoService,
		private notificacionService: NotificacionService
	) {}

	ngOnInit() {
		this.setForm()
		if (this.empleado) {
			this.getEmployeeData(this.empleado?.id)
		}
	}

	setForm() {
		this.formEmpleado = this.formBuilder.group({
			id: [null],
			nombre: [
				null,
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(255),
				],
			],
			nitCi: [null, [Validators.required, Validators.minLength(4)]],
		})
	}

	getEmployeeData = (employeeId: string): void => {
		if (!employeeId) {
			return
		}
		this.empleadoService?.find(employeeId)?.subscribe({
			next: (response: ApiResponseStandard) => {
				const responseData: ResponseDataStandard =
					this.responseHandlerService?.handleResponseAsObject(response)

				this.formEmpleado.patchValue({
					id: responseData?.id || null,
					nombre: responseData?.nombre || null,
					nitCi: responseData?.nitCi || null,
				})
			},
			error: (error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			},
		})
	}

	confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true
		if (!this.formEmpleado?.valid) {
			return
		}

		this.isChangeSubmitStatus?.emit()
		const dataImg = await this.screenshotService?.takeScreenshot(
			'form-create-edit-employee'
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

	guardar() {
		if (this.empleado) {
			this.empleadoService.update(this.formEmpleado?.value).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) => {
					this.notificacionService?.alertError(error)
				},
			})
		} else {
			this.empleadoService.register(this.formEmpleado.value).subscribe({
				next: () => {
					this.notificacionService.successStandar()
					this.alActualizar.emit()
				},
				error: (error: ErrorResponseStandard) => {
					this.notificacionService?.alertError(error)
				},
			})
		}
	}
}
