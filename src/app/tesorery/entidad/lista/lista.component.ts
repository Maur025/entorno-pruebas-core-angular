import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EntidadService } from "../../services/tesoreria/entidad.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FormularioComponent } from '../formulario/formulario.component';
import { FuncionesComponent } from '../../funciones.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormEntidad') appFormEntidad: FormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Entidades';
  textoBuscar = 'Ingrese criterio de busqueda: nombre y nit/ci'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo: string = 'Lista de Entidades';
  formato: any;
  modalRef?: BsModalRef;
  entidad: any;
  titleModal: any;

  constructor(
    public entidadService: EntidadService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
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
        "nitCi": this.getOpcionesCabecera('NIT / CI', 12),
        "tipo": this.getOpcionesCabecera('Tipo', 12, 'text', true, false),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  crear(template: any) {
    this.entidad = undefined;
    this.titleModal = 'Nuevo';
    this.modalRef = this.modalService.show(template, { class: `modal-dialog modal-scrollable` });
  }

  editar(data: any, template: any) {
    this.entidad = data;
    this.titleModal = 'Editar';
    this.modalRef = this.modalService.show(template, { class: `modal-dialog modal-scrollable` });
  }

  cerrarModal() {
    this.modalService.hide();
  }

  habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.entidadService.habilitar(data.id).subscribe(
          (data) => {
            let estado = '';
            component.obtenerDatos();
            texto == 'habilitar' ? estado = 'habilitado' : estado = 'inhabilitado';
            this.NotificacionService.successStandar('Registro ' + estado + ' exitosamente.');
          },
          (error) => {
            this.NotificacionService.alertError(error);
          }
        );
      }
    });
  }
}
