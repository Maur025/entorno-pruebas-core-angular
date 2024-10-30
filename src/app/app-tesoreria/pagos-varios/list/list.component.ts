import { Component, inject, OnInit } from "@angular/core";
import { FuncionesComponent } from "../../funciones.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { PagosVariosService } from "src/app/core/services/tesoreria/pagos-varios.service";
import { tap, catchError } from 'rxjs/operators';
import { ArchivosService } from 'src/app/core/services/archivos.service'
import { of } from 'rxjs';
import { NotificacionService } from "src/app/core/services/notificacion.service";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent extends FuncionesComponent implements OnInit {
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  type: boolean = true;
  titleCustom: any = "Registro Pagos varios";
  label: string = "Pagos";
  data: any;
  public _pagosVariosService = inject(PagosVariosService);
  private modalConfig: {
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    class: string;
  } = {
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-xl modal-scrollable",
  };

  constructor(private modalService: BsModalService,
		public archivosService: ArchivosService,
    public notificacionService: NotificacionService) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Pagos Varios" },
      { label: "Gestión de pagos varios", active: true },
    ];
    this.formato = this.getCabeceras();
  }

  getCabeceras = () => {
    return {
      cabeceras: {
        acciones: this.getOpcionesCabecera("Acciones", 12, "text", true, false),
        nombreCuenta: this.getOpcionesCabecera(
          "Cuenta Contable",
          12,
          "text",
          true,
          true
        ),
        centroCosto: this.getOpcionesCabecera(
          "Centro Costo",
          12,
          "text",
          true,
          true
        ),
        tipo: this.getOpcionesCabecera("Tipo", 12, "text", true, true),
        fecha: this.getOpcionesCabecera(
          "Fecha",
          12,
          "text",
          true,
          true,
          "text-start"
        ),
        descripcion: this.getOpcionesCabecera(
          "Descripción",
          12,
          "text",
          true,
          true,
          "text-start"
        ),
        monto: this.getOpcionesCabecera(
          "Monto",
          12,
          "text",
          true,
          true,
          "text-end"
        ),
      },
    };
  };

  crearAnticipo(template: any) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  descargarComprobante(id) {
    this._pagosVariosService.generarComprobante(id).pipe(
      tap((data) => {
        this.archivosService.generar64aPDF(data['data'].content, 'comprobante_pagos_varios.pdf');
      }),
      catchError((error) => {
        this.notificacionService.alertError(error);
        return of(null);
      })
    ).subscribe();
	}
}
