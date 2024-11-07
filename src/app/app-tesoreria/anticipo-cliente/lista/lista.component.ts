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
import { ClienteService } from "src/app/core/services/ventas/clientes.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
export class ListaComponent extends FuncionesComponent implements OnInit {
  titulo = "Anticipo Cliente"
  tituloLista = "Lista de Anticipos"

  /*Servicios Necesarios*/
  @ViewChild("nuevoAnticipo", { static: true }) nuevoAnticipo: TemplateRef<any>;

  private _clienteService = inject(ClienteService);
  public _anticipoClienteService = inject(AnticipoClienteService);
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  type: boolean = true;
  titleCustom: any = "Registro de Anticipo de Clientes";
  label: string = "Clientes";
  data: any;
  dataCliente: any;
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }
  ngOnInit(): void {
    this.getVentas();
    this.breadCrumbItems = [
			{ label: this.titulo },
			{ label: this.tituloLista, active: true },
		]
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
        cliente: this.getOpcionesCabecera("Cliente", 12, "text", true, true),
        nroDocumento: this.getOpcionesCabecera(
          "Nro Documento",
          12,
          "text",
          true,
          true
        ),
        montoAnticipo: this.getOpcionesCabecera(
          "Monto Anticipo",
          12,
          "text",
          true,
          true,
          "text-end"
        ),
        anticipoAplicado: this.getOpcionesCabecera(
          "Anticipo Aplicado",
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
    this._clienteService.getAll(100, 0, "id", false, "").subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => console.log(err),
    });
  };

  crearAnticipo(template) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  realizarDevolucion(template, cliente) {
    console.log(cliente);
    this.dataCliente = cliente;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  listAnticipos(clienteId){
    this.router.navigate(["./" + clienteId + "/anticipos-list/", {}], {
      relativeTo: this.route,
    });
  }
}
