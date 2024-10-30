import { Component, EventEmitter, Input, Output} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PagosService } from 'src/app/core/services/tesoreria/pagos.service';
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
@Component({
  selector: 'list-compras-proveedor',
  templateUrl: './list-compras-proveedor.component.html',
  styleUrls: ['./list-compras-proveedor.component.scss']
})
export class ListComprasProveedorComponent {

  nombreProveedor: string="";
  totalCoutas: number = 0;
  @Input() formPadre: UntypedFormGroup;
  @Input() dataProveedor : any;
  @Input() comprasProveedor : any;
  @Output() alSumarPagos: EventEmitter<any> = new EventEmitter();
  @Input() submitted;

  protected selectedPaymentList: ResponseDataStandard[] = []

  constructor(
    public pagoService: PagosService,
    private formBuilder: UntypedFormBuilder,
    protected utilityService: UtilityService,
  ){}

  get formPagos(): UntypedFormArray {
    return this.formPadre.get('planPagos') as UntypedFormArray;
  }

  setPlanPagos(planPago){
    this.formPagos.push(
      this.formBuilder.group({
        planPagoId:[planPago['id'], [Validators.required]],
        montoPagado: ['', [Validators.required]]
      })
    );
  }

  onClickToggleMoreInfo= (paymentData): void => {
    paymentData.showForm = !paymentData.showForm;
  }

  selectPago(estado, i, pago, compra){

    if(estado){
      compra['checked']=true;
      let nombreCouta = document.getElementById("nameCouta"+i).textContent;
      this.setPlanPagos(pago);
      this.dataPago(pago, compra, nombreCouta);
    }else{
      this.eliminarPago(pago)
    }
  }

  eliminarPago(pago){
    this.formPagos['value'].forEach((element, indice) => {
      if(element['planPagoId'] == pago['id']){
        this.formPagos.removeAt(indice);
      }
    });

    this.calcularTotalPagar();
  }

    dataPago(pago, compra, nombreCouta){
      let monto =nombreCouta + " : " + pago['saldoPagar'];
      let compraData = compra['tipo'] + ":" + compra['nroFacturaRecibo'];
      this.formPagos['value'].forEach((element, indice) => {
        if(element['planPagoId'] == pago['id']){
          setTimeout(() => {
            document.getElementById("compra_"+indice).textContent = compraData;
            document.getElementById("couta_"+indice).textContent = monto;
          }, 50);

        }
      });
    }

    calcularTotalPagar(){
      this.totalCoutas = 0;
      this.formPagos['value'].forEach((element, indice)=>{
        this.totalCoutas += element['montoPagado'];
      })

      this.alSumarPagos.emit(this.totalCoutas);
    }


  getElementPaymentList = (paymentId: string): ResponseDataStandard => {
		return this.selectedPaymentList.find(
			paymentData => paymentData.id === paymentId
		)
	}
  onChangeSelectedCheckbox = (
		payment: ResponseDataStandard,
		event: Event
	): void => {
		const checkboxElement = event?.target as HTMLInputElement;
    payment.selected = checkboxElement.checked;

		if (checkboxElement.checked) {
			payment['planPagos'].forEach((element, indice) => {
        element['checked'] = true;
        let nombreCouta = "Couta "+indice+1;
        this.setPlanPagos(element);
        this.dataPago(element, payment, nombreCouta);
      });
		} else {
			payment['planPagos'].forEach((element, indice) => {
        this.eliminarPago(element);
        element['checked'] = false;
      });


		}
	}
}
