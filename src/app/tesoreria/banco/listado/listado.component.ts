import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BancoService } from "../servicios/banco.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ViasService } from '../servicios/vias.service';
import { CuentabancoService } from '../servicios/cuentabanco.service';
import { LineacreditobancoService } from '../servicios/lineacreditobanco.service';

type NewType = NotificacionService;

@Component({
  selector: "app-listado-banco",
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
  titulo: any = "Bancos";

  vias:any = [];
cuenta_banco:any = [];
lineacredito_banco:any = [];

  constructor(
    public BancoService: BancoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rel_prefix) this.BancoService.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"id","colsize":"12","filtrotipo":"number"},"nombre":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Nombre","colsize":"12","filtrotipo":"text"},"descripcion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Descripción","colsize":"6","filtrotipo":"text"},"direccion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Dirección","colsize":"6","filtrotipo":"text"},"url":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"URL","colsize":"12","filtrotipo":"text"},"viaId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"viaId","colsize":"12","filtrotipo":"number","mascara":{"campo":"via","valor":"nombre"}},"cuentas":{"texto":"Cuentas","colsize":"12","mascara":{"campo":"cuentas","valor":"banco_id"}},"lineasdecredito":{"texto":"Líneas de Crédito","colsize":"12","mascara":{"campo":"lineasdecredito","valor":"banco_id"}}}
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
    this.BancoService.habilitar(data, data.id).subscribe(
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
    this.BancoService.deshabilitar(data, data.id).subscribe(
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
        this.BancoService.delete(data.id).subscribe(
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