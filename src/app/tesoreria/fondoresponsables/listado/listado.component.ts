import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FondoresponsablesService } from "../servicios/fondoresponsables.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuariosService } from '../servicios/usuarios.service';
import { FondoService } from '../servicios/fondo.service';

type NewType = NotificacionService;

@Component({
  selector: "app-listado-fondoresponsables",
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
  titulo: any = "Fondo - Responsables";

  usuarios:any = [];
fondo:any = [];

  constructor(
    public FondoresponsablesService: FondoresponsablesService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rel_prefix) this.FondoresponsablesService.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"id","colsize":"12","filtrotipo":"text"},"responsableId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Reponsable","colsize":"12","filtrotipo":"number","mascara":{"campo":"responsables","valor":"nombre"}},"fondoId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fondo","colsize":"12","filtrotipo":"number","mascara":{"campo":"fondo","valor":"nombre"}},"estado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"estado","colsize":"12","filtrotipo":"text"}}
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
    this.FondoresponsablesService.habilitar(data, data.id).subscribe(
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
    this.FondoresponsablesService.deshabilitar(data, data.id).subscribe(
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
        this.FondoresponsablesService.delete(data.id).subscribe(
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
