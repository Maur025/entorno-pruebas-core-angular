import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class PaymentSelectionService {
	private selectedPayments = new Set<string>()

	constructor() {}

	addSelectedPayment = (paymentId: string): void => {
		this.selectedPayments?.add(paymentId)
	}

	removeSelectedPayment = (paymentId: string): void => {
		this.selectedPayments?.delete(paymentId)
	}

	getSelectedPayments = (): Set<string> => {
		return this.selectedPayments
	}

	isSelected = (paymentId: string): boolean => {
		return this.selectedPayments?.has(paymentId)
	}
}
