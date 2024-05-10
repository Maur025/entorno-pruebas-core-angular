import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/commonApiResponse'
import { ResponseDataStandard } from 'src/app/shared/interface/commonListInterfaces'
import { UtilityService } from 'src/app/shared/services/utilityService.service'
import { BancoService } from 'src/app/tesorery/services/tesoreria/banco.service'
import { CajaService } from 'src/app/tesorery/services/tesoreria/caja.service'
import { CuentaBancoService } from 'src/app/tesorery/services/tesoreria/cuenta-banco.service'
import { MedioTransferenciaService } from 'src/app/tesorery/services/tesoreria/medio-transferencia.service'

enum TypeTransferMediumEnum {
	CAJA = 'CAJA',
	CUENTA = 'CUENTA',
}

@Component({
	selector: 'app-medio-transferencia-cuenta-list-form',
	templateUrl: './medio-transferencia-cuenta-list-form.component.html',
	styleUrls: ['./medio-transferencia-cuenta-list-form.component.scss'],
})
export class MedioTransferenciaCuentaListFormComponent implements OnInit {
	@Input() transferMediumList: ResponseDataStandard[] = []
	@Output() calculateTotalList: EventEmitter<void> = new EventEmitter<void>()
	@Output() removeItemList: EventEmitter<number> = new EventEmitter<number>()

	public transferMediumDataSelect: ResponseDataStandard[] = []

	private transferMediumMap: object = {
		DEPOSITO: TypeTransferMediumEnum.CUENTA,
		TRANSFERENCIA: TypeTransferMediumEnum.CUENTA,
		CHEQUE: TypeTransferMediumEnum.CUENTA,
		GIRO: TypeTransferMediumEnum.CUENTA,
		EFECTIVO: TypeTransferMediumEnum.CAJA,
	}

	constructor(
		public utilityService: UtilityService,
		private medioTransferenciaService: MedioTransferenciaService,
		private notificacionService: NotificacionService,
		private bancoService: BancoService,
		private cuentaBancoService: CuentaBancoService,
		private cajaService: CajaService
	) {}

	ngOnInit(): void {
		this.getTransferMediumData()
	}

	getTransferMediumData = (): void => {
		this.medioTransferenciaService?.habilitados()?.subscribe(
			(response: ApiResponseStandard) => {
				this.transferMediumDataSelect = response?.content || []
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			}
		)
	}

	getBankDataByRow = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		if (rowTransferMediumData.medioTransferenciaId) {
			this.bancoService?.habilitados()?.subscribe(
				(response: ApiResponseStandard) => {
					rowTransferMediumData.bankDataSelect = response?.content || []
				},
				(error: ErrorResponseStandard) => {
					this.notificacionService?.alertError(error)
				}
			)
		}
	}

	getCashDataByRow = (rowTransferMediumData: ResponseDataStandard = null) => {
		if (rowTransferMediumData.medioTransferenciaId) {
			this.cajaService?.habilitados()?.subscribe(
				(response: ApiResponseStandard) => {
					rowTransferMediumData.cashDataSelect = response?.content || []
				},
				(error: ErrorResponseStandard) => {
					this.notificacionService?.alertError(error)
				}
			)
		}
	}

	getAccountDataByRow = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		if (
			rowTransferMediumData.medioTransferenciaId &&
			rowTransferMediumData.bancoId
		) {
			this.cuentaBancoService
				.getCuentasBanco(
					1000,
					1,
					'nroCuenta',
					false,
					'',
					rowTransferMediumData.bancoId
				)
				.subscribe(
					(response: ApiResponseStandard) => {
						rowTransferMediumData.accountBelongingBankDataSelect =
							response?.content || []
					},
					(error: ErrorResponseStandard) => {
						this.notificacionService?.alertError(error)
					}
				)
		}
	}

	onChangeTransferMediumSelect = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		this.resetTransferMediumCurrentOptions(rowTransferMediumData)
		if (rowTransferMediumData.medioTransferenciaId) {
			const transferMediumFound: ResponseDataStandard =
				this.transferMediumDataSelect?.find(
					(rowTransferMedium: ResponseDataStandard) =>
						rowTransferMedium.id === rowTransferMediumData.medioTransferenciaId
				)
			rowTransferMediumData.tipoMedioTransferencia =
				this.transferMediumMap[transferMediumFound.medio] || null
			if (
				rowTransferMediumData.tipoMedioTransferencia ===
				TypeTransferMediumEnum.CUENTA
			) {
				this.getBankDataByRow(rowTransferMediumData)
			}
			if (
				rowTransferMediumData.tipoMedioTransferencia ===
				TypeTransferMediumEnum.CAJA
			) {
				this.getCashDataByRow(rowTransferMediumData)
			}
		} else {
			rowTransferMediumData.tipoMedioTransferencia = null
		}
	}

	resetTransferMediumCurrentOptions = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		rowTransferMediumData.bancoId = null
		rowTransferMediumData.cuentaId = null
		rowTransferMediumData.cajaId = null
		rowTransferMediumData.montoTransferir = null
		rowTransferMediumData.cashDataSelect = []
		rowTransferMediumData.bankDataSelect = []
		rowTransferMediumData.accountBelongingBankDataSelect = []
		rowTransferMediumData.tipoMedioTransferencia = null
		this.calculateTotalList.emit()
	}

	onChangeBankIdSelect = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		this.resetBankCurrentOptions(rowTransferMediumData)
		this.getAccountDataByRow(rowTransferMediumData)
	}

	resetBankCurrentOptions = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		rowTransferMediumData.cuentaId = null
		rowTransferMediumData.montoTransferir = null
		rowTransferMediumData.accountBelongingBankDataSelect = []
		this.calculateTotalList.emit()
	}

	onChangeCashIdSelect = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		this.resetCashCurrentOptions(rowTransferMediumData)
	}

	resetCashCurrentOptions = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		rowTransferMediumData.montoTransferir = null
		this.calculateTotalList.emit()
	}

	onChangeAccountIdSelect = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		this.resetAccountCurrentOptions(rowTransferMediumData)
	}

	resetAccountCurrentOptions = (
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		rowTransferMediumData.montoTransferir = null
		this.calculateTotalList.emit()
	}

	onInputTransferAmount = (
		event: Event = null,
		rowTransferMediumData: ResponseDataStandard = null
	): void => {
		if (rowTransferMediumData.medioTransferenciaId) {
			const convertedValue: string = this.utilityService.onlyNumbers(
				null,
				event
			)
			rowTransferMediumData.montoTransferir = convertedValue
			this.calculateTotalList.emit()
		}
	}

	onKeyPressTransferAmount = (event: KeyboardEvent): void => {
		const allowedKeys: string[] = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'Backspace',
			'Delete',
			'ArrowLeft',
			'ArrowRight',
			'Home',
			'End',
			'.',
		]
		if (!allowedKeys.includes(event.key)) {
			event.preventDefault()
		}
	}

	removeTransferMediumItem = (index: number = null): void => {
		this.removeItemList.emit(index)
	}
}
