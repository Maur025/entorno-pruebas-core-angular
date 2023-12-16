import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BancoService } from "../../services/banco.service";
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

  @ViewChild('appFormBanco') appFormBanco: FormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Banco';
  titulo:string = 'Lista de Bancos';
  textoBuscar = 'Ingrese criterio de busqueda: nombre, sigla, descripcion, dirección y url'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  editCreateWithModal = false;
  dataEdit = null;
  modalRef?: BsModalRef;
  formato: any;
  servicio = null;
  banco: any;
  modalForm: any;

  constructor(
    public BancoService: BancoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.servicio = BancoService;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    this.formato = {
      cabeceras:{
        "acciones" : {"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Acciones","colsize":"12","filtrotipo":"number"},
        "id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"ID","colsize":"12","filtrotipo":"text"},
        "nombre":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Nombre","colsize":"12","filtrotipo":"number"},
        "sigla":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Sigla","colsize":"12","filtrotipo":"text"},
        "descripcion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Descripción","colsize":"12","filtrotipo":"text"},
        "telefono":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Telefono","colsize":"12","filtrotipo":"text"},
        "direccion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Dirección","colsize":"12","filtrotipo":"text"},
        "url":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Url","colsize":"12","filtrotipo":"text"},
        "estado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Estado","colsize":"12","filtrotipo":"text"},
      }
    };
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }




  crear(template: any) {
    this.modalRef = this.modalService.show(template, {class: `modal-xl modal-scrollable`});
  }

  editar(data: any, template: any) {
    this.banco = data;
    this.router.navigate(['./id/' + data.id, {}], { relativeTo: this.route });

    //this.modalRef = this.modalService.show(template, {class: `modal-xl modal-scrollable`});
  }

  habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.BancoService.habilitar(data.id).subscribe(
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

  deshabilitar(data: any, component) {
    this.servicio.deshabilitar(data, data.id).subscribe(
      (data) => {
        component.obtenerDatos();
        this.NotificacionService.successStandar(
          "Registro deshabilitado exitosamente."
        );
      },
      (error) => {
        this.NotificacionService.alertError(error);
      }
    );
  }

  eliminar(data: any, component) {
    this.NotificacionService.alertaEliminacion(data.nombre, (response: any) => {
      if (response) {
        this.servicio.delete(data.id).subscribe(
          (data) => {
            component.obtenerDatos();
            this.NotificacionService.successStandar(
              "Registro eliminado exitosamente."
            );
          },
          (error) => {
            this.NotificacionService.alertError(error);
          }
        );
      }
    });
  }

  openModal(data, template) {
    this.dataEdit = data;
    this.modalRef = this.modalService.show(template, {
      class: `modal-lg modal-fullscreen-lg-down modal-dialog-centered`,
    });
    return;
  }

  getCabecera() {
    return {
      cabeceras: {
        "id": this.getFielFilter('id', 12, 'number', false),
        "nombre": this.getFielFilter('Nombre', 12),
        "descripcion": this.getFielFilter('Descripción', 6),
        "direccion": this.getFielFilter('Dirección', 6),
        "url": this.getFielFilter('Url', 6, 'true', true)
      }
    };
  }

  getFielFilter(texto: string, colsize: number, filtrotipo: string = 'text', visible: boolean = true) {
    return {
      "visible": visible,
      "buscable": true,
      "buscableCheck": true,
      "visibleCheck": visible,
      "sortable": true,
      "filtrable": true,
      "texto": texto,
      "colsize": colsize,
      "filtrotipo": filtrotipo
    }
  }

  cerrarModal(){
    this.modalService.hide();
  }
}
