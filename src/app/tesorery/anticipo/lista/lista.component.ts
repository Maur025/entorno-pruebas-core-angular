import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnticipoService } from '../../services/tesoreria/anticipo.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {


  


  @ViewChild('appFormAnticipo') appFormAnticipo: FormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Administración de Anticipos';
  titulo: string = 'Anticipos Proveedor'
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
  anticipoData:any;

  constructor(
    public AnticipoService: AnticipoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    if (this.rel_prefix) this.servicio.setPrefix(this.rel_prefix);
    this.formato = {
      cabeceras:{
        "acciones" : {"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Acciones","colsize":"12","filtrotipo":"number"},
        "id":{"visible":false,"buscable":true,"buscableCheck":true,"visibleCheck":false,"sortable":true,"filtrable":true,"texto":"ID","colsize":"12","filtrotipo":"text"},
        "enfidadReferencial":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Proveedor","colsize":"12","filtrotipo":"number"},
        "fecha":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Fecha","colsize":"12","filtrotipo":"fecha"},
        "monto":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Monto","colsize":"12","filtrotipo":"text"},
        "saldo":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Saldo","colsize":"12","filtrotipo":"text"},
        "estado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Estado","colsize":"12","filtrotipo":"text"},
      }
    };
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(template: any) {
    this.anticipo = false;
    this.anticipoData = undefined;
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

 
 /* habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.CuentaBancoService.habilitar(data.id).subscribe(
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
  }*/
  verDetalleAnticipo(id){
    this.router.navigate(['anticipo', id,'aplicacion']);
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



  aplicacionAnticipo(data: any, template: any){
    //this.fondo = data;
    this.anticipo = true;
    this.anticipoData = data;
    this.titleModal = 'Movimiento';
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  
  }

}