import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FuncionesComponent } from '../../funciones.component';
import { CajaService } from "src/app/tesorery/services/tesoreria/caja.service";
import { FormularioCajaComponent } from '../formulario/formulario.component';
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaCajaComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormCaja') appFormCaja: FormularioCajaComponent;
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Cajas';
  textoBuscar = 'Ingrese criterio de busqueda: nombre y nit/ci'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo: string = 'Lista de Cajas';
  formato: any;
  modalRef?: BsModalRef;
  titleModal: any;
  caja: any;
  tipoMovimiento: any;
  cajaIdNoUse: any;

  constructor(
    public cajaService: CajaService,
    private router: Router,
    private modalService: BsModalService,
    private notificacionService: NotificacionService,
  ) {
    super();
  }

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
        "nombre": this.getOpcionesCabecera('Nombre', 12),
        "responsable": this.getOpcionesCabecera('Responsable', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 6),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "aperturado": this.getOpcionesCabecera('Aperturado', 12),
        "cierre": this.getOpcionesCabecera('Cerrado', 12),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  crear(template: any) {
    this.caja = undefined;
    this.titleModal = 'Nueva Caja';
    this.tipoMovimiento = undefined;
    this.cajaIdNoUse = undefined;
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  editar(data: any, template: any) {
    this.caja = data;
    this.tipoMovimiento = undefined;
    this.cajaIdNoUse = undefined;
    this.titleModal = 'Editar Caja';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  aperturar(data: any, template: any) {
    this.caja = data;
    this.tipoMovimiento = 'APERT';
    this.cajaIdNoUse = undefined;
    this.titleModal = 'Apertura de Caja';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  cierre(data: any, template: any) {
    this.caja = data;
    this.tipoMovimiento = 'CIERR';
    this.cajaIdNoUse = data.id;
    this.titleModal = 'Cierre de Caja';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  habilitar(data: any, component, texto) {
    this.notificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.cajaService.habilitar(data.id).subscribe((data) => {
          let estado = '';
          component.obtenerDatos();
          texto == 'habilitar' ? estado = 'habilitado' : estado = 'inhabilitado';
          this.notificacionService.successStandar('Registro ' + estado + ' exitosamente.');
        }, error => this.notificacionService.alertError(error));
      }
    });
  }

  detalleCaja(data){
    this.router.navigate(['caja/detalleCaja', data.id]);
  }

  cerrarModal() {
    this.modalService.hide();
  }
}
