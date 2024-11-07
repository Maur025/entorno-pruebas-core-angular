import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TablaNewComponent } from 'src/app/shared/ui/tabla-new/tabla-new.component';
import { FuncionesComponent } from '../../funciones.component';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { DevengadoVentaService } from 'src/app/core/services/tesoreria/devengado-venta.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit{
  titulo = "Ventas Devengadas Cliente"
  tituloLista = "Lista de ventas devengados"
  @ViewChild('tabla') tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  idDevengadoVenta: string|number;
  submitted: boolean = false;
  dataDevengadoVenta: any;

  constructor(
    private modalService: BsModalService,
    protected utilityService: UtilityService,
    public devengadoVentaService: DevengadoVentaService
    ){super()}

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: this.titulo },
			{ label: this.tituloLista, active: true },
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
        //"acciones": this.getOpcionesCabecera('Acciones', 12,'text', true, false),
        "centroCosto": this.getOpcionesCabecera('Centro de Costos', 12),
        "fechaDevengado": this.getOpcionesCabecera('Fecha devengado', 12, 'text-end'),
        "cliente": this.getOpcionesCabecera('Cliente', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "nroDevengado": this.getOpcionesCabecera('Nº Devengado', 12),
        //"estado":this.getOpcionesCabecera('Estado', 12),
      }
    };
  }


}
