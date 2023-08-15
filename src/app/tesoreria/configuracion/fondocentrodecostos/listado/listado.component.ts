import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from "@angular/router";
import { FondocentrodecostosService } from "../servicios/fondocentrodecostos.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FondoService } from '../servicios/fondo.service';
import { CentrodecostosService } from '../servicios/centrodecostos.service';

type NewType = NotificacionService;

@Component({
  selector: "app-listado-fondocentrodecostos",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"],
})
export class ListadoComponent implements OnInit {
  @Input() rel_prefix:any;
  @Input() rel_field:any;

  modalRef?: BsModalRef;

  formato: any;
  dataEdit = null;
  titulo: any = "Fondos - Centro de Costos";

  fondo:any = [];
centrodecostos:any = [];

  constructor(
    public FondocentrodecostosService: FondocentrodecostosService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rel_prefix) this.FondocentrodecostosService.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"id","colsize":"12","filtrotipo":"number"},"fondo_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fondo","colsize":"12","filtrotipo":"number","mascara":{"campo":"fondo","valor":"nombre"}},"centrodecostos_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Centro  de Costos","colsize":"12","filtrotipo":"number","mascara":{"campo":"centrodecostos","valor":"nombre"}}}
    };

    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(data: any, template) {
    this.dataEdit = null;
    this.modalRef = this.modalService.show(template, {
      class: `modal-lg modal-fullscreen-lg-down modal-dialog-centered`,
    });
  }

  editar(data: any, template) {
    this.router.navigate(['./'+data.id, { }],{relativeTo: this.route});
/*this.dataEdit = data;
    this.modalRef = this.modalService.show(template, {
      class: `modal-lg modal-fullscreen-lg-down modal-dialog-centered`,
    });*/
  }

  habilitar(data: any, component) {
    this.FondocentrodecostosService.habilitar(data, data.id).subscribe(
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
    this.FondocentrodecostosService.deshabilitar(data, data.id).subscribe(
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
        this.FondocentrodecostosService.delete(data.id).subscribe(
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
