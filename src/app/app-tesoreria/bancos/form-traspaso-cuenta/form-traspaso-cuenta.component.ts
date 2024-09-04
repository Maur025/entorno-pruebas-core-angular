import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { BancoService } from 'src/app/core/services/tesoreria/banco.service';
import { CuentaBancoService } from 'src/app/core/services/tesoreria/cuenta-banco.service';
import { MedioTransferenciaService } from 'src/app/core/services/tesoreria/medio-transferencia.service';
import { MonedaService } from 'src/app/core/services/tesoreria/moneda.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { UtilityService } from 'src/app/shared/services/utilityService.service';

@Component({
  selector: 'form-traspaso-cuenta',
  templateUrl: './form-traspaso-cuenta.component.html',
  styleUrls: ['./form-traspaso-cuenta.component.scss']
})
export class FormTraspasoCuentaComponent implements OnInit {

  @Input() datosBanco;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  isStatusSubmit: boolean = false;
  traspasoEntreCuentas: boolean = true;
  submitted: boolean = false;
  formTraspaso: UntypedFormGroup;
  cuentaBancoListDestino: any;
  bancoList: any
  transferMediumDataSelect: any;
  cuentaBancoListOrigen: any;
  medioTransferenciaOrigen:any;
  medioTransferenciaDestino:any;

  constructor(
    public bancoService: BancoService,
    private monedaService: MonedaService,
    private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    private cuentaBancoService: CuentaBancoService,
    protected utilityService: UtilityService,
    protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    private medioTransferenciaService: MedioTransferenciaService
  ) {}

  ngOnInit() {
    this.setFieldForm();
    this.getCuentaBancoListOrigen(this.datosBanco['id']);
    //this.getBancosList();
    this.getTransferMediumData();
  }

  get form() {
    return this.formTraspaso.controls;
  }

  setFieldForm(){
    this.formTraspaso = this.formBuilder.group({
      fecha: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      cuentaBancoIdOrigen: [null, [Validators.required]],
      cuentaBancoIdDestino: [null, [Validators.required]],
      medioTranferenciaIdDestino: [null, [Validators.required]],
      medioTranferenciaIdOrigen: [null, [Validators.required]],
      nroReferenciaOrigen: [null, [Validators.required]],
      nroReferenciaDestino: [null, [Validators.required]],
      montoEgreso:[null, [Validators.required]],
      montoIngreso:[0, [Validators.required]],
    });
  }

  verOpcion(value){
    this.traspasoEntreCuentas = value == "true"?true:false;
    if(!this.traspasoEntreCuentas){
      this.getBancosList();
      this.formTraspaso.controls['cuentaBancoIdDestino'].reset();
    }
  }

  getCuentaBancoListOrigen(idBanco) {
		this.cuentaBancoService.getCuentasBanco(1000, 0, 'nroCuenta', false, '', idBanco)
			.subscribe(data=>{
        this.cuentaBancoListOrigen = data['data'];
      },error => this.notificacionService?.alertError(error));
	}
  getCuentaBancoListSelectBanco(idBanco) {
		this.cuentaBancoService.getCuentasBanco(1000, 0, 'nroCuenta', false, '', idBanco)
			.subscribe(data=>{
        this.cuentaBancoListDestino = data['data'];
      },error => this.notificacionService?.alertError(error));
	}

  getCuentaBancoListDestino(idBanco) {
		this.cuentaBancoService.getCuentasBanco(1000, 0, 'nroCuenta', false, '', idBanco)
			.subscribe(data=>{
        this.cuentaBancoListDestino = data['data'];
        this.cuentaBancoListDestino = this.cuentaBancoListDestino.filter(element=>
          {
            return element['id'] !== this.formTraspaso.controls['cuentaBancoIdOrigen'].value;
          });
      },error => this.notificacionService?.alertError(error));
	}


	getBancosList() {
		this.bancoService.habilitados().subscribe(
			(response: ApiResponseStandard) => {
				this.bancoList = this.responseHandlerService?.handleResponseAsArray(response);
        this.bancoList = this.bancoList.filter(element=>
          {
            return element['id'] !== this.datosBanco['id'];
          });
			},
			(error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error)
		)
	}

  selectCajaBancoList(event){
    this.getCuentaBancoListSelectBanco(event['id']);
  }

  montoTraspasar(){
    this.formTraspaso.controls['montoIngreso'].setValue(this.formTraspaso.controls['montoEgreso'].value) ;
  }

  getTransferMediumData = (): void => {
		this.medioTransferenciaService?.habilitados()?.subscribe(
			(response: ApiResponseStandard) => {
				this.medioTransferenciaDestino =	this.responseHandlerService?.handleResponseAsArray(response);
        this.medioTransferenciaOrigen = this.responseHandlerService?.handleResponseAsArray(response);
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			}
		)
	}

  selectCuenta(event,traspasoEntreCuentas ){
    if(traspasoEntreCuentas){
      this.getCuentaBancoListDestino(this.datosBanco['id']);
    }
  }
  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formTraspaso.valid) {
      this.isStatusSubmit = false;
      return;
    }
    const dataImg = await this.screenshotService?.takeScreenshot(
      "accountFormModalBodyDiv"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) this.guardarTraspaso();
      this.isStatusSubmit = false;
    });
  };

  guardarTraspaso(){

  }
}
