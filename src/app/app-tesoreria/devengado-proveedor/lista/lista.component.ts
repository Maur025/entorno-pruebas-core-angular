import { Component, OnInit, ViewChild } from '@angular/core';
import { FuncionesComponent } from '../../funciones.component';
import { TablaNewComponent } from 'src/app/shared/ui/tabla-new/tabla-new.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { DevengadoService } from 'src/app/core/services/tesoreria/devengado.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit{
  @ViewChild('tabla') tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  idDevengado: string|number;
  submitted: boolean = false;
  dataDevengado: any;

  constructor(
    private modalService: BsModalService,
    protected utilityService: UtilityService,
    public devengadoService: DevengadoService
    ){super()}

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: "Devengados " },
			{ label: "Gestión de devengados", active: true },
		]
    this.formato = this.getCabeceras();
  }

  private modalConfig: {
		ignoreBackdropClick: boolean
		keyboard: boolean
		class: string

	} = {
		ignoreBackdropClick: true,
		keyboard: false,
		class: 'modal-xl modal-scrollable',

	}

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12,'text', true, false),
        "centroCosto": this.getOpcionesCabecera('Centro de Costos', 12),
        "fechaDevengado": this.getOpcionesCabecera('Fecha devengado', 12, 'text-end'),
        "proveedor": this.getOpcionesCabecera('Proveedor', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "tipoDevengado": this.getOpcionesCabecera('Tipo Devengado', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "nroReferencia": this.getOpcionesCabecera('Nº Referencia', 12),
        "estado":this.getOpcionesCabecera('Estado', 12),
      }
    };
  }

  verDetalleDevengado(fila, template){
    this.dataDevengado = fila;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

}
