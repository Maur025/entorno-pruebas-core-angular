import { Component, ViewChild } from '@angular/core';
import { FuncionesComponent } from '../../funciones.component';
import { TablaNewComponent } from 'src/app/shared/ui/tabla-new/tabla-new.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnticipoProveedorService } from 'src/app/core/services/tesoreria/anticipo-proveedor.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent{
  @ViewChild('tabla') tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  dataProveedor: any;

  protected onSubmitFormStatus: boolean = false;

  constructor(
    private modalService: BsModalService,
    public anticipoProveedorService : AnticipoProveedorService
    ){super()}

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: "Anticipo Proveedor" },
			{ label: "Gestión de anticipo proveedor", active: true },
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

	getCabeceras = () => {
		return {
			cabeceras: {
				acciones: this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
				proveedor: this.getOpcionesCabecera('Proveedor',12,'text',true,true),
				centroCosto: this.getOpcionesCabecera('Centro Costo',12,'text',true,true),
				nroReferencia: this.getOpcionesCabecera('Nro Referencia',12,'text',true,true),
        monto: this.getOpcionesCabecera('Monto Anticipo',12,'text',true,true, 'text-end'),
        saldo: this.getOpcionesCabecera('Saldo',12,'text',true,true, 'text-end'),
			},
		}
	}

  crearAnticipo(template: any){
    this.modalRef = this.modalService.show(template, this.modalConfig)
  }

  realizarDevolucion(template, proveedor){
    this.dataProveedor = proveedor;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  verDetalles(fila, template){
    console.log(fila);
    this.dataProveedor=fila;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }
}
