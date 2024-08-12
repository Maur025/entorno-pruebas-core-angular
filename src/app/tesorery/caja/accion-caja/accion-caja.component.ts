import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MovimientoCajaService } from '../../services/tesoreria/movimiento-caja.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ScreenshotService } from '../../services/tesoreria/screenshot.service';

@Component({
  selector: 'accion-caja',
  templateUrl: './accion-caja.component.html',
  styleUrls: ['./accion-caja.component.scss']
})
export class AccionCajaComponent {

  @Input() datosCaja: any;
	@Output() alActualizar = new EventEmitter<void>();
  @Output() cerrarModal = new EventEmitter<void>();
  labelOperacion: string = "";
  modalRef?: BsModalRef;
  formAccionCaja: UntypedFormGroup;
  submitted: boolean=false;
  totalApertura: number=0;
  fechaActual2;
  fechaActual;
  protected onSubmitFormStatus: boolean = false;

  constructor(
		private movimientoCajaService: MovimientoCajaService,
		private formBuilder: UntypedFormBuilder,
		private notificacionService: NotificacionService,
    private screenshotService: ScreenshotService,
	) {}

  ngOnInit(){
    if(this.datosCaja){
      this.labelOperacion = !this.datosCaja['aperturado'] ? "Apertura de Caja" : "Cierre de Caja";
    }

    this.setForm();
  }

  setForm(){
    let fechaActual = new Date();
    this.fechaActual = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaActual.getDate().toString().padStart(2, '0');
    this.fechaActual2 = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaActual.getDate().toString().padStart(2, '0') +'T'+fechaActual.getHours().toString().padStart(2, '0') + ":" + fechaActual.getMinutes().toString().padStart(2, '0')+":"+fechaActual.getSeconds().toString().padStart(2, '0');
    this.formAccionCaja = this.formBuilder.group({
      id: '',
      cajaId:[this.datosCaja['id'],[ Validators.required]],
      montoApertura:['', [Validators.required]],
      fechaApertura:[this.fechaActual2,Validators.required],
      descripcionApertura:['', [Validators.required,Validators.minLength(8),Validators.maxLength(255)]],
      transacciones: this.formBuilder.array([])
    });
  }
  get form() {return this.formAccionCaja.controls}


  recibirMontoTotal(monto){
   this.totalApertura = monto;
   this.formAccionCaja.get('montoApertura').setValue(monto);
  }

  guardarForm(){
    //console.log("fuera valid",this.formAccionCaja.value)
    if(this.formAccionCaja.valid){
      this.formAccionCaja.value['movimientoCajas']= this.formAccionCaja.value['transacciones'];
      //console.log(this.formAccionCaja.value)
      this.movimientoCajaService.registerApertura(this.formAccionCaja.value).subscribe(data=>{
          this.alActualizar.emit(data);
            this.notificacionService.successStandar();
      }, error=>this.notificacionService.alertError(error));
    }
    this.submitted = true;
   }

   confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true

		if (!this.formAccionCaja.valid) {
			return
		}
		const dataImg = await this.screenshotService?.takeScreenshot('accountFormModalBodyDiv');
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>{
			if(response) this.guardarForm();      
    }
		)
	}
   
}
