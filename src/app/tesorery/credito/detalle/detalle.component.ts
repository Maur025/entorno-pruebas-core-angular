import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CreditoService } from "../../services/tesoreria/credito.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DetalleCreditoService } from "../../services/tesoreria/detalle-credito.service";
import { FuncionesComponent } from "../../funciones.component";
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormPagoCredito') appFormPagoCredito;
  @Input() credito;
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  formato: any;
  creditoId: any;
  cargandoContenido = false;
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Créditos';
  titulo: string = 'Detalle de Crédito';
  textoBuscar: string = 'Ingrese criterio de búsqueda: descripción, descripción pagado, monto y monto pagado';
  modalRef?: BsModalRef;
  detalleCredito: any;
  filtrosData:any;
  filtrosNoRefresh = ['creditoId'];
  filtroFecha: any;

  constructor(
    private creditoService: CreditoService,
    public detalleCreditoService: DetalleCreditoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private notificacion: NotificacionService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    this.creditoId = this.route.snapshot.paramMap.get("credito_id");
    this.getCredito();
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "descripcionPagado": this.getOpcionesCabecera('Descripción Pagado', 12),
        "fechaPagar": this.getOpcionesCabecera('Fecha a Pagar', 12),
        "fechaPagado": this.getOpcionesCabecera('Fecha Pagado', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "montoPagado": this.getOpcionesCabecera('Monto Pagado', 12),
        "estadoCredito": this.getOpcionesCabecera('Estado Credito', 12),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }


  getCredito() {
    this.cargandoContenido = true;
    this.creditoService.find(this.creditoId).subscribe(data => {
      this.credito = data.content
      this.actualizarFiltros();
      this.cargandoContenido = false;
    }, error => this.notificacion.alertError(error));
  }

  pagarCredito(modal, detalleCredito) {
    this.detalleCredito = detalleCredito;
    this.modalRef = this.modalService.show(modal, { class: 'modal-xl modal-dialog-scrollable' });
  }

  verDetallePagos(modal, detalleCredito){
    this.detalleCredito = detalleCredito;
    console.log(detalleCredito)
    this.modalRef = this.modalService.show(modal, { class: 'modal-lg modal-dialog-scrollable' });
  }

  cambioFecha(e) {
    this.filtroFecha = e;
    this.actualizarFiltros();
  }

  convertirFecha(fecha, tipo) {
    let fechaOriginal = new Date(fecha);
    let año = fechaOriginal.getFullYear();
    let mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
    let dia = fechaOriginal.getDate().toString().padStart(2, '0');
    if (tipo == 'desde') {
      return (`${año}-${mes}-${dia}T00:00:00.000Z`);
    } else {
      return (`${año}-${mes}-${dia}T23:59:59.999Z`);
    }
  }

  actualizarFiltros() {
    let filtro = {};
    filtro['creditoId'] = this.credito.id;
    if (this.filtroFecha != undefined) {
      filtro['fechaDesde'] = this.convertirFecha(this.filtroFecha[0], 'desde');
      filtro['fechaHasta'] = this.convertirFecha(this.filtroFecha[1], 'hasta');
    }
    this.filtrosData = filtro;
  }
}
