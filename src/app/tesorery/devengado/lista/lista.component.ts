import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnticipoService } from '../../services/tesoreria/anticipo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioComponent } from '../formulario/formulario.component';
import { DevengadoService } from '../../services/tesoreria/devengado.service';
import { FuncionesComponent } from '../../funciones.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormDevengado') appFormDevengado: FormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Devengados';
  titulo: string = 'Lista Devengados Proveedor'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  @Input() getAll = 'getAll';
  @Input() id;
  @Input() direccion = true;
  titleModal: any;


  editCreateWithModal = false;
  dataEdit = null;
  modalRef?: BsModalRef;
  formato: any;
  servicio = null;
  anticipo:any;
  devengado:any;

  constructor(
    public AnticipoService: AnticipoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    public devengadoService:DevengadoService
  ){
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    if (this.rel_prefix) this.servicio.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras:{
        "acciones" : {"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Acciones","colsize":"12","filtrotipo":"number"},
        "id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"ID","colsize":"12","filtrotipo":"text"},
        "centroCosto":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Centro Costo","colsize":"12","filtrotipo":"text"},
        "entidadReferencial":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Proveedor","colsize":"12","filtrotipo":"text"},
        "nroReferencia": this.getOpcionesCabecera('Nro Referencia', 12),
        "fecha":this.getOpcionesCabecera('Fecha', 12),
        "monto":this.getOpcionesCabecera('Monto', 12),
      "estado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":false,"filtrable":true,"texto":"Estado","colsize":"12","filtrotipo":"text"},
      }
    };
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(template: any) {
    this.anticipo = false;
    this.devengado = undefined;
    this.anticipo = undefined;
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }
  editar(data: any, template: any) {

    console.log(data);
    this.titleModal="Actualizar";
  //  this.anticipo = data;
  this.devengado = data;
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
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

  cerrarModal(){
    this.modalService.hide();
    this.titleModal = '';

  }
}
