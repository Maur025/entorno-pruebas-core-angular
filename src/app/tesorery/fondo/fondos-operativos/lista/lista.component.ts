import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FondoOperativoService } from "src/app/tesorery/services/tesoreria/fondo-operativo.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FormularioComponent } from '../formulario/formulario.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit{

  @ViewChild('appFormFondoOp') appFormFondoOp: FormularioComponent;
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Fondos Operativos';
  textoBuscar = 'Ingrese criterio de busqueda: nombre, nro solicitud y descripción'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo:string = 'Lista de Fondos Operativos';
  formato: any;
  modalRef?: BsModalRef;
  fondo: any;

  constructor(
    public fondoOperativoService: FondoOperativoService,
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
        "nroSolicitud":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Nro Solicitud","colsize":"12","filtrotipo":"number"},
        "fechaSolicitud":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fecha Solicitud","colsize":"12","filtrotipo":"text"},
        "importe":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Monto","colsize":"12","filtrotipo":"text"},
        "descripcion":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Descripción","colsize":"12","filtrotipo":"text"},
        "aperturado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Aperturado","colsize":"12","filtrotipo":"text"},
        "estado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Estado","colsize":"12","filtrotipo":"text"},
      }
    };
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(template: any) {
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  editar(data: any, template: any) {
    this.fondo = data;
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  aperturar(data: any, template: any){
    this.fondo = data;
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  cerrarModal(){
    this.modalService.hide();
  }

  habilitar(data: any, texto) {
   /*  this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.fondoOperativoService.habilitar(data.id).subscribe(
          (data) => {
            let estado='';
            texto == 'habilitar'? estado='habilitado' : estado='inhabilitado';
            this.NotificacionService.successStandar('Registro '+estado+' exitosamente.');
          },
          (error) => {
            this.NotificacionService.alertError(error);
          }
        );
      }
    }); */
  }
}
