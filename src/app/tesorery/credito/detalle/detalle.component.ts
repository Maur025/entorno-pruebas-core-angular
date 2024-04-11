import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CreditoService } from "../../services/tesoreria/credito.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @ViewChild('appFormPagoCredito') appFormPagoCredito;
  @Input() credito;
  creditoId: any;
  cargandoContenido = false;
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Créditos';
  titulo: string = 'Detalle de Credito';
  modalRef?: BsModalRef;
  detalleCredito: any;

  constructor(
    private creditoService: CreditoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private notificacion: NotificacionService,
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    this.creditoId = this.route.snapshot.paramMap.get("credito_id");
    this.getCredito();
  }

  getCredito() {
    this.cargandoContenido = true;
    this.creditoService.find(this.creditoId).subscribe(data => {
      this.credito = data.content
      this.cargandoContenido = false;
    }, error => this.notificacion.alertError(error));
  }

  pagarCredito(modal, fila) {
    this.detalleCredito = fila;
    this.modalRef = this.modalService.show(modal, { class: 'modal-xl modal-dialog-scrollable' });
  }
}
