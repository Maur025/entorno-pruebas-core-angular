import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CreditopagosService } from "../servicios/creditopagos.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CreditoService } from '../servicios/credito.service';
import { PagosService } from '../servicios/pagos.service';

type NewType = NotificacionService;

@Component({
  selector: "app-listado-creditopagos",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"],
})
export class ListadoComponent implements OnInit {
  @Input() rel_prefix:any;
  @Input() rel_field:any;
  @Input() rel_id:any;

  modalRef?: BsModalRef;

  formato: any;
  dataEdit = null;
  titulo: any = "Crédito - Pagos";

  credito:any = [];
pagos:any = [];

  constructor(
    public CreditopagosService: CreditopagosService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rel_prefix) this.CreditopagosService.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"ID","colsize":"12","filtrotipo":"text"},"creditoId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Crédito","colsize":"6","filtrotipo":"number","mascara":{"campo":"credito","valor":"id"}},"nrocuota":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"# de Cuota","colsize":"6","filtrotipo":"number"},"interes":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Interés","colsize":"6","filtrotipo":"text"},"capital":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Capital","colsize":"6","filtrotipo":"text"},"saldo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Saldo","colsize":"6","filtrotipo":"text"},"mora":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Mora","colsize":"6","filtrotipo":"text"},"descuento":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Descuento","colsize":"6","filtrotipo":"text"},"recargo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Recargo","colsize":"6","filtrotipo":"text"},"pagofecha":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fecha de Pago","colsize":"6","filtrotipo":"date"},"plazo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Plazo","colsize":"6","filtrotipo":"date"},"pagoId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Pago","colsize":"12","filtrotipo":"number","mascara":{"campo":"pago","valor":"id"}}}
    };

    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(data: any, template) {
    if (this.rel_prefix == null)
      this.router.navigate(['./nuevo', { }],{relativeTo: this.route});
    else{
      this.dataEdit = null;
      this.modalRef = this.modalService.show(template, {
        class: `modal-lg modal-fullscreen-lg-down modal-dialog-centered`,
      });
    }
  }

  editar(data: any, template) {    
    if (this.rel_prefix == null)
      this.router.navigate(['./'+data.id, { }],{relativeTo: this.route});
    else{
      this.dataEdit = data;
      this.modalRef = this.modalService.show(template, {
        class: `modal-lg modal-fullscreen-lg-down modal-dialog-centered`,
      });
    }
  }

  habilitar(data: any, component) {
    this.CreditopagosService.habilitar(data, data.id).subscribe(
      (data) => {
        component.obtenerDatos();
        this.NotificacionService.successStandar(
          "Registro habilitado exitosamente."
        );
      },
      (error) => {
        this.NotificacionService.alertError(error);
      }
    );
  }

  deshabilitar(data: any, component) {
    this.CreditopagosService.deshabilitar(data, data.id).subscribe(
      (data) => {
        component.obtenerDatos();
        this.NotificacionService.successStandar(
          "Registro deshabilitado exitosamente."
        );
      },
      (error) => {
        this.NotificacionService.alertError(error);
      }
    );
  }

  eliminar(data: any, component) {
    this.NotificacionService.alertaEliminacion(data.nombre, (response: any) => {
      if (response) {
        this.CreditopagosService.delete(data.id).subscribe(
          (data) => {
            component.obtenerDatos();
            this.NotificacionService.successStandar(
              "Registro eliminado exitosamente."
            );
          },
          (error) => {
            this.NotificacionService.alertError(error);
          }
        );
      }
    });
  }
}
