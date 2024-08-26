import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { CentroCostosService } from 'src/app/core/services/tesoreria/centro-costos.service';
import { EmpleadoService } from 'src/app/core/services/tesoreria/empleado.service';
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
  totalAnticipo: number=0;
  listaResponsables:any[]=[];
  listaCentroCostos: any[]=[];
  @Input() fondoRendirData: any;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  public onSubmitFormStatus: boolean = false;

  constructor(
		private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    private empleadoService: EmpleadoService,
		private centroCostoService: CentroCostosService,
		protected utilityService: UtilityService,
		protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
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
			id: '',
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
    console.log(monto);
  }

  confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true;
		if (!this.formPagoReembolso.valid) {
			return
		}
		const dataImg = await this.screenshotService?.takeScreenshot('accountFormModalBodyDiv');
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>{
			if(response)
        this.guardar();
    }
		)
	}


  guardar(){}

}
