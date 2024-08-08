import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ScreenshotService } from '../../services/tesoreria/screenshot.service';
import { CajaService } from '../../services/tesoreria/caja.service';
import { CentrocostoService } from '../../services/tesoreria/centrocosto.service';
import { FondoCajaService } from '../../services/tesoreria/fondo-caja.service';
import { MovimientoCajaService } from '../../services/tesoreria/movimiento-caja.service';
import { EstadosService } from '../../services/tesoreria/estados.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { EmpleadoService } from '../../services/tesoreria/empleado.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'accion-caja',
  templateUrl: './accion-caja.component.html',
  styleUrls: ['./accion-caja.component.scss']
})
export class AccionCajaComponent {

  @Input() datosCaja: any;
	@Output() alActualizar = new EventEmitter<void>()
  labelOperacion: string = "";
  modalRef?: BsModalRef;
  formAccionCaja: UntypedFormGroup;
  submitted: boolean=false;
  totalApertura: number=0;

  constructor(
		private movimientoCajaService: MovimientoCajaService,
		private formBuilder: UntypedFormBuilder,
		private notificacionService: NotificacionService
	) {}

  ngOnInit(){
    if(this.datosCaja){
      this.labelOperacion = this.datosCaja['aperturado'] ? "Apertura de Caja" : "Cierre de Caja";
    }

    this.setForm();
  }
  fechaActual2;
  fechaActual;
  setForm(){
    let fechaActual = new Date();
    this.fechaActual = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ":" + fechaActual.getMinutes().toString().padStart(2, '0');
    this.fechaActual2 = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaActual.getDate().toString().padStart(2, '0') +'T'+fechaActual.getHours().toString().padStart(2, '0') + ":" + fechaActual.getMinutes().toString().padStart(2, '0')+":"+fechaActual.getSeconds().toString().padStart(2, '0');
    this.formAccionCaja = this.formBuilder.group({
      id: '',
      cajaId:[this.datosCaja['id'],[ Validators.required]],
      montoApertura:['',Validators.required],
      fechaApertura:[this.fechaActual2,Validators.required],
      descripcionApertura:['', Validators.required],
      transacciones: this.formBuilder.array([])
    });
  }
  get form() {return this.formAccionCaja.controls}


  recibirMontoTotal(monto){
   this.totalApertura = monto;
   this.formAccionCaja.get('montoApertura').setValue(monto);
  }

  guardarForm(){

    this.formAccionCaja.value['movimientoCajas']= this.formAccionCaja.value['transacciones'];
    this.movimientoCajaService.registerApertura(this.formAccionCaja.value).subscribe(data=>{
        this.alActualizar.emit(data);
          this.notificacionService.successStandar();
    }, error=>this.notificacionService.alertError(error));
  }

}
