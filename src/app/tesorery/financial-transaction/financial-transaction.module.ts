import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FinancialTransactionRoutingModule } from './financial-transaction-routing.module'
import { MakePaymentComponent } from './make-payment/make-payment.component'
import { CollectPaymentComponent } from './collect-payment/collect-payment.component'
import { PendingPaymentsBeneficiariesListComponent } from './make-payment/pending-payments-beneficiaries-list/pending-payments-beneficiaries-list.component'
import { PendingCollectionsDebtorsListComponent } from './collect-payment/pending-collections-debtors-list/pending-collections-debtors-list.component'
import { UIModule } from '../../shared/ui/ui.module'
import { HerramientasModule } from '../../core/herramientas/herramientas.module'
import { PendingPaymentsBeneficiaryDetailComponentList } from './make-payment/pending-payments-beneficiary-detail-list/pending-payments-beneficiary-detail.component-list'
import { PaymentFormComponent } from './payment-form/payment-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { ComponentesGeneralModule } from '../componentes-general/componentes-general.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UiSwitchModule } from 'ngx-ui-switch'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@NgModule({
	declarations: [
		MakePaymentComponent,
		CollectPaymentComponent,
		PendingPaymentsBeneficiariesListComponent,
		PendingCollectionsDebtorsListComponent,
		PendingPaymentsBeneficiaryDetailComponentList,
		PaymentFormComponent,
	],
	imports: [
		CommonModule,
		FinancialTransactionRoutingModule,
		UIModule,
		HerramientasModule,
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		ComponentesGeneralModule,
		NgbModule,
		UiSwitchModule,
		BsDatepickerModule.forRoot(),
	],
})
export class FinancialTransactionModule {}
