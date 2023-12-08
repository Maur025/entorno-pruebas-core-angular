import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CreditoService } from "../servicios/credito.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
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
  @Input() rel_id:any;

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
      cabeceras: {"id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"id","colsize":"12","filtrotipo":"text"},"capital":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Capital","colsize":"4","filtrotipo":"text"},"cuotas":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Cuotas","colsize":"4","filtrotipo":"number"},"cuotasTiempoId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Cuotas - Tiempo","colsize":"4","filtrotipo":"number","mascara":{"campo":"cuotasTiempo","valor":"nombre"}},"interes":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Interés","colsize":"4","filtrotipo":"text"},"tiempoInteresId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tiempo de Interés","colsize":"4","filtrotipo":"number","mascara":{"campo":"tiempoInteres","valor":"nombre"}},"tipoInteresId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tipo de Interés","colsize":"4","filtrotipo":"number","mascara":{"campo":"tipoInteres","valor":"nombre"}},"tieneiva":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tiene IVA?","colsize":"6","filtrotipo":"text"},"redondear":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Redondear","colsize":"6","filtrotipo":"text"},"formaPagoId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Forma de Pago","colsize":"6","filtrotipo":"number","mascara":{"campo":"formaPago","valor":"nombre"}},"tipoPagoId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tipo de Pago","colsize":"6","filtrotipo":"number","mascara":{"campo":"tipoPago","valor":"nombre"}},"montoaprobado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Monto Aprobado","colsize":"6","filtrotipo":"text"},"montodesembolsado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Monto Desembolsado","colsize":"6","filtrotipo":"text"},"plazo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Plazo","colsize":"6","filtrotipo":"date"},"dias":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Días","colsize":"6","filtrotipo":"number"},"acreedorId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Acreedor","colsize":"6","filtrotipo":"number","mascara":{"campo":"acreedor","valor":"entidad.nombre"}},"deudorId":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Deudor","colsize":"6","filtrotipo":"number","mascara":{"campo":"deudor","valor":"entidad.nombre"}},"creditofecha":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fecha de Crédito","colsize":"6","filtrotipo":"date"},"estados":{"texto":"Estados","colsize":"12","mascara":{"campo":"estados","valor":"creditoId"}},"pagos":{"texto":"Pagos","colsize":"12","mascara":{"campo":"pagos","valor":"creditoId"}}}
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
