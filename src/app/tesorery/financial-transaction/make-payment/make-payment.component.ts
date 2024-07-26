import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-make-payment',
	templateUrl: './make-payment.component.html',
	styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit {
	public breadcrumbItems: object[] = []

	ngOnInit(): void {
		this.breadcrumbItems = [{ label: 'Efectuar Pago', active: true }]
	}
}
