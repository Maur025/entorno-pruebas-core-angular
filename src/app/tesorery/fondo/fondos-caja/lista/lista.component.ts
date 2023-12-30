import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FondoCajaService } from "src/app/tesorery/services/tesoreria/fondo-caja.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FormularioCajaComponent } from '../formulario/formulario.component';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaCajaComponent implements OnInit{

  @ViewChild('appFormCaja') appFormCaja: FormularioCajaComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Fondos de Caja';
  textoBuscar = 'Ingrese criterio de busqueda: nombre, sigla y descripción'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo:string = 'Lista de Fondos de Caja';
  formato: any;
  modalRef?: BsModalRef;
  fondo: any;
  titleModal: any;

  constructor(
    public fondoCajaService: FondoCajaService,
    private modalService: BsModalService,
    private notificacion: NotificacionService,
    private router: Router,
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
        "sigla": this.getOpcionesCabecera('Sigla', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 6),
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
    this.fondo = undefined;
    this.titleModal = 'Nuevo';
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  editar(data: any, template: any) {
    this.fondo = data;
    this.titleModal = 'Editar';
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  descargos(data: any, template: any){
    this.fondo = data;
    this.titleModal = 'Descargo de ';
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  cerrarModal(){
    this.modalService.hide();
  }

  habilitar(data: any, component, texto) {
    this.notificacion.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.fondoCajaService.habilitar(data.id).subscribe(
          (data) => {
            let estado='';
            component.obtenerDatos();
            texto == 'habilitar'? estado='habilitado' : estado='inhabilitado';
            this.notificacion.successStandar('Registro '+estado+' exitosamente.');
          },(error) => {
            this.notificacion.alertError(error);
          }
        );
      }
    });
  }
}
