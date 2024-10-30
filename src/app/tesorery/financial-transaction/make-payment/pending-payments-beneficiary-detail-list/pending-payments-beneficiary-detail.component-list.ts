import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { BsModalService } from 'ngx-bootstrap/modal'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service'
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response'
import {
	FormatListInterface,
	ResponseDataStandard,
} from 'src/app/shared/interface/common-list-interface'
import { UtilityService } from 'src/app/shared/services/utilityService.service'
import { FuncionesComponent } from 'src/app/tesorery/funciones.component'
import { PaymentSelectionService } from 'src/app/tesorery/services/tesoreria/financial-transaction/payment-selection.service'
import { TesoreriaProveedorService } from 'src/app/tesorery/services/tesoreria/tesoreria-proveedor.service'

@Component({
	selector: 'app-pending-payments-beneficiary-detail-list',
	templateUrl: './pending-payments-beneficiary-detail.component-list.html',
	styleUrls: ['./pending-payments-beneficiary-detail.component-list.scss'],
})
export class PendingPaymentsBeneficiaryDetailComponentList
	extends FuncionesComponent
	implements OnInit
{
	protected beneficiaryId: string = null
	protected beneficiaryData: ResponseDataStandard = null

	protected tableTitle: string = 'Lista de Pagos Pendientes'
	protected tableformat: FormatListInterface = null
	protected tableSearchText: string =
		'Ingrese Criterio de Busqueda: N° Factura/Recibo, Fecha.'

	protected titleModal: string = 'Efectuar Pago'

	protected selectedPaymentList: ResponseDataStandard[] = []

	protected paymentForm: FormGroup = null
	protected submitted: boolean = false
	protected payAmount: number = 10

	protected maxDateToUseForm: Date = new Date(
		new Date().setHours(23, 59, 59, 999)
	)

	private modalConfig: {
		ignoreBackdropClick: boolean
		keyboard: boolean
		class: string
	} = {
		ignoreBackdropClick: true,
		keyboard: false,
		class: 'modal-xl modal-scrollable',
	}

	constructor(
		protected tesoreriaProveedorService: TesoreriaProveedorService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private notificacionService: NotificacionService,
		private responseHandlerService: ResponseHandlerService,
		private modalService: BsModalService,
		private paymentSelectionService: PaymentSelectionService,
		private formBuilder: FormBuilder,
		protected utilityService: UtilityService
	) {
		super()
	}

	ngOnInit(): void {
		this.getParamId()
		this.intiForm()
		this.getBeneficiaryData()
		this.tableformat = this.getHeadersList()
	}

	intiForm = (): void => {
		this.paymentForm = this.formBuilder.group({
			proveedorId: [null],
			totalPayAmount: [10],
			descripcion: [null, [Validators.required]],
			fechaPago: [new Date(), [Validators.required]],
			operaciones: this.formBuilder.array([], [Validators.required]),
		})
	}

	getParamId = (): void => {
		if (!this.activatedRoute?.snapshot?.params['id']) {
			return
		}

		this.beneficiaryId = this.activatedRoute?.snapshot?.params['id']
	}

	getBeneficiaryData = (): void => {
		this.tesoreriaProveedorService
			?.getProviderById(this.beneficiaryId)
			?.subscribe({
				next: (response: ApiResponseStandard) => {
					this.beneficiaryData =
						this.responseHandlerService?.handleResponseAsObject(response)
				},
				error: () => {
					this.router?.navigateByUrl('/operacion_financiera/efectuar_pago')
				},
			})
	}

	getHeadersList = () => {
		return {
			cabeceras: {
				seleccion: this.getOpcionesCabecera(
					'Seleccionar',
					12,
					'text',
					true,
					false
				),
				nroFactura: this.getOpcionesCabecera('N° Factura/Recibo', 12),
				tipo: this.getOpcionesCabecera('Tipo', 12),
				fecha: this.getOpcionesCabecera('Fecha', 12),
				montoTotal: this.getOpcionesCabecera('Monto Total', 12),
				saldoPorPagar: this.getOpcionesCabecera('Saldo Pendiente', 12),
			},
		}
	}

	onChangeSelectedCheckbox = (
		payment: ResponseDataStandard,
		event: Event
	): void => {
		const checkboxElement = event?.target as HTMLInputElement
		payment.selected = checkboxElement.checked

		if (checkboxElement.checked) {
			//
		} else {
			this.paymentSelectionService?.removeSelectedPayment(
				payment?.id?.toString()
			)
			this.removeElementOfPaymentList(payment?.id?.toString())
		}
	}

	isSelected = (payment: ResponseDataStandard): boolean => {
		return this.paymentSelectionService.isSelected(payment?.id?.toString())
	}

	onCLickAddPaymentList = (paymentData: ResponseDataStandard): void => {
		this.paymentSelectionService?.addSelectedPayment(
			paymentData?.id?.toString()
		)
		this.selectedPaymentList?.push(paymentData)
		paymentData.showForm = false
	}

	onClickCancelFormPayment = (paymentData: ResponseDataStandard): void => {
		paymentData.showForm = false
		paymentData.selected = false
		paymentData.typeDuesSelect = false
		paymentData.payAmount = null
		this.paymentSelectionService?.removeSelectedPayment(
			paymentData?.id?.toString()
		)
	}

	removeElementOfPaymentList = (paymentId: string): void => {
		this.selectedPaymentList = this.selectedPaymentList?.filter(
			rowPayData => rowPayData.id !== paymentId
		)
	}

	onClickToggleMoreInfo = (paymentData: ResponseDataStandard): void => {
		const foundPaymentData: ResponseDataStandard = this.getElementPaymentList(
			paymentData?.id?.toString()
		)
		paymentData.showForm = !paymentData.showForm
	}

	getElementPaymentList = (paymentId: string): ResponseDataStandard => {
		return this.selectedPaymentList.find(
			paymentData => paymentData.id === paymentId
		)
	}

	refreshDataTable = (): void => {}

	openModal = (template: TemplateRef<void>): void => {
		this.modalService.show(template, this.modalConfig)
	}

	closeModal = (): void => {
		this.modalService?.hide()
	}
}
