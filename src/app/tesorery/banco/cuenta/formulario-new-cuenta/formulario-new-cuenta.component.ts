import { Component, Input, ViewChild } from '@angular/core';
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
  selector: 'app-formulario-new-cuenta',
  templateUrl: './formulario-new-cuenta.component.html',
  styleUrls: ['./formulario-new-cuenta.component.scss']
})
export class FormularioNewCuentaComponent {

  @Input() idBanco: string;
  @Input() nombreBanco: string;
  @ViewChild(CuentasPorTransferenciaComponent) appCuentaTransferencia: CuentasPorTransferenciaComponent;

  modalRef?: BsModalRef;
  formCuentaBanco: UntypedFormGroup;
  public submitted: boolean = false
  public onSubmitFormStatus: boolean = false;
  public listaMonedas: ResponseDataStandard[] = [];
  labelTipoApertura: string = 'Apertura de cuenta de banco con saldo inicial';
  valueInicializacion: boolean = false;
  totalTransferencia=0;

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
    this.formCuentaBanco = this.formBuilder. group({
			id: '',
			nroCuenta: ['',	[Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
				],
			],
			bancoId: [null, [Validators.required]],
			monedaId: [null, [Validators.required]],
      inicializacion: '', //typeAccountInitialize
      movimientosCuentaBanco: this.formBuilder.array([]),
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
    }else{//saldo inicial
      this.labelTipoApertura = "Apertura de cuenta de banco con saldo inicial";
    }
	}



  onlyNumbersAccount(cuenta, event){}

  cerrarModal() {
		this.modalService.hide()
		this.onSubmitFormStatus = false
	}
}
