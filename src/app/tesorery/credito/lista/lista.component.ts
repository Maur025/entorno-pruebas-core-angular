import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CreditoService } from "../../services/tesoreria/credito.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Créditos';
  textoBuscar = 'Ingrese criterio de busqueda: nro de referecia'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo: string = 'Lista de Créditos';
  formato: any;
  modalRef?: BsModalRef;
  credito: any;

  constructor(
    public creditoService: CreditoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "nroReferencia": this.getOpcionesCabecera('Nro Referencia', 12),
        "centroCosto": this.getOpcionesCabecera('Centro de Costos', 12),
        "fecha": this.getOpcionesCabecera('Fecha', 12),
        "estadoCredito": this.getOpcionesCabecera('Estado Credito', 12),
        "entidadReferencial": this.getOpcionesCabecera('Entidad Referencial', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  getOpcionesCabecera(texto: string, colsize: number, filtrotipo: string = 'text', visible: boolean = true, sorteable: boolean = true) {
    return {
      "visible": visible,
      "buscable": true,
      "buscableCheck": true,
      "visibleCheck": visible,
      "sortable": sorteable,
      "filtrable": true,
      "texto": texto,
      "colsize": colsize,
      "filtrotipo": filtrotipo
    }
  }

  cerrarModal() {
    this.modalService.hide();
  }

  verDetalle(data: any, template: any) {
    this.modalRef = this.modalService.show(template, { class: `modal-xl modal-scrollable` });
    this.credito = data;
    //this.router.navigate(['./detalle/' + data.id, {}], { relativeTo: this.route });
  }

  habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.creditoService.habilitar(data.id).subscribe((data) => {
          let estado = '';
          component.obtenerDatos();
          texto == 'habilitar' ? estado = 'habilitado' : estado = 'inhabilitado';
          this.NotificacionService.successStandar('Registro ' + estado + ' exitosamente.');
        }, (error) => {
          this.NotificacionService.alertError(error);
        });
      }
    });
  }
}
