import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FondoRendirService } from "src/app/tesorery/services/tesoreria/fondo-rendir.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FormularioRendirComponent } from '../formulario/formulario.component';
import { ActivatedRoute, Router } from "@angular/router";
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaRendirComponent extends FuncionesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Fondos a Rendir';
  textoBuscar = 'Ingrese criterio de busqueda: nombre, nro solicitud y descripción'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo: string = 'Lista de Fondos a Rendir';
  formato: any;
  modalRef?: BsModalRef;
  fondo: any;
  titleModal: any;
  tipoDescargo: any;
  tipoTexto: any;

  constructor(
    public fondoRendirService: FondoRendirService,
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
        "reponsable": this.getOpcionesCabecera('Responsable', 12),
        "aperturado": this.getOpcionesCabecera('Aperturado', 12),
        "cierre": this.getOpcionesCabecera('Cerrado', 12),
        "estadoContabilidad": this.getOpcionesCabecera('Estado Contabilidad', 6),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  crear(template: any) {
    this.fondo = undefined;
    this.tipoDescargo = undefined;
    this.titleModal = 'Nuevo Fondo a Rendir ';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  editar(data: any, template: any) {
    this.fondo = data;
    this.tipoDescargo = undefined;
    this.titleModal = 'Editar Fondo Operativo';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  aperturar(data: any, template: any) {
    this.fondo = data;
    this.tipoDescargo = 'APERT';
    this.titleModal = 'Apertura de Fondo a Rendir ';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  descargos(data: any, template: any, tipo) {
    this.fondo = data;
    this.tipoDescargo = tipo;
    tipo == 'RENDIDO' ? this.tipoTexto = 'RENDICIÓN' : this.tipoTexto = tipo;
    this.titleModal = ' de a Rendir ';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  detalleFondo(data: any) {
    this.fondo = data;
    this.router.navigate(['fondo/rendir/detalleFondo', data.id]);
  }

  cerrar(data, tabla) {
    this.notificacion.alertaSimpleConfirmacionBoton("Esta seguro que desea cerrar el fondo operativo: '" + data.nombre + "'.", "Sí, cerrar", (response: any) => {
      if (response) {
        this.fondoRendirService.cerrarFondo(data.id).subscribe(data => {
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
        this.fondoRendirService.habilitar(data.id).subscribe(
          (data) => {
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
