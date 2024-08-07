import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { BancoService } from 'src/app/tesorery/services/tesoreria/banco.service';
import { CajaService } from 'src/app/tesorery/services/tesoreria/caja.service';
import { CuentaBancoService } from 'src/app/tesorery/services/tesoreria/cuenta-banco.service';
import { MedioTransferenciaService } from 'src/app/tesorery/services/tesoreria/medio-transferencia.service';

@Component({
  selector: 'cuentas-por-transferencia',
  templateUrl: './cuentas-por-transferencia.component.html',
  styleUrls: ['./cuentas-por-transferencia.component.scss']
})
export class CuentasPorTransferenciaComponent {
  @Input() formCuentaBanco: UntypedFormGroup;
  @ViewChild('tdBanco') tdBanco: ElementRef;
  @ViewChild('thBanco') thBanco: ElementRef;
	public transferMediumDataSelect: ResponseDataStandard[] = []

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

	ngOnInit(): void {

    this.getTransferMediumData();
    this.formDataCuenta().clear();
    this.agregarMedio();
  }

  public formDataCuenta(): UntypedFormArray {
    return this.formCuentaBanco.get('movimientosCuentaBanco') as UntypedFormArray;
  }

  agregarMedio(){
    this.formDataCuenta().push(
      this.fb.group({
        id:'',
        medioTrasferenciaId: '',
        cuentaBancoId:'',
        monto:'',
        fecha:'',
        nroReferencia: '',
        ingresoEgreso:'',
      })
    );
  };
  eliminarItem(i){this.formDataCuenta().removeAt(i)}

  getTransferMediumData = (): void => {
		this.medioTransferenciaService?.habilitados()?.subscribe(
			(response: ApiResponseStandard) => {
        console.log(response);
				this.transferMediumDataSelect = this.responseHandlerService?.handleResponseAsArray(response)
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			}
		)
	}

  labelDestino:string = "";
  destino;
  cajaBancoList;
  cuentasBancList;

  selectTransferMedium(medio){
    this.destino = medio['destino'];
    this.labelDestino = '(*)'+this.destino;
    if(this.destino == 'BANCO'){

      this.bancoService.habilitados().subscribe(
        (response: ApiResponseStandard)=>{
          this.cajaBancoList = this.responseHandlerService?.handleResponseAsArray(response);
        },(error: ErrorResponseStandard)=> this.notificacionService.alertError(error)
      );
    }else if(this.destino == 'CAJA'){
      this.cajaService.habilitados().subscribe(
        (response: ApiResponseStandard)=>{
          this.cajaBancoList = this.responseHandlerService?.handleResponseAsArray(response);
        },(error: ErrorResponseStandard)=> this.notificacionService.alertError(error)
      );
    }
  }

  selectCajaBancoList(event){
    console.log(event, this.destino)

    if(this.destino == "BANCO"){
      this.tdBanco.nativeElement.style.display = 'block';
      this.thBanco.nativeElement.style.display = 'block';
      this.cuentaBancoService
          .getCuentasBanco(
            1000,
            1,
            'nroCuenta',
            false,
            '',
            event.id
          ).subscribe((response: ApiResponseStandard) => {
              this.cuentasBancList = response?.content || [];
            },(error: ErrorResponseStandard) => {
              this.notificacionService?.alertError(error)
            }
          )
        }
  }


}
