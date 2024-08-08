import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { MedioTransferenciaService } from '../../services/tesoreria/medio-transferencia.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { BancoService } from '../../services/tesoreria/banco.service';
import { CuentaBancoService } from '../../services/tesoreria/cuenta-banco.service';
import { CajaService } from '../../services/tesoreria/caja.service';
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';

@Component({
  selector: 'transacciones-array',
  templateUrl: './transacciones-array.component.html',
  styleUrls: ['./transacciones-array.component.scss']
})
export class TransaccionesArrayComponent {

  @Input() formPadre: UntypedFormGroup;
  @Input() bancoCajaId: any;
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
        monto:'',
        nroReferencia: '',
        medioTrasferenciaId: '',
        cajaCuentaBancoId:'',
        destino:this.tipoOperacion[0]['name'],
      })
    );

  };

  eliminarTransaccion(i){
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
          this.formData().at(indice).get('medioTrasferenciaId').patchValue(transfer['id']);
          this.formData().at(indice).get('medioTrasferenciaId').disable();
          this.getCajas();
        }else if(this.destino == "BANCO"){

          if(thBanco)thBanco.style.display = 'block';
          this.formData().at(indice).get('medioTrasferenciaId').reset();
          this.formData().at(indice).get('medioTrasferenciaId').enable();
          this,this.getBancosList();
        }

			},
			(error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			}
		)
  }

  selectCaja(event,i){
    if(!this.formDataValue.at(i).value.medioTrasferenciaId){
      this.formDataValue.at(i).value.medioTrasferenciaId=this.formDataValue.at(i).getRawValue().medioTrasferenciaId;
    }
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
      1,
      'nroCuenta',
      false,
      '',
     idBanco
    ).subscribe((response: ApiResponseStandard) => {
        this.cuentaBancoList = response?.content || [];
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
