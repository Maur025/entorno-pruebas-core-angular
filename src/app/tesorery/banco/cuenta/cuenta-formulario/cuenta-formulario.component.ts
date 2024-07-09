import {
	Component,
	EventEmitter,
	Input,
	Output,
	OnInit,
	TemplateRef,
} from '@angular/core'
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { CuentaBancoService } from 'src/app/tesorery/services/tesoreria/cuenta-banco.service'
import { BancoService } from '../../../services/tesoreria/banco.service'
import { MonedaService } from '../../../services/tesoreria/monedas.service'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/commonApiResponse'
import { ResponseDataStandard } from 'src/app/shared/interface/commonListInterfaces'
import { UtilityService } from 'src/app/shared/services/utilityService.service'
import { BsModalService } from 'ngx-bootstrap/modal'

enum AccountInitializationTypeEnum {
	SALDO_INICIAL = 'SALDO_INICIAL',
	TRANSFERENCIA = 'TRANSFERENCIA',
}

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
	public showModalChildren: boolean = false

	constructor(
		private FormBuilder: FormBuilder,
		private notificacionService: NotificacionService,
		private cuentaBancoService: CuentaBancoService,
		private bancoService: BancoService,
		private monedaService: MonedaService,
		protected utilityService: UtilityService,
		protected modalService: BsModalService
	) {}

	ngOnInit(): void {
		this.setForm()
		if (this.idRuta) this.form['bancoId'].disable()
		this.getBancos()
		this.getMonedas()
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
			descripcion: [null, [Validators.required, Validators.minLength(2)]],
			bancoId: [null, [Validators.required]],
			monedaId: [null, [Validators.required]],
			saldo: [null, [Validators.required]],
			typeAccountInitialize: [false],
			balanceTotalTransfer: [{ value: 0, disabled: true }],
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
			typeAccountInitialize: null,
			balanceTotalTransfer: null,
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

	filterAndValidateTransferMediumList = (): boolean => {
		let errorFound: boolean = false

		const transferMediumListFilter: ResponseDataStandard[] =
			this.transferMediumList.filter(
				({ medioTransferenciaId }: ResponseDataStandard) => medioTransferenciaId
			)
		this.transferMediumList = transferMediumListFilter
		for (const rowTransferMediumData of this.transferMediumList) {
			if (rowTransferMediumData.medioTransferenciaId) {
				if (rowTransferMediumData.tipoMedioTransferencia === 'CUENTA') {
					if (
						!rowTransferMediumData.bancoId ||
						!rowTransferMediumData.cuentaId ||
						!parseFloat(rowTransferMediumData.montoTransferir || 0)
					) {
						rowTransferMediumData.errorRow = true
						errorFound = true
					} else {
						rowTransferMediumData.errorRow = false
					}
				}
				if (rowTransferMediumData.tipoMedioTransferencia === 'CAJA') {
					if (
						!rowTransferMediumData.cajaId ||
						!parseFloat(rowTransferMediumData.montoTransferir || 0)
					) {
						rowTransferMediumData.errorRow = true
						errorFound = true
					} else {
						rowTransferMediumData.errorRow = false
					}
				}
			}
		}
		return errorFound
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
				const jsonDataSend: { [key: string]: unknown } = {
					...this.formGroup.value,
					bancoId: this.formGroup.get('bancoId')?.value || this.idRuta || null,
					tipoInicializacion: this.formGroup?.get('typeAccountInitialize')
						?.value
						? AccountInitializationTypeEnum.TRANSFERENCIA
						: AccountInitializationTypeEnum.SALDO_INICIAL,
				}
				if (this.formGroup.get('typeAccountInitialize').value) {
					if (this.transferMediumList?.length > 0) {
						const errorFound: boolean =
							this.filterAndValidateTransferMediumList()
						if (!(this.transferMediumList.length > 0)) {
							this.notificacionService?.alertError(null, {
								message:
									'Agregue al menos 1 registro valido a la tabla para continuar.',
							})
							return
						}
						if (errorFound) {
							this.notificacionService?.alertError(null, {
								message: 'Se requiere que complete los datos en la lista',
							})
							return
						}
					} else {
						this.notificacionService?.alertError(null, {
							message:
								'Asigne al menos un medio de transferencia para continuar.',
						})
					}
					jsonDataSend.mediosTransferenciaList = this.transferMediumList
					jsonDataSend.saldo =
						this.formGroup?.get('balanceTotalTransfer')?.value || 0
					this.createAccount(jsonDataSend)
				} else {
					this.createAccount(jsonDataSend)
				}
			}
		}
	}

	createAccount = (jsonDataSend: object): void => {
		this.notificacionService.alertaSimpleConfirmacion((response: boolean) => {
			if (response) {
				this.cuentaBancoService.register(jsonDataSend).subscribe(
					(response: ApiResponseStandard) => {
						this.notificacionService.successStandar()
						this.alGuardar.emit(response)
					},
					(error: ErrorResponseStandard) => {
						this.notificacionService.alertError(error)
					}
				)
			}
		}, '¿Es correcta la información ingresada?... ¿Desea continuar el registro?')
	}

	onlyNumbersAccount = (fieldName: string = '', event: Event): void => {
		const inputValue: string = (event.target as HTMLInputElement).value
		const sanitizedValue: string = inputValue.replace(/\D/g, '')
		this.formGroup.get(fieldName).setValue(sanitizedValue)
	}

	onChangeSwitchTransferType = (): void => {
		this.transferMediumList = []
		this.formGroup.patchValue({
			balanceTotalTransfer: 0,
			saldo: null,
		})
		const saldoControl: AbstractControl = this.formGroup.get('saldo')

		if (this.formGroup.get('typeAccountInitialize').value) {
			saldoControl.setValidators([Validators.required])
		} else {
			saldoControl.clearValidators()
		}
		saldoControl.updateValueAndValidity()
	}

	openModalTransferMedium = (template: string | TemplateRef<void>): void => {
		this.showModalChildren = true
		this.modalService.show(template, {
			id: 2,
			class:
				'modal-lg modal-scrollable modal-dialog modal-dialog-centered children-custom-modal',
			backdrop: 'static',
		})
	}

	closeModalTransferMedium = (): void => {
		this.modalService.hide(2)
		this.showModalChildren = false
	}

	removeTransferMediumItem = (index: number = null): void => {
		const arrayTemp: ResponseDataStandard[] = this.transferMediumList?.filter(
			(rowTransferMedium: ResponseDataStandard, rowIndex: number) =>
				rowIndex !== index
		)
		this.transferMediumList = arrayTemp
		this.calculateTotalTransferMedium()
	}

	calculateTotalTransferMedium = (): void => {
		let transferBalanceTotal: number = 0
		if (this.transferMediumList.length > 0) {
			for (const rowTransferMedium of this.transferMediumList) {
				transferBalanceTotal += parseFloat(
					rowTransferMedium.montoTransferir || 0
				)
			}
		}
		this.formGroup.patchValue({
			balanceTotalTransfer: transferBalanceTotal,
		})
	}

	addRowTransferMedium = (): void => {
		this.transferMediumList.push({
			id: null,
			medioTransferenciaId: null,
			bancoId: null,
			cuentaId: null,
			cajaId: null,
			montoTransferir: null,
			cashDataSelect: [],
			bankDataSelect: [],
			accountBelongingBankDataSelect: [],
			errorRow: false,
		})
	}
}
