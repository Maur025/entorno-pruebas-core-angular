import { Component, OnInit } from '@angular/core'
import {
	UntypedFormBuilder,
	UntypedFormGroup,
	Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service'
import { ScreenshotService } from 'src/app/core/services/screenshot.service'
import { ClienteService } from 'src/app/core/services/tesoreria/cliente.service'
import { CobroService } from 'src/app/core/services/tesoreria/cobro.service'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/common-api-response'
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface'
import { UtilityService } from 'src/app/shared/services/utilityService.service'

@Component({
	selector: 'app-collection-form',
	templateUrl: './collection-form.component.html',
	styleUrls: ['./collection-form.component.scss'],
})
export class CollectionFormComponent implements OnInit {
	protected breadCrumbItems: object[] = []
	protected collectionForm: UntypedFormGroup = null
	protected submitted: boolean = false
	protected clientDataList: ResponseDataStandard[] = []
	protected clienteSelectLoading: boolean = false
	protected salesPendingCollection: ResponseDataStandard[] = []
	protected currentlyClientData: ResponseDataStandard = { id: null }
	private collectionTotalAmount: number = 0
	protected isSubmitStatus: boolean = false

	constructor(
		private untypedFormBuilder: UntypedFormBuilder,
		protected utilityService: UtilityService,
		private clienteService: ClienteService,
		private notificacionService: NotificacionService,
		private responseHandlerService: ResponseHandlerService,
		private screenshotService: ScreenshotService,
		private cobroService: CobroService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.breadCrumbItems = [
			{ label: 'Cobros' },
			{ label: 'Nuevo Cobro', active: true },
		]
		this.initialiceCollectionForm()
		this.getClientDataList()
	}

	initialiceCollectionForm = (): void => {
		this.collectionForm = this.untypedFormBuilder?.group({
			id: [null],
			fecha: [null, Validators.required],
			clienteId: [null, Validators.required],
			montoCobrado: [null, Validators.required],
			nroReferencia: [null],
			descripcion: [
				null,
				[
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(255),
				],
			],
			planCobros: this.untypedFormBuilder?.array([]),
			transacciones: this.untypedFormBuilder?.array([]),
		})
	}

	getClientDataList = (keyword: string = null): void => {
		this.clienteSelectLoading = true
		this.clienteService?.getAllByKeyword(keyword, false)?.subscribe({
			next: (response: ApiResponseStandard) => {
				this.clientDataList =
					this.responseHandlerService?.handleResponseAsArray(response)
				this.clienteSelectLoading = false
			},
			error: (error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
				this.clienteSelectLoading = false
			},
		})
	}

	searchInClientSelect = (event: { term: string }): void => {
		if (event?.term) {
			if (event?.term?.length > 3) {
				this.getClientDataList(event?.term)
			}
		} else {
			this.getClientDataList()
		}
	}

	onChangeSelectClient = (clientData: ResponseDataStandard): void => {
		this.salesPendingCollection = []
		if (clientData?.id) {
			this.currentlyClientData = clientData
		} else {
			this.currentlyClientData = { id: null }
		}
	}

	getTotalTransactionAmount = (transactionTotal: number): void => {
		this.collectionForm?.patchValue({ montoCobrado: transactionTotal || 0 })
	}

	getCollectionTotalAmount = (collectionTotal: number): void => {
		this.collectionTotalAmount = collectionTotal
	}

	getSalesPendingCollectionList = (
		responseList: ResponseDataStandard[]
	): void => {
		this.salesPendingCollection = responseList
	}

	confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true
		if (!this.collectionForm?.valid) {
			return
		}
		const isError: boolean = this.formValidate()
		if (isError) {
			return
		}

		this.isSubmitStatus = true

		const dataImg = await this.screenshotService?.takeScreenshot(
			'salePendingCollectionForm'
		)
		this.notificacionService?.confirmAndContinueAlert(
			dataImg,
			(response: boolean) => {
				if (!response) {
					this.isSubmitStatus = false
					return
				}
				this.onSubmitForm()
			}
		)
	}

	formValidate = (): boolean => {
		const areGreaterThanZero: boolean =
			this.collectionTotalAmount === 0 &&
			this.collectionForm?.get('montoCobrado')?.value === 0

		if (areGreaterThanZero) {
			this.notificacionService?.warningMessage(
				'El total de cobros y el total de transacciones no deberian ser igual a 0.'
			)
			return true
		}
		if (
			this.collectionTotalAmount !==
			this.collectionForm?.get('montoCobrado')?.value
		) {
			this.notificacionService?.warningMessage(
				'El total de cobros y el total de transacciones no coinciden.'
			)
			return true
		}
		return false
	}

	onSubmitForm = () => {
		const jsonDataSend: object = {
			...this.collectionForm?.value,
			fechaCobro: this.collectionForm?.get('fecha')?.value || null,
			movimientos: this.collectionForm?.get('transacciones')?.value || [],
		}
		this.cobroService?.savePendingCollection(jsonDataSend)?.subscribe({
			next: () => {
				this.notificacionService?.successStandar('Registro exitoso.')
				this.isSubmitStatus = false
				this.router.navigateByUrl('/cobros')
			},
			error: (error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
				this.isSubmitStatus = false
			},
		})
	}
}
