import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from "@angular/router";
import { FondotipoService } from "../servicios/fondotipo.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";


type NewType = NotificacionService;

@Component({
  selector: "app-listado-fondotipo",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"],
})
export class ListadoComponent implements OnInit {
  @Input() rel_prefix:any;
  @Input() rel_field:any;

  modalRef?: BsModalRef;

  formato: any;
  dataEdit = null;
  titulo: any = "Tipos de Fondos";



  constructor(
    public FondotipoService: FondotipoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rel_prefix) this.FondotipoService.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"id","colsize":"12","filtrotipo":"number"},"nombre":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Nombre de tipo de fondo","colsize":"12","filtrotipo":"text"},"descripcion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Descripcion","colsize":"12","filtrotipo":"text"},"esrotativo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"es rotativo?","colsize":"12","filtrotipo":"text"},"esoperativo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"es operativo?","colsize":"12","filtrotipo":"text"},"conrendicion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"tiene rendición?","colsize":"12","filtrotipo":"text"}}
    };

    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(data: any, template) {
    this.dataEdit = null;
    this.modalRef = this.modalService.show(template, {
      class: `modal-md modal-fullscreen-md-down modal-dialog-centered`,
    });
  }

  editar(data: any, template) {
    this.dataEdit = data;
    this.modalRef = this.modalService.show(template, {
      class: `modal-md modal-fullscreen-md-down modal-dialog-centered`,
    });
  }

  habilitar(data: any, component) {
    this.FondotipoService.habilitar(data, data.id).subscribe(
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
    this.FondotipoService.deshabilitar(data, data.id).subscribe(
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
        this.FondotipoService.delete(data.id).subscribe(
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
