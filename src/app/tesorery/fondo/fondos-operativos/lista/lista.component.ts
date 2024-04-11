import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FondoOperativoService } from "src/app/tesorery/services/tesoreria/fondo-operativo.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FormularioOperativoComponent } from '../formulario/formulario.component';
import { ActivatedRoute, Router } from "@angular/router";
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaOperativoComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormFondoOp') appFormFondoOp: FormularioOperativoComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Fondos Operativos';
  textoBuscar = 'Ingrese criterio de busqueda: nombre, nro solicitud y descripción'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo: string = 'Lista de Fondos Operativos';
  formato: any;
  modalRef?: BsModalRef;
  fondo: any;
  titleModal: any;
  apertura = false;
  descargo = false;
  tipoDescargo: any;
  tipoTexto: any;

  constructor(
    public fondoOperativoService: FondoOperativoService,
    private modalService: BsModalService,
    private notificacion: NotificacionService,
    private router: Router,
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
        "nroSolicitud": this.getOpcionesCabecera('Nro Solicitud', 12),
        "fechaSolicitud": this.getOpcionesCabecera('Fecha Solicitud', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 6),
        "importe": this.getOpcionesCabecera('Monto de Apertura', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "aperturado": this.getOpcionesCabecera('Aperturado', 12),
        "cierre": this.getOpcionesCabecera('Cerrado', 12),
        "estadoIntegracion": this.getOpcionesCabecera('Estado de Integracion', 6),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  crear(template: any) {
    this.fondo = undefined;
    this.apertura = false;
    this.descargo = false;
    this.tipoDescargo = undefined;
    this.titleModal = 'Nuevo Fondo Operativo';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  editar(data: any, template: any) {
    this.fondo = data;
    this.apertura = false;
    this.descargo = false;
    this.tipoDescargo = undefined;
    this.titleModal = 'Editar Fondo Operativo';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  aperturar(data: any, template: any) {
    this.fondo = data;
    this.apertura = true;
    this.descargo = false;
    this.tipoDescargo = 'APERT';
    this.titleModal = 'Apertura de Fondo Operativo ';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  descargos(data: any, template: any, tipo, tipoTexto) {
    this.fondo = data;
    this.descargo = true;
    this.apertura = false;
    this.tipoDescargo = tipo;
    this.tipoTexto = tipoTexto;
    this.titleModal = ' de Fondo Operativo';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  detalleFondo(data: any) {
    this.fondo = data;
    this.router.navigate(['fondo/operativos/detalleFondo', data.id]);
    //this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  cerrar(data, tabla) {
    this.notificacion.alertaSimpleConfirmacionBoton("Esta seguro que desea cerrar el fondo operativo: '" + data.nombre + "'.", "Sí, cerrar", (response: any) => {
      if (response) {
        this.fondoOperativoService.cerrarFondo(data.id).subscribe(data => {
          tabla.obtenerDatos();
          this.notificacion.successStandar('Registro cerrado exitosamente.');
        }, (error) => {
          this.notificacion.alertError(error);
        });
      }
    })
  }

  cerrarModal() {
    this.modalService.hide();
  }

  habilitar(data: any, component, texto) {
    this.notificacion.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.fondoOperativoService.habilitar(data.id).subscribe((data) => {
          let estado = '';
          component.obtenerDatos();
          texto == 'habilitar' ? estado = 'habilitado' : estado = 'inhabilitado';
          this.notificacion.successStandar('Registro ' + estado + ' exitosamente.');
        }, (error) => {
          this.notificacion.alertError(error);
        }
        );
      }
    });
  }
}
