import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { CentroCostosService } from 'src/app/core/services/tesoreria/centro-costos.service';
import { FondoOperativoService } from 'src/app/core/services/tesoreria/fondo-operativo.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { UtilityService } from 'src/app/shared/services/utilityService.service';

@Component({
  selector: 'apertura-form',
  templateUrl: './apertura-form.component.html',
  styleUrls: ['./apertura-form.component.scss']
})
export class AperturaFormComponent {

  @Input() datosFondo;
  @Input() operacion;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();

  submitted: boolean = false;
  formAperturaFondo: UntypedFormGroup;
  listaCentroCostos: any[]=[];
  public onSubmitFormStatus: boolean = false;

  labelOperacion:string = "";
  labelFecha:string = "";
  labelTransferencias:string = "";
  labelMonto:string = "";
  labelPlaceholder = "";
  montoPendienteReponer = 0;
  montoTotalDeReposicion = 0;

  constructor(
		private formBuilder: UntypedFormBuilder,
		private notificacionService: NotificacionService,
    private screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    private centroCostoService: CentroCostosService,
    private fondoOperativoService: FondoOperativoService,
    protected utilityService: UtilityService,
	) {}

  ngOnInit(){
    this.variablesOperacion();
    this.setForm();
    this.getCentroCostos();
  }

  setForm(){
    this.formAperturaFondo = this.formBuilder.group({
      id: '',
      fondoOperativoId:[this.datosFondo['id'],[ Validators.required]],
      monto:[0, [Validators.required]],
      fecha:['',Validators.required],
      centroCostoId:['', [Validators.required]],
      nroReferencia:[''],
      descripcion:['', [Validators.required,Validators.minLength(8),Validators.maxLength(255)]],
      transacciones: this.formBuilder.array([])
    });
  }

  get form() {return this.formAperturaFondo.controls}

  getCentroCostos = () => {
		this.centroCostoService.habilitados().subscribe({
			next: (response: ApiResponseStandard) =>
				(this.listaCentroCostos =
					this.responseHandlerService?.handleResponseAsArray(response)),
			error: (error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error),
		})
	}

  recibirMontoTotal(monto){
    this.montoTotalDeReposicion = monto;
  }

  confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true;
    let verificacion = this.operacion == "REPO" ? this.verificarMontos() : true;
		if (!this.formAperturaFondo.valid || verificacion==false) {
			return
		}
		const dataImg = await this.screenshotService?.takeScreenshot('accountFormModalBodyDiv');
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>{
			if(response) this.guardar();
      }
		);
	}

  verificarMontos() {
    const totalsCero = this.montoTotalDeReposicion == 0;
    if (totalsCero) {
      this.notificacionService.warningMessage(
        "El monto total de reposición no debe ser 0"
      );
      return false;
    }

    if (
      this.montoPendienteReponer !== this.montoTotalDeReposicion
    ) {
      this.notificacionService.warningMessage(
        "El monto total de reposición no debe ser diferente al Pendiente a reposición "
      );
      return false;
    }
    return true;
  }

 separarTransacciones(transacciones: any[]){
  let movimientoCajas: any[] = [];
  let movimientoCuentaBancos: any[] = [];

  transacciones.forEach(element => {
    if (element.destino === 'CAJA') {
      movimientoCajas.push(element);
    } else if (element.destino === 'BANCO') {
      movimientoCuentaBancos.push(element);
    }
  });
  return {
    movimientoCajas,
    movimientoCuentaBancos
  };
}

variablesOperacion(){
  switch(this.operacion){
    case "APER":
      this.labelOperacion = "Apertura de Fondo Operativo";
      this.labelFecha="(*)Fecha Apertura";
      this.labelTransferencias="la apertura de fondo";
      this.labelMonto="Monto total de apertura";
      this.labelPlaceholder ="Descripción para la apertura de fondo"
      break;
    case "REPO":
      this.labelOperacion = "Reposición de Fondo Operativo";
      this.labelFecha="(*)Fecha de Reposición";
      this.labelTransferencias="la reposición";
      this.labelMonto="Monto total de reposición";
      this.labelPlaceholder ="Descripción para la reposición de fondo";
      this.fondoOperativoService.getMontoPorRendir(this.datosFondo['id']).subscribe(data=>{
        this.montoPendienteReponer = data['data']? data['data']['montoPorRendir'] : 0;
      });
      break;
      case "CIE":
        this.labelOperacion = "Cierre de Fondo Operativo";
        this.labelFecha="(*)Fecha Cierre";
        this.labelTransferencias="el cierre de fondo";
        this.labelMonto="Monto total para el cierre";
        this.labelPlaceholder ="Descripción para la cierre de fondo"
        break;
    default:
      console.error("No se encontro la operacion");
  }
}

guardar(){
  switch(this.operacion){
    case "APER":
      this.guardarApertura();
      break;
    case "REPO":
      this.guardarReposicion();
      break;
    case "CIE":
      this.guardarCierre();
      break;
    default:
      console.error("No se encontro la operacion a guardar");
  }
}

guardarApertura(){
  let transacciones = this.formAperturaFondo.value['transacciones'];
  const { movimientoCajas, movimientoCuentaBancos } = this.separarTransacciones(transacciones);
  this.formAperturaFondo.get('monto').setValue(this.montoTotalDeReposicion);
  this.formAperturaFondo.value['movimientoCajas']= movimientoCajas;
  this.formAperturaFondo.value['movimientoCuentaBancos']= movimientoCuentaBancos;

  this.fondoOperativoService.aperturarFondo(this.formAperturaFondo.value).subscribe(data=>{
    this.alActualizar.emit(data);
    this.notificacionService.successStandar();
  }, error=>this.notificacionService.alertError(error));
}

guardarReposicion(){
  let request = {
    fechaReposicion: this.formAperturaFondo.value['fecha'],
    centroCostoId:this.formAperturaFondo.value['centroCostoId'],
    nroReferencia:this.formAperturaFondo.value['nroReferencia'],
    descripcionReposicion: this.formAperturaFondo.value['descripcion'],
    montoTotal: this.montoTotalDeReposicion,
    fondoOperativoId:this.formAperturaFondo.value['fondoOperativoId'],
    movimientos:this.formAperturaFondo.value['transacciones']
  }

  this.fondoOperativoService.reposicionFondo(request).subscribe(data=>{
    this.alActualizar.emit(data);
    this.notificacionService.successStandar();
  }, error=>this.notificacionService.alertError(error));
}

guardarCierre(){
  let request = {
    fechaCierre: this.formAperturaFondo.value['fecha'],
    centroCostoId:this.formAperturaFondo.value['centroCostoId'],
    nroReferencia:this.formAperturaFondo.value['nroReferencia'],
    descripcionCierre: this.formAperturaFondo.value['descripcion'],
    montoTotal: this.montoTotalDeReposicion,
    fondoOperativoId:this.formAperturaFondo.value['fondoOperativoId'],
    movimientos:this.formAperturaFondo.value['transacciones']
  }

  this.fondoOperativoService.cierreFondo(request).subscribe(data=>{
    this.alActualizar.emit(data);
    this.notificacionService.successStandar();
  }, error=>this.notificacionService.alertError(error));
}

}
