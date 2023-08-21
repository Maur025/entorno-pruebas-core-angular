import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { LineacreditoService } from "../servicios/lineacredito.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MonedaService } from '../servicios/moneda.service';

type NewType = NotificacionService;

@Component({
  selector: "app-listado-lineacredito",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"],
})
export class ListadoComponent implements OnInit {
  @Input() rel_prefix:any;
  @Input() rel_field:any;

  modalRef?: BsModalRef;

  formato: any;
  dataEdit = null;
  titulo: any = "Líneas de créditos";

  moneda:any = [];

  constructor(
    public LineacreditoService: LineacreditoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rel_prefix) this.LineacreditoService.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"id","colsize":"12","filtrotipo":"number"},"numero":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Número","colsize":"12","filtrotipo":"text"},"moneda_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Monedas","colsize":"12","filtrotipo":"number","mascara":{"campo":"moneda","valor":"nombre"}},"importe":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Importe","colsize":"12","filtrotipo":"text"},"fechainicio":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fecha de Inicio","colsize":"12","filtrotipo":"date"},"fechafin":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fecha de fin","colsize":"12","filtrotipo":"date"}}
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
    this.LineacreditoService.habilitar(data, data.id).subscribe(
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
    this.LineacreditoService.deshabilitar(data, data.id).subscribe(
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
        this.LineacreditoService.delete(data.id).subscribe(
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
