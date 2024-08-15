import { Component, Input} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PagosService } from 'src/app/core/services/tesoreria/pagos.service';
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface';
import { PaymentSelectionService } from 'src/app/tesorery/services/tesoreria/financial-transaction/payment-selection.service';
@Component({
  selector: 'list-compras-proveedor',
  templateUrl: './list-compras-proveedor.component.html',
  styleUrls: ['./list-compras-proveedor.component.scss']
})
export class ListComprasProveedorComponent {

  comprasProveedor: any[]=[];
  nombreProveedor: string="";
  totalCoutas: number = 0;
  @Input() formPadre: UntypedFormGroup;

  protected selectedPaymentList: ResponseDataStandard[] = []

  constructor(
    public pagoService: PagosService,
    private paymentSelectionService: PaymentSelectionService,
    private formBuilder: UntypedFormBuilder,

  ){}

  ngOnInit(){
    let idProveedor = '5fcb696e-6a4c-41dc-91fe-dd4240d7ef99';
    this.getComprasPorProveedor(idProveedor);
    this.setPlanPagos();
  }

  get formPagos(): UntypedFormArray {
    return this.formPadre.get('planPagos') as UntypedFormArray;
  }

  setPlanPagos(){
    this.formPagos.push(
      this.formBuilder.group({
        planPagoId:'',
        montoPagado: [0, [Validators.required]]
      })
    );
  }


  getComprasPorProveedor(idProveedor){
    this.pagoService.comprasPorProveedor(idProveedor).subscribe(
      data=>{
        console.log(data);
        this.comprasProveedor=data['data'];
      }
    );
  }

  getElementPaymentList = (paymentId: string): ResponseDataStandard => {
		return this.selectedPaymentList.find(
			paymentData => paymentData.id === paymentId
		)
	}
  onClickToggleMoreInfo = (paymentData: ResponseDataStandard): void => {
		const foundPaymentData: ResponseDataStandard = this.getElementPaymentList(
			paymentData?.id?.toString()
		)
		paymentData.showForm = !paymentData.showForm
	}

  onChangeSelectedCheckbox = (
		payment: ResponseDataStandard,
		event: Event
	): void => {
		const checkboxElement = event?.target as HTMLInputElement
    console.log(payment, checkboxElement)
		payment.selected = checkboxElement.checked

    console.log(payment);


		if (checkboxElement.checked) {
			//
		} else {
			this.paymentSelectionService?.removeSelectedPayment(
				payment?.id?.toString()
			)
			this.removeElementOfPaymentList(payment?.id?.toString())
		}
	}

  removeElementOfPaymentList = (paymentId: string): void => {
		this.selectedPaymentList = this.selectedPaymentList?.filter(
			rowPayData => rowPayData.id !== paymentId
		)
	}


}
