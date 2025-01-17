import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { BancoService } from 'src/app/core/services/tesoreria/banco.service';
import { CentroCostosService } from 'src/app/core/services/tesoreria/centro-costos.service';
import { CuentaBancoService } from 'src/app/core/services/tesoreria/cuenta-banco.service';
import { MedioTransferenciaService } from 'src/app/core/services/tesoreria/medio-transferencia.service';
import { MonedaService } from 'src/app/core/services/tesoreria/moneda.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { tap, catchError } from 'rxjs/operators';
import { ArchivosService } from 'src/app/core/services/archivos.service'
import { of } from 'rxjs';

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
  listaCentroCostos: any[] = [];

  constructor(
    public bancoService: BancoService,
    private monedaService: MonedaService,
    private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    private cuentaBancoService: CuentaBancoService,
    protected utilityService: UtilityService,
    protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    private medioTransferenciaService: MedioTransferenciaService,
    private centroCostosService:CentroCostosService,
		public archivosService: ArchivosService
  ) {}

  ngOnInit() {
    this.setFieldForm();
    this.getCuentaBancoListOrigen(this.datosBanco['id']);
    this.getTransferMediumData();
    this.getCentroCostos();
  }

  get form() {
    return this.formTraspaso.controls;
  }

  setFieldForm(){
    this.formTraspaso = this.formBuilder.group({
      fecha: [null, [Validators.required]],
      descripcionTranferencia: [null, [Validators.required]],
      cuentaBancoIdOrigen: [null, [Validators.required]],
      cuentaBancoIdDestino: [null, [Validators.required]],
      medioTranferenciaIdDestino: [null, [Validators.required]],
      medioTranferenciaIdOrigen: [null, [Validators.required]],
      nroReferenciaOrigen: [null, [Validators.required]],
      nroReferenciaDestino: [null, [Validators.required]],
      montoEgreso:[null, [Validators.required]],
      montoIngreso:[0, [Validators.required]],
      centroCostoId: [null, [Validators.required]]
    });
  }

  verOpcion(value){
    this.traspasoEntreCuentas = value == "true"?true:false;
    if(!this.traspasoEntreCuentas){
      this.getBancosList();
      this.formTraspaso.controls['cuentaBancoIdDestino'].reset();
    }
  }
  getCentroCostos() {
    this.centroCostosService.habilitados().subscribe({
      next: (response: ApiResponseStandard) => {
        this.listaCentroCostos =
          this.responseHandlerService?.handleResponseAsArray(response);
      },
      error: (error: ErrorResponseStandard) =>
        this.notificacionService.alertError(error),
    });
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

        let dataTransfer = this.responseHandlerService?.handleResponseAsArray(response);

        dataTransfer = dataTransfer.filter(element=>{
          return element['destino'] !== "CAJA"
        });

/* 				this.medioTransferenciaDestino =	this.responseHandlerService?.handleResponseAsArray(response);
        this.medioTransferenciaOrigen = this.responseHandlerService?.handleResponseAsArray(response); */
        this.medioTransferenciaDestino =	dataTransfer;
        this.medioTransferenciaOrigen = dataTransfer;
			},
			(error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			}
		)
	}

  selectCuenta(event,traspasoEntreCuentas ){
    if(traspasoEntreCuentas){
      this.getCuentaBancoListDestino(this.datosBanco['id']);
      this.formTraspaso.controls['cuentaBancoIdDestino'].reset();
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
    let body = {
      fechaTransferencia: this.formTraspaso.value["fecha"],
      descripcionTranferencia: this.formTraspaso.value["descripcionTranferencia"],
      montoTotal: this.formTraspaso.value["montoEgreso"],
      centroCostoId: this.formTraspaso.value["centroCostoId"],
      movimientoIngreso: {
        monto: this.formTraspaso.value["montoIngreso"],
        nroReferencia: this.formTraspaso.value["nroReferenciaDestino"],
        medioTransferenciaId: this.formTraspaso.value["medioTranferenciaIdDestino"],
        cajaCuentaBancoId: this.formTraspaso.value["cuentaBancoIdDestino"],
        destino: "BANCO"
      },
      movimientoEgreso: {
        monto: this.formTraspaso.value["montoEgreso"],
        nroReferencia: this.formTraspaso.value["nroReferenciaOrigen"],
        medioTransferenciaId: this.formTraspaso.value["medioTranferenciaIdOrigen"],
        cajaCuentaBancoId: this.formTraspaso.value["cuentaBancoIdOrigen"],
        destino: "BANCO"
      }
    }

    this.cuentaBancoService.registerTransferencia(
      this.formTraspaso.value["cuentaBancoIdOrigen"],
      this.formTraspaso.value["cuentaBancoIdDestino"],
      body).subscribe(
      (data) => {
        this.alActualizar.emit(data);
        this.notificacionService.successStandar();
        this.isStatusSubmit = false;
        this.descargarComprobante(data['data']['id']);
      },
      (error) => this.notificacionService.alertError(error)
    );

    this.submitted = true;
  }

  descargarComprobante(id) {
    this.cuentaBancoService.generarComprobante(id).pipe(
      tap((data) => {
        this.archivosService.generar64aPDF(data['data'].content, 'comprobante_transferencia.pdf');
      }),
      catchError((error) => {
        this.notificacionService.alertError(error);
        return of(null);
      })
    ).subscribe();
	}
}
