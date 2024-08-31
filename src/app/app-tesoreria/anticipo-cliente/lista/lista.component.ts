import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FuncionesComponent } from "../../funciones.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AnticipoClienteService } from "src/app/core/services/tesoreria/anticipo-cliente.service";
import { FormAnticipoComponent } from "../../componentes-compartidos/form-anticipo/form-anticipo.component";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
export class ListaComponent extends FuncionesComponent implements OnInit {
  /*Servicios Necesarios*/
  public _anticipoClienteService = inject(AnticipoClienteService);
  @ViewChild("nuevoAnticipo", { static: true }) nuevoAnticipo: TemplateRef<any>;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  titleCustom: any = "Registro de Anticipo de Clientes";

  constructor(private modalService: BsModalService) {
    super();
  }
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Anticipo Cliente" },
      { label: "Gestión de anticipo cliente", active: true },
    ];
    this.formato = this.getCabeceras();
  }
  private modalConfig: {
    initialState: {};
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    class: string;
  } = {
    initialState: {
      title: "Registro de Anticipo de Clientes",
      type: true,
    },
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-xl modal-scrollable",
  };
  getCabeceras = () => {
    return {
      cabeceras: {
        acciones: this.getOpcionesCabecera("Acciones", 12, "text", true, false),
        proveedor: this.getOpcionesCabecera("Cliente", 12, "text", true, true),
        centroCosto: this.getOpcionesCabecera(
          "Centro Costo",
          12,
          "text",
          true,
          true
        ),
        nroReferencia: this.getOpcionesCabecera(
          "Nro Referencia",
          12,
          "text",
          true,
          true
        ),
        monto: this.getOpcionesCabecera(
          "Monto Anticipo",
          12,
          "text",
          true,
          true,
          "text-end"
        ),
        saldo: this.getOpcionesCabecera(
          "Saldo",
          12,
          "text",
          true,
          true,
          "text-end"
        ),
      },
    };
  };
  crearAnticipo() {
    let title = "Cliente Anticipo";
    let type = true;
    let modalData = {
      id: "Mensaje de prueba",
      otherData: "Más datos",
    };
    this.modalRef = this.modalService.show(this.nuevoAnticipo, {
      class: "modal-xl",
      initialState: modalData,
    });
  }
}
