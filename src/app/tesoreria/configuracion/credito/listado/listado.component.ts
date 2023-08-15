import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from "@angular/router";
import { CreditoService } from "../servicios/credito.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CuotastiempoService } from '../servicios/cuotastiempo.service';
import { TiempointeresService } from '../servicios/tiempointeres.service';
import { TipointeresService } from '../servicios/tipointeres.service';
import { FormapagoService } from '../servicios/formapago.service';
import { TipopagoService } from '../servicios/tipopago.service';
import { AcreedorService } from '../servicios/acreedor.service';
import { DeudorService } from '../servicios/deudor.service';
import { CreditoestadoService } from '../servicios/creditoestado.service';
import { CreditopagosService } from '../servicios/creditopagos.service';

type NewType = NotificacionService;

@Component({
  selector: "app-listado-credito",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"],
})
export class ListadoComponent implements OnInit {
  @Input() rel_prefix:any;
  @Input() rel_field:any;

  modalRef?: BsModalRef;

  formato: any;
  dataEdit = null;
  titulo: any = "Créditos";

  cuotas_tiempo:any = [];
tiempo_interes:any = [];
tipo_interes:any = [];
forma_pago:any = [];
tipo_pago:any = [];
acreedor:any = [];
deudor:any = [];
credito_estado:any = [];
credito_pagos:any = [];

  constructor(
    public CreditoService: CreditoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.rel_prefix) this.CreditoService.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"id","colsize":"12","filtrotipo":"number"},"capital":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Capital","colsize":"4","filtrotipo":"text"},"cuotas":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Cuotas","colsize":"4","filtrotipo":"number"},"cuotas_tiempo_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tiempo de Cuotas","colsize":"4","filtrotipo":"number","mascara":{"campo":"cuotas_tiempo","valor":"nombre"}},"interes":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Interés","colsize":"4","filtrotipo":"text"},"tiempo_interes_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Periodo de Interés","colsize":"4","filtrotipo":"number","mascara":{"campo":"tiempo_interes","valor":"nombre"}},"tipo_interes_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tipo de Interés","colsize":"4","filtrotipo":"number","mascara":{"campo":"tipo_interes","valor":"nombre"}},"tieneiva":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tiene IVA?","colsize":"4","filtrotipo":"text"},"redondear":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Redondear cuotas?","colsize":"4","filtrotipo":"text"},"forma_pago_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Forma de pago","colsize":"4","filtrotipo":"number","mascara":{"campo":"forma_pago","valor":"nombre"}},"tipo_pago_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tipo de pago","colsize":"4","filtrotipo":"number","mascara":{"campo":"tipo_pago","valor":"nombre"}},"montoaprobado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Monto Aprobado","colsize":"4","filtrotipo":"text"},"montodesembolsado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Monto Desembolsado","colsize":"4","filtrotipo":"text"},"plazo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Plazo","colsize":"4","filtrotipo":"date"},"dias":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Días","colsize":"4","filtrotipo":"number"},"acreedor_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Acreedor","colsize":"4","filtrotipo":"number","mascara":{"campo":"acreedor","valor":"entidad.nombre"}},"deudor_id":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Deudor","colsize":"4","filtrotipo":"number","mascara":{"campo":"deudor","valor":"entidad.nombre"}},"creditofecha":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fecha de crédito","colsize":"4","filtrotipo":"date"},"estados":{"texto":"Estados","colsize":"12","mascara":{"campo":"estados","valor":"credito_id"}},"pagos":{"texto":"Pagos","colsize":"12","mascara":{"campo":"pagos","valor":"credito_id"}}}
    };

    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(data: any, template) {
    this.dataEdit = null;
    this.modalRef = this.modalService.show(template, {
      class: `modal-xl modal-fullscreen-xl-down modal-dialog-centered`,
    });
  }

  editar(data: any, template) {
    this.dataEdit = data;
    this.modalRef = this.modalService.show(template, {
      class: `modal-xl modal-fullscreen-xl-down modal-dialog-centered`,
    });
  }

  habilitar(data: any, component) {
    this.CreditoService.habilitar(data, data.id).subscribe(
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
    this.CreditoService.deshabilitar(data, data.id).subscribe(
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
        this.CreditoService.delete(data.id).subscribe(
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
