import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MakePaymentComponent } from './make-payment/make-payment.component'
import { PendingPaymentsBeneficiariesListComponent } from './make-payment/pending-payments-beneficiaries-list/pending-payments-beneficiaries-list.component'
import { CollectPaymentComponent } from './collect-payment/collect-payment.component'
import { PendingCollectionsDebtorsListComponent } from './collect-payment/pending-collections-debtors-list/pending-collections-debtors-list.component'
import { PendingPaymentsBeneficiaryDetailComponentList } from './make-payment/pending-payments-beneficiary-detail-list/pending-payments-beneficiary-detail.component-list'

const routes: Routes = [
	{
		path: 'efectuar_pago',
		component: MakePaymentComponent,
		children: [
			{
				path: '',
				component: PendingPaymentsBeneficiariesListComponent,
			},
			{
				path: 'detalle_beneficiario/:id',
				component: PendingPaymentsBeneficiaryDetailComponentList,
			},
		],
	},
	{
		path: 'efectuar_cobro',
		component: CollectPaymentComponent,
		children: [
			{
				path: '',
				component: PendingCollectionsDebtorsListComponent,
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FinancialTransactionRoutingModule {}
