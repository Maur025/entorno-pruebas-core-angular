import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriasService } from "../servicios/categorias.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";


type NewType = NotificacionService;

@Component({
  selector: "app-listado-categorias",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"],
})
export class ListadoComponent implements OnInit {
  @Input() rel_prefix:any;
  @Input() rel_field:any;

  modalRef?: BsModalRef;

  formato: any;
  dataEdit = null;
  titulo: any = "Listado de Categorias";



  constructor(
    public CategoriasService: CategoriasService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rel_prefix) this.CategoriasService.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"id","colsize":"12","filtrotipo":"number"},"codigo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"codigo","colsize":"12","filtrotipo":"text"},"nombre":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"nombre","colsize":"12","filtrotipo":"text"},"descripcion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"descripcion","colsize":"12","filtrotipo":"text"}}
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
    this.CategoriasService.habilitar(data, data.id).subscribe(
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
    this.CategoriasService.deshabilitar(data, data.id).subscribe(
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
        this.CategoriasService.delete(data.id).subscribe(
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
