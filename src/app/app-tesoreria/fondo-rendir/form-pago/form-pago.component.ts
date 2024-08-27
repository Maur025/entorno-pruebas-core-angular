import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { FondoRendirService } from 'src/app/core/services/tesoreria/fondo-rendir.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';

@Component({
  selector: 'form-pago',
  templateUrl: './form-pago.component.html',
  styleUrls: ['./form-pago.component.scss']
})
export class FormPagoComponent {
  formPagoReembolso: UntypedFormGroup;
  submitted:boolean=false;
  montoReembolsoSelect: number=0;
  listaResponsables:any[]=[];
  listaCentroCostos: any[]=[];
  @Input() fondoRendirData: any;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  public onSubmitFormStatus: boolean = false;

  constructor(
		private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
		protected utilityService: UtilityService,
		protected screenshotService: ScreenshotService,
    public fondoRendirService: FondoRendirService,
	) {}

  ngOnInit(){
    this.setForm();
  }
  get form() {
    return this.formPagoReembolso.controls;
  }

  setForm(){
    this.formPagoReembolso = this.formBuilder. group({
			id:[],
      fecha:['', [Validators.required]],
      fondoRendirId:['', [Validators.required]],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      montoReembolso:[0, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ]],
      transacciones: this.formBuilder.array([]),
    });
  }

  alAperturar(){
    this.cerrarModal.emit()
  }
  recibirMontoPago(monto){
    this.formPagoReembolso.controls['montoReembolso'].setValue(monto);
  }

  recibirMontoReembolsar(reembolsar){
    this.formPagoReembolso.controls['fondoRendirId'].setValue(reembolsar['fondoRendirId']);
    this.montoReembolsoSelect=reembolsar['montoPagar'];
  }

  confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true;
    let verificar = this.verificarMontos();
    console.log(!this.formPagoReembolso.valid || verificar == false);
    console.log(this.formPagoReembolso.valid , verificar );
    console.log(this.formPagoReembolso.value);
		if (!this.formPagoReembolso.valid || verificar == false) {
			return
		}
		const dataImg = await this.screenshotService?.takeScreenshot('accountFormModalBodyDiv');
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>{
			if(response)
        this.guardar();
    }
		)
	}

  verificarMontos() {
    const totalsCero =
     Number( this.montoReembolsoSelect) === 0 &&
      this.formPagoReembolso.controls["montoReembolso"].value == 0;
    if (totalsCero) {
      this.notificacionService.warningMessage(
        "No ha seleccionado ningun reeembolso pendiente y el monto total de reembolso es 0.");
      return false;
    }

    if( this.formPagoReembolso.controls["montoReembolso"].value!==Number(this.montoReembolsoSelect)){
      this.notificacionService.warningMessage(
        "El monto total de reembolso en monto ingresado para el fondo a rendir a reembolsar deben coincidir");
      return false;
    }
    return true;
  }

  guardar(){
    this.formPagoReembolso.value['fechaPagoReembolso']= this.formPagoReembolso.value['fecha'];
    this.formPagoReembolso.value['movimientos']= this.formPagoReembolso.value['transacciones'];

    this.fondoRendirService.pagoReembolso(this.formPagoReembolso.value).subscribe(data=>{
     this.alActualizar.emit(data);
        this.notificacionService.successStandar();
      }, error=>this.notificacionService.alertError(error));
  }
}
