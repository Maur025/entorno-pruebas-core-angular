import { Component, Input, OnInit } from '@angular/core'
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface'
import { UtilityService } from 'src/app/shared/services/utilityService.service'

@Component({
	selector: 'app-payment-form',
	templateUrl: './payment-form.component.html',
	styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
	@Input() selectedPaymentListData: ResponseDataStandard[] = []
	@Input() paymentData: ResponseDataStandard = null

	constructor(protected utilityService: UtilityService) {}

	ngOnInit(): void {
		console.log(this.paymentData)
	}
}
