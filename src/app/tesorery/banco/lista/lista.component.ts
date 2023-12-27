import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BancoService } from "../../services/tesoreria/banco.service";
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
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "nombre": this.getOpcionesCabecera('Nombre', 12),
        "sigla": this.getOpcionesCabecera('Sigla', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "telefono": this.getOpcionesCabecera('Teléfono', 6),
        "direccion": this.getOpcionesCabecera('Dirección', 6),
        "url": this.getOpcionesCabecera('Correo Electrónico', 12),
        "estado": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  getOpcionesCabecera(texto: string, colsize: number, filtrotipo: string = 'text', visible: boolean = true) {
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
