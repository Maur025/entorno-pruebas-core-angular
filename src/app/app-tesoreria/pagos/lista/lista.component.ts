import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { TablaNewComponent } from 'src/app/shared/ui/tabla-new/tabla-new.component';
import { FuncionesComponent } from '../../funciones.component';
import { PagosService } from 'src/app/core/services/tesoreria/pagos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit{
  titulo = "Pagos Proveedor"
  tituloLista = "Lista de pagos"
  @ViewChild("tabla") tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  dataProveedor:any;

  protected onSubmitFormStatus: boolean = false;

  constructor(
    private modalService: BsModalService,
    public pagoService: PagosService,
    private notificacionService: NotificacionService,
    private responseHandlerService: ResponseHandlerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: this.titulo },
			{ label: this.tituloLista, active: true },
		]
    this.formato = this.getCabeceras();
  }

  private modalConfig: {
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    class: string;
  } = {
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-xl modal-scrollable",
  };

  getCabeceras() {
    return {
      cabeceras: {
        acciones: this.getOpcionesCabecera("Acciones", 12, "text", true, false),
        razonSocial: this.getOpcionesCabecera("Razón Social", 12),
        nombreComercial: this.getOpcionesCabecera("Nombre Comercial", 12),
        nroDocumento: this.getOpcionesCabecera("Nº Documento", 12),
        totalCredito: this.getOpcionesCabecera("Credito total", 12),
        totalPago: this.getOpcionesCabecera("Pago Total", 12),
        totalSaldo: this.getOpcionesCabecera("Saldo", 12)
      },
    };
  }

  crearCaja(template) {
    this.router.navigate(['./pago-form/', {}], {
			relativeTo: this.route,
		})
  }

  cerrarModal = (): void => {
    this.modalService.hide();
  };

  verDetalles(fila,template){
    this.dataProveedor = fila;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }
}
