import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { BancoService } from 'src/app/core/services/tesoreria/banco.service';
import { CuentaBancoService } from 'src/app/core/services/tesoreria/cuenta-banco.service';
import { MonedaService } from 'src/app/core/services/tesoreria/moneda.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface';
import { UtilityService } from 'src/app/shared/services/utilityService.service';

@Component({
  selector: 'cuenta-banco-form',
  templateUrl: './cuenta-banco-form.component.html',
  styleUrls: ['./cuenta-banco-form.component.scss']
})
export class CuentaBancoFormComponent {
  @Input() idBanco: string;
  @Input() nombreBanco: string;
  @Input() datosBanco: any;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();

  formCuentaBanco: UntypedFormGroup;
  public submitted: boolean = false
  public onSubmitFormStatus: boolean = false;
  public listaMonedas: ResponseDataStandard[] = [];
  labelTipoApertura: string = 'Apertura de cuenta de banco con saldo inicial';
  valueInicializacion: boolean = true;
  totalTransferencia=0;
  fechaActual2;
  fechaActual;

  public transferMediumList: ResponseDataStandard[] = []

	constructor(
		public BancoService: BancoService,
    private monedaService: MonedaService,
		private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
		private cuentaBancoService: CuentaBancoService,
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
      inicializacion: [true],
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

  onChangeSwitchTransferType = (event): void => {
    this.valueInicializacion = event;
    if(event){
      this.labelTipoApertura = "Apertura de cuenta de banco con saldo inicial";
    }else{
      this.labelTipoApertura = "Apertura de cuenta de banco con Transferencia de cuenta(s) existente(s)";
      this.formCuentaBanco['addControl']('transacciones', this.formBuilder.array([]));
    }
	}

  recibirMontoTotal(monto){
    this.totalTransferencia = monto;
    this.formCuentaBanco.get('montoCuenta').setValue(monto);
   }

  confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true;
		if (!this.formCuentaBanco.valid) {
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
      this.cuentaBancoService.register(this.formCuentaBanco.value).subscribe(data=>{
        this.alActualizar.emit(data);
        this.notificacionService.successStandar();
      }, error=>this.notificacionService.alertError(error));
    }
    this.submitted = true;
  }
}
