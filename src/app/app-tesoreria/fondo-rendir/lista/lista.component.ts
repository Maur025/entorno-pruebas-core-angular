import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { TablaNewComponent } from 'src/app/shared/ui/tabla-new/tabla-new.component';
import { FuncionesComponent } from '../../funciones.component';
import { FondoRendirService } from 'src/app/core/services/tesoreria/fondo-rendir.service';

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
  dataFondoRendir: any;
  protected onSubmitFormStatus: boolean = false;

  constructor(
    public fondoRendirService: FondoRendirService,
    private modalService: BsModalService,
    private notificacionService: NotificacionService,
    private responseHandlerService: ResponseHandlerService,
    ){super()}

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: "Fondo a rendir" },
			{ label: "Gestión de fondo a rendir", active: true },
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
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "nombre": this.getOpcionesCabecera('Empleado', 12),
        "asignado": this.getOpcionesCabecera('Asignado', 12),
        "rendido":this.getOpcionesCabecera('Rendido', 12),
        "porRendir": this.getOpcionesCabecera('Por Rendir', 12),
        "reembolso":this.getOpcionesCabecera('Reembolso', 12),
        "pagoReembolso": this.getOpcionesCabecera('Pago Reembolso', 12),
        "reembolsar":this.getOpcionesCabecera('Saldo Reembolso', 12),
        "saldoNeto": this.getOpcionesCabecera('Saldo Neto', 12),
      }
    };
  }

  nuevoDesembolso(template){
		this.modalRef = this.modalService.show(template, this.modalConfig)
  }

  pagoReemblosoForm(descargo, template){
    console.log(descargo);
    this.dataFondoRendir = descargo;
    this.modalRef = this.modalService.show(template,this.modalConfig);
  }

  cerrarModal = (): void => {
		this.modalService.hide();
	}
}
