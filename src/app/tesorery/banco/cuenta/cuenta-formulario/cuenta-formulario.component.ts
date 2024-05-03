import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnInit,
	TemplateRef,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { CuentaBancoService } from 'src/app/tesorery/services/tesoreria/cuenta-banco.service'
import { BancoService } from '../../../services/tesoreria/banco.service'
import { MonedaService } from '../../../services/tesoreria/monedas.service'
import { MedioTransferenciaService } from '../../../services/tesoreria/medio-transferencia.service'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/commonApiResponse'
import { ResponseDataStandard } from 'src/app/shared/interface/commonListInterfaces'
import { UtilityService } from 'src/app/shared/services/utilityService.service'
import { BsModalService } from 'ngx-bootstrap/modal'

@Component({
	selector: 'app-cuenta-formulario',
	templateUrl: './cuenta-formulario.component.html',
	styleUrls: ['./cuenta-formulario.component.scss'],
})
export class CuentaFormularioComponent implements OnInit {
	public titulo: string = 'Cuentas-Banco'

	public formGroup: FormGroup
	public submitted: boolean = false
	@Output() alGuardar: EventEmitter<ApiResponseStandard> =
		new EventEmitter<ApiResponseStandard>()
	@Output() alActualizar: EventEmitter<ApiResponseStandard> =
		new EventEmitter<ApiResponseStandard>()
	@Input() cuenta
	@Input() idRuta
	public listaBancos: ResponseDataStandard[] = []
	public listaMonedas: ResponseDataStandard[] = []
	public transferencia: boolean = false
	public listaMediosTransferencia: ResponseDataStandard[] = []
	public accountsExistingCurrentlySelect: ResponseDataStandard[] = []
	public transferMediumList: ResponseDataStandard[] = []

	constructor(
		private FormBuilder: FormBuilder,
		private notificacionService: NotificacionService,
		private cuentaBancoService: CuentaBancoService,
		private bancoService: BancoService,
		private monedaService: MonedaService,
		private medioTransferenciaService: MedioTransferenciaService,
		protected utilityService: UtilityService,
		protected modalService: BsModalService
	) {}

	ngOnInit(): void {
		this.setForm()
		if (this.idRuta) this.form['bancoId'].disable()
		this.getBancos()
		this.getMonedas()
		this.getMediosTransferencia()
		if (this.cuenta) {
			this.setCuenta()
		} else {
			this.form['bancoId'].setValue(this.idRuta)
		}
	}

	setForm = (): void => {
		this.formGroup = this.FormBuilder.group({
			id: [null, []],
			nroCuenta: [
				null,
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(255),
				],
			],
			descripcion: [null, [Validators.minLength(2)]],
			bancoId: [null, [Validators.required]],
			monedaId: [null, [Validators.required]],
			saldo: [null, [Validators.pattern('^[0-9]+(.[0-9]*)?$')]],
			typeAccountInitialize: [false],
			cuentaOrigenId: [null, [Validators.required]],
			balanceTotalTransfer: [
				{ value: 0, disabled: true },
				[Validators.required],
			],
		})
	}

	get form() {
		return this.formGroup.controls
	}

	setCuenta = (): void => {
		this.formGroup.setValue({
			id: this.cuenta.id,
			nroCuenta: this.cuenta.nroCuenta,
			descripcion: this.cuenta.descripcion,
			bancoId: this.cuenta.bancoId,
			monedaId: this.cuenta.monedaId,
			saldo: this.cuenta.saldo,
		})
		this.form['saldo'].disable()
	}

	getBancos = (): void => {
		this.bancoService.habilitados().subscribe(
			(data: ApiResponseStandard) => {
				this.listaBancos = data.content
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService.alertError(error)
			}
		)
	}

	getMonedas = (): void => {
		this.monedaService.habilitados().subscribe(
			(data: ApiResponseStandard) => {
				this.listaMonedas = data.content
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService.alertError(error)
			}
		)
	}

	getMediosTransferencia = (): void => {
		this.medioTransferenciaService.habilitados().subscribe(
			(data: ApiResponseStandard) => {
				this.listaMediosTransferencia = data.content
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService.alertError(error)
			}
		)
	}

	cambioMonto = (): void => {
		if (this.form['saldo'].value ?? '' !== '') {
			this.formGroup.addControl(
				'medioTransferenciaId',
				new FormControl(null, Validators.required)
			)
			this.transferencia = true
		} else {
			this.formGroup.removeControl('medioTransferenciaId')
			this.transferencia = false
		}
	}

	guardar = (): void => {
		this.submitted = true
		if (this.formGroup.valid) {
			if (this.cuenta) {
				this.cuentaBancoService.update(this.formGroup.getRawValue()).subscribe(
					(response: ApiResponseStandard) => {
						this.notificacionService.successStandar()
						this.alActualizar.emit(response)
					},
					(error: ErrorResponseStandard) => {
						this.notificacionService.alertError(error)
					}
				)
			} else {
				this.cuentaBancoService
					.register(this.formGroup.getRawValue())
					.subscribe(
						(response: ApiResponseStandard) => {
							this.notificacionService.successStandar()
							this.alGuardar.emit(response)
						},
						(error: ErrorResponseStandard) => {
							this.notificacionService.alertError(error)
						}
					)
			}
		}
	}

	onlyNumbersAccount = (fieldName: string = '', event: Event): void => {
		const inputValue: string = (event.target as HTMLInputElement).value
		const sanitizedValue: string = inputValue.replace(/\D/g, '')
		this.formGroup.get(fieldName).setValue(sanitizedValue)
	}

	openModalTransferMedium = (template: string | TemplateRef<unknown>): void => {
		this.modalService.show(template, {
			class: 'modal-sm modal-scrollable',
		})
	}
}
