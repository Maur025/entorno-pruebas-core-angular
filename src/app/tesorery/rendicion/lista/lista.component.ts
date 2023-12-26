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
export class ListaComponent {

  @ViewChild('appFormRendir') appFormRendir: FormularioComponent;
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Rendiciones';
  textoBuscar = 'Ingrese criterio de busqueda: nombre y nit/ci'
  titulo:string = 'Lista de Rendiciones';
  formato: any;
  modalRef?: BsModalRef;
  fondoRendir:any;

  constructor(
    public fondoRendirService: EntidadService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
  ) {}

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
        "fondo": this.getOpcionesCabecera('Fondo', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "referencia": this.getOpcionesCabecera('Referencia', 12),
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
    this.modalRef = this.modalService.show(template, {class: `modal-dialog modal-scrollable`});
  }

  editar(data: any, template: any) {
    this.fondoRendir = data;
    this.modalRef = this.modalService.show(template, {class: `modal-dialog modal-scrollable`});
  }

  cerrarModal(){
    this.modalService.hide();
  }

  habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.fondoRendirService.habilitar(data.id).subscribe(
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
