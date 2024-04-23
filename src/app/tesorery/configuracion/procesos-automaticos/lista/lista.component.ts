import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';
import { ProcesoAutomaticoService } from 'src/app/tesorery/services/tesoreria/proceso-automatico.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaProcesosComponent extends FuncionesComponent implements OnInit {

  textoBuscar = 'Ingrese criterio de busqueda: nombre, descripción y código'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Proceso Automáticos';
  titulo: string = 'Lista de Procesos Automáticos';
  formato: any;
  modalRef?: BsModalRef;
  procesoAutomatico: any;
  titleModal = '';
  constructor(
    public procesoAutomaticoService: ProcesoAutomaticoService,
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
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "codigo": this.getOpcionesCabecera('Código', 12),
        "automatico": this.getOpcionesCabecera('Automático', 12, 'text', true, false),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  crear(template: any) {
    this.procesoAutomatico = undefined;
    this.titleModal = 'Nueva';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  editar(data: any, template: any) {
    this.procesoAutomatico = data;
    this.titleModal = 'Editar';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  cerrarModal() {
    this.modalService.hide();
  }

  habilitar(data: any, component, texto) {
    this.notificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.procesoAutomaticoService.habilitar(data.id).subscribe((data) => {
          let estado = '';
          component.obtenerDatos();
          texto == 'habilitar' ? estado = 'habilitado' : estado = 'inhabilitado';
          this.notificacionService.successStandar('Registro ' + estado + ' exitosamente.');
        }, error => this.notificacionService.alertError(error));
      }
    });
  }
}
