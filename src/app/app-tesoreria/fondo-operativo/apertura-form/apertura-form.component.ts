import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { FondoOperativoService } from 'src/app/core/services/tesoreria/fondo-operativo.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { CentrocostoService } from 'src/app/tesorery/services/tesoreria/centrocosto.service';

@Component({
  selector: 'apertura-form',
  templateUrl: './apertura-form.component.html',
  styleUrls: ['./apertura-form.component.scss']
})
export class AperturaFormComponent {

  @Input() datosFondo;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  submitted: boolean = false;
  labelOperacion:string = "";
  formAperturaFondo: UntypedFormGroup;
  listaCentroCostos: any[]=[];
  public onSubmitFormStatus: boolean = false;


  constructor(
		private formBuilder: UntypedFormBuilder,
		private notificacionService: NotificacionService,
    private screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    private centroCostoService: CentrocostoService,
    private fondoOperativoService: FondoOperativoService,
	) {}

  ngOnInit(){
    if(this.datosFondo){
      this.labelOperacion = !this.datosFondo['aperturado'] ? "Apertura de Fondo Operativo" : "Cierre de Fondo Operativo";
    }
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
    this.formAperturaFondo.get('monto').setValue(monto);
  }

  confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true

		if (!this.formAperturaFondo.valid) {
			return
		}
		const dataImg = await this.screenshotService?.takeScreenshot('accountFormModalBodyDiv');
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>{
			if(response) this.guardarForm();
      }
		);
	}

  guardarForm(){
    if(this.formAperturaFondo.valid){
      let transacciones = this.formAperturaFondo.value['transacciones'];
      const { movimientoCajas, movimientoCuentaBancos } = this.separarTransacciones(transacciones);
      this.formAperturaFondo.value['movimientoCajas']= movimientoCajas;
      this.formAperturaFondo.value['movimientoCuentaBancos']= movimientoCuentaBancos;
      console.log(this.formAperturaFondo.value);
       this.fondoOperativoService.aperturarFondo(this.formAperturaFondo.value).subscribe(data=>{
        this.alActualizar.emit(data);
        this.notificacionService.successStandar();
      }, error=>this.notificacionService.alertError(error));
    }
    this.submitted = true;
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

}
