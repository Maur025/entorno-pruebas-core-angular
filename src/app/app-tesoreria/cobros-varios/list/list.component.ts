import { Component, inject, OnInit } from '@angular/core';
import { FuncionesComponent } from "../../funciones.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CobrosVariosService } from 'src/app/core/services/tesoreria/cobros-varios.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends FuncionesComponent implements OnInit {

  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  type: boolean = true;
  titleCustom: any = "Registro Cobros varios";
  label: string = "Cobros";
  data: any;
  public _cobrosVariosService = inject(CobrosVariosService);
  private modalConfig: {
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    class: string;
  } = {
      ignoreBackdropClick: true,
      keyboard: false,
      class: "modal-xl modal-scrollable",
    };

  constructor(private modalService: BsModalService) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Cobros Varios" },
      { label: "Gestión de cobros varios", active: true },
    ];
    this.formato = this.getCabeceras();
  }

  getCabeceras() {
    return {
      cabeceras: {
        //acciones: this.getOpcionesCabecera("Acciones", 12, "text", true, false),
        nombreCuenta: this.getOpcionesCabecera("Cuenta Contable", 12, "text", true, true),
        centroCosto: this.getOpcionesCabecera("Centro Costo", 12, "text", true, true),
        tipo: this.getOpcionesCabecera("Tipo", 12, "text", true, true),
        fecha: this.getOpcionesCabecera("Fecha", 12, "text", true, true, "text-start"),
        descripcion: this.getOpcionesCabecera("Descripción", 12, "text", true, true, "text-start"),
        monto: this.getOpcionesCabecera("Monto", 12, "text", true, true, "text-end"),
      },
    };
  };

  crearCobroVario(template: any) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }
}
