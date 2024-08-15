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
  @ViewChild("tabla") tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;

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
      { label: "Pagos" },
      { label: "Gestión de Pagos", active: true },
    ];
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
        nombre: this.getOpcionesCabecera("Nombre", 12),
        centroCosto: this.getOpcionesCabecera("Centro de Costos", 12),
        empleado: this.getOpcionesCabecera("Responsable", 12)
      },
    };
  }

  crearCaja(template) {
    //this.modalRef = this.modalService.show(template, this.modalConfig);
    this.router.navigate(['./pago-form/', {}], {
			relativeTo: this.route,
		})
  }

  cerrarModal = (): void => {
    this.modalService.hide();
  };
}