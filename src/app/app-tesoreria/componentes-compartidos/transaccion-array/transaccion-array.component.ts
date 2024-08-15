import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { MedioTransferenciaService } from 'src/app/core/services/tesoreria/medio-transferencia.service';
import { BancoService } from 'src/app/core/services/tesoreria/banco.service';
import { CuentaBancoService } from 'src/app/core/services/tesoreria/cuenta-banco.service';
import { CajaService } from 'src/app/core/services/tesoreria/caja.service';

@Component({
  selector: 'transaccion-array',
  templateUrl: './transaccion-array.component.html',
  styleUrls: ['./transaccion-array.component.scss']
})
export class TransaccionArrayComponent {

  @Input() formPadre: UntypedFormGroup;
  @Input() bancoCajaId: any;
  @Input() labelTransferencia: string="";
  @Input() submitted: boolean=false;
  @Output() alIngresarMonto: EventEmitter<any> = new EventEmitter()
  bancoList: any;
  cajaList: any[]=[];
  cuentaBancoList: any;
  destino:string="";
  cajaBancoList: any[]=[];
  cuentasBancList: any[]=[];
  totalMonto: number = 0;

  tipoOperacion: any = [
		{ value: 'BN', name: 'BANCO' },
		{ value: 'CAJ', name: 'CAJA' },
	]

  public transferMediumDataSelect: ResponseDataStandard[] = [];

  constructor(
		private responseHandlerService: ResponseHandlerService,
		public utilityService: UtilityService,
		private medioTransferenciaService: MedioTransferenciaService,
		private notificacionService: NotificacionService,
		private bancoService: BancoService,
		private cuentaBancoService: CuentaBancoService,
		private cajaService: CajaService,
    private fb: UntypedFormBuilder,
	) {}

  ngOnInit(){
    this.formData().clear()
    this.agregarTransaccion();
    if(this.formData.length == 0)this.cambiaOperacion(0,"BANCO")
  }

  public formData(): UntypedFormArray {
    return this.formPadre.get('transacciones') as UntypedFormArray;
  }

  get formDataValue(): UntypedFormArray {
    return this.formPadre.get('transacciones') as UntypedFormArray;
  }

  agregarTransaccion(){
    this.formData().push(
      this.fb.group({
        id:'',
        monto:['', [
            Validators.required,
            Validators.min(1),
            Validators.pattern('^[0-9]+(.[0-9]*)?$')]],
        nroReferencia: ['', [Validators.required]],
        medioTransferenciaId: ['', [Validators.required]],
        cajaCuentaBancoId:['', [Validators.required]],
        destino:[this.tipoOperacion[0]['name'], [Validators.required]],
      })
    );

  };

  eliminarTransferencia(i){
    this.formData().removeAt(i);
    this.calcularTotalTransaccion();
  }

  getTransferMediumData = (): void => {
		this.medioTransferenciaService?.habilitados()?.subscribe(
			(response: ApiResponseStandard) => {
				this.transferMediumDataSelect = this.responseHandlerService?.handleResponseAsArray(response)
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			}
		)
	}

  cambiaOperacion(indice, value){
    this.destino= value['name'] ? value['name'] : value;

    this.medioTransferenciaService?.habilitados()?.subscribe(
			(response: ApiResponseStandard) => {
        this.transferMediumDataSelect = this.responseHandlerService?.handleResponseAsArray(response);

        let id = "thBanco_"+indice;
        var thBanco = document.getElementById(id);
         if(this.destino == "CAJA"){

          if(thBanco)thBanco.style.display = 'none';
          let transfer = this.transferMediumDataSelect.find(tm=>tm['destino']=="CAJA");
          //this.formDataValue.at(indice)['removeControl']('bancoId')

          //this.formData().at(indice).get('medioTransferenciaId').disable();
          this.formData().at(indice).get('medioTransferenciaId').setValue(transfer['id']);
          this.getCajas();
        }else if(this.destino == "BANCO"){
          //this.formDataValue.at(indice)['addControl']('bancoId', this.fb.control('', Validators.required));
          if(thBanco)thBanco.style.display = 'block';
          this.formData().at(indice).get('medioTransferenciaId').reset();
          this.formData().at(indice).get('medioTransferenciaId').enable();
          this,this.getBancosList();
        }
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			}
		)
  }



  selectCaja(event,i){
    /*if(!this.formDataValue.at(i).value.medioTransferenciaId){
      this.formDataValue.at(i).value.medioTransferenciaId=this.formDataValue.at(i).getRawValue().medioTransferenciaId;
    }

    console.log("medioId"+ this.formDataValue.at(i).value.medioTransferenciaId);*/
  }

  getCajas(){
    this.cajaService.habilitados().subscribe(
      (response: ApiResponseStandard)=>{
        this.cajaList = this.responseHandlerService?.handleResponseAsArray(response);
        this.cajaList = this.cajaList.filter(cl=> cl['id'] !== this.bancoCajaId);
      },(error: ErrorResponseStandard)=> this.notificacionService.alertError(error)
    );
  }

  getBancosList(){
    this.bancoService.habilitados().subscribe(
      (response: ApiResponseStandard)=>{
        this.bancoList = this.responseHandlerService?.handleResponseAsArray(response);
        this.bancoList = this.bancoList.filter(bl=> bl['id'] !== this.bancoCajaId);
      },(error: ErrorResponseStandard)=> this.notificacionService.alertError(error)
    );
  }


  getCuentaBancoList(idBanco){
    this.cuentaBancoService.getCuentasBanco(
      1000,
      0,
      'nroCuenta',
      false,
      '',
     idBanco
    ).subscribe((response: ApiResponseStandard) => {
        this.cuentaBancoList = response?.data || [];
      },(error: ErrorResponseStandard) => {
        this.notificacionService?.alertError(error)
      }
    )
  }

  calcularTotalTransaccion(){
    let total = 0;
    let formValue = this.formData().value;
    formValue.forEach(element => {
      total+= element['monto'];
    });
    this.alIngresarMonto.emit(total);
  }

  selectCajaBancoList(e){
    this.getCuentaBancoList(e.id);
  }
}
