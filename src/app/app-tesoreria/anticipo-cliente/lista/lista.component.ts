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
import { VentasService } from "src/app/core/services/ventas/ventas.service";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
export class ListaComponent extends FuncionesComponent implements OnInit {
  /*Servicios Necesarios*/

  public _anticipoClienteService = inject(AnticipoClienteService);
  private _ventaService = inject(VentasService);

  @ViewChild("nuevoAnticipo", { static: true }) nuevoAnticipo: TemplateRef<any>;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  titleCustom: any = "Registro de Anticipo de Clientes";

  constructor(private modalService: BsModalService) {
    super();
  }
  ngOnInit(): void {
    this.getVentas();
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

  getVentas = () => {
    this._ventaService.getVentas(0, 100, "id", false).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    });
  };

  crearAnticipo(template) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }
}
