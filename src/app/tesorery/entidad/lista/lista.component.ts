import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EntidadService } from "../../services/tesoreria/entidad.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @ViewChild('appFormEntidad') appFormEntidad: FormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Entidades';
  textoBuscar = 'Ingrese criterio de busqueda: nombre y nit/ci'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo:string = 'Lista de Entidades';
  formato: any;
  modalRef?: BsModalRef;
  entidad: any;

  constructor(
    public entidadService: EntidadService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    this.formato = {
      cabeceras:{
        "acciones" : {"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Acciones","colsize":"12","filtrotipo":"number"},
        "id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"ID","colsize":"12","filtrotipo":"text"},
        "nombre":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Nombre","colsize":"12","filtrotipo":"number"},
        "nitCi":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"NIT / CI","colsize":"12","filtrotipo":"text"},
        "tipo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Tipo","colsize":"12","filtrotipo":"text"},
        "estado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Estado","colsize":"12","filtrotipo":"text"},
      }
    };
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(template: any) {
    this.modalRef = this.modalService.show(template, {class: `modal-dialog modal-scrollable`});
  }

  editar(data: any, template: any) {
    this.entidad = data;
    this.modalRef = this.modalService.show(template, {class: `modal-dialog modal-scrollable`});
  }

  cerrarModal(){
    this.modalService.hide();
  }

  habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.entidadService.habilitar(data.id).subscribe(
          (data) => {
            let estado='';
            component.obtenerDatos();
            texto == 'habilitar'? estado='habilitado' : estado='inhabilitado';
            this.NotificacionService.successStandar('Registro '+estado+' exitosamente.');
          },
          (error) => {
            this.NotificacionService.alertError(error);
          }
        );
      }
    });
  }
}
