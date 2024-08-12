import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { BancoService } from '../../../services/tesoreria/banco.service';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface';
import { MonedaService } from '../../../services/tesoreria/monedas.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { CuentaBancoService } from '../../../services/tesoreria/cuenta-banco.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { ScreenshotService } from '../../../services/tesoreria/screenshot.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { CuentasPorTransferenciaComponent } from '../cuentas-por-transferencia/cuentas-por-transferencia.component';

@Component({
  selector: 'formulario-new-cuenta',
  templateUrl: './formulario-new-cuenta.component.html',
  styleUrls: ['./formulario-new-cuenta.component.scss']
})
export class FormularioNewCuentaComponent {

  @Input() idBanco: string;
  @Input() nombreBanco: string;
  @Input() datosBanco: any;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  @ViewChild(CuentasPorTransferenciaComponent) appCuentaTransferencia: CuentasPorTransferenciaComponent;

  modalRef?: BsModalRef;
  formCuentaBanco: UntypedFormGroup;
  public submitted: boolean = false
  public onSubmitFormStatus: boolean = false;
  public listaMonedas: ResponseDataStandard[] = [];
  labelTipoApertura: string = 'Apertura de cuenta de banco con saldo inicial';
  valueInicializacion: boolean = false;
  totalTransferencia=0;
  fechaActual2;
  fechaActual;

  public transferMediumList: ResponseDataStandard[] = []

	constructor(
		public BancoService: BancoService,
		private modalService: BsModalService,
    private monedaService: MonedaService,
		private notificacionService: NotificacionService,
		private route: ActivatedRoute,
		private router: Router,

    private formBuilder: UntypedFormBuilder,
		private cuentaBancoService: CuentaBancoService,
		private bancoService: BancoService,
		protected utilityService: UtilityService,
		protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
	) {}

  ngOnInit(){
    this.getMonedas();
    this.setForm();
  }

  get form() {return this.formCuentaBanco.controls}

  setForm(){
    let fechaActual = new Date();
    this.fechaActual = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaActual.getDate().toString().padStart(2, '0');
    this.fechaActual2 = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaActual.getDate().toString().padStart(2, '0') +'T'+fechaActual.getHours().toString().padStart(2, '0') + ":" + fechaActual.getMinutes().toString().padStart(2, '0')+":"+fechaActual.getSeconds().toString().padStart(2, '0');
    this.formCuentaBanco = this.formBuilder. group({
			id: '',
			nroCuenta: ['',	[
          Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
				],
			],
			bancoId: [this.datosBanco['id'], [Validators.required]],
			monedaId: [null, [Validators.required]],
      inicializacion: [false],
      montoCuenta: ['', [Validators.required]],
      fechaCuenta: [this.fechaActual2, [Validators.required]],
      descripcion:['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ]],
      //transacciones: this.formBuilder.array([]),
		})
  }

  getMonedas = (): void => {
    this.monedaService.habilitados().subscribe({
      next: (response: ApiResponseStandard) => {
        this.listaMonedas =
          this.responseHandlerService?.handleResponseAsArray(response)
      },
      error: (error: ErrorResponseStandard) => {
        this.notificacionService.alertError(error)
      },
    })
  }

  agregarMedio(){
    this.appCuentaTransferencia.agregarMedio();
  }


  onChangeSwitchTransferType = (event): void => {
    this.valueInicializacion = event;
    if(event){//transferencia
      this.labelTipoApertura = "Apertura de cuenta de banco con Transferencia de cuenta(s) existente(s)"; 
      this.formCuentaBanco['addControl']('transacciones', this.formBuilder.array([]));      
    }else{//saldo inicial
      this.labelTipoApertura = "Apertura de cuenta de banco con saldo inicial";
    }
	}

  recibirMontoTotal(monto){
    this.totalTransferencia = monto;
    this.formCuentaBanco.get('montoCuenta').setValue(monto);
   }

  onlyNumbersAccount(cuenta, event){}

  confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true;
    console.log(this.formCuentaBanco.valid);
    console.log(this.formCuentaBanco.value);
		if (!this.formCuentaBanco.valid) {
      console.log("aqui");
			return
		}
		const dataImg = await this.screenshotService?.takeScreenshot('accountFormModalBodyDiv');
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>{
			if(response) this.guardarForm();      
    }
		)
	}

  guardarForm(){
    console.log(this.formCuentaBanco.value);
    if(this.formCuentaBanco.valid){
      this.formCuentaBanco.value['movimientosCuentaBanco']= this.formCuentaBanco.value['transacciones'] ? this.formCuentaBanco.value['transacciones'] :null ;
      //console.log(this.formAccionCaja.value)
      this.cuentaBancoService.crearCuentaBanco(this.formCuentaBanco.value).subscribe(data=>{
          this.alActualizar.emit(data);
            this.notificacionService.successStandar();
      }, error=>this.notificacionService.alertError(error));
    }
    this.submitted = true;
  }
}
