import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FondoOperativoService } from "src/app/tesorery/services/tesoreria/fondo-operativo.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FormularioComponent } from '../formulario/formulario.component';
import { ActivatedRoute, Router } from "@angular/router";

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
  titleModal: any;
  apertura = false;
  descargo = false;

  constructor(
    public fondoOperativoService: FondoOperativoService,
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
        "nroSolicitud": this.getOpcionesCabecera('Nro Solicitud', 12),
        "fechaSolicitud": this.getOpcionesCabecera('Fecha Solicitud', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 6),
        "importe": this.getOpcionesCabecera('Monto Solicitud', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "aperturado": this.getOpcionesCabecera('Aperturado', 12),
        "cierre": this.getOpcionesCabecera('Cerrado', 12),
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
    this.apertura = false;
    this.titleModal = 'Nuevo';
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  editar(data: any, template: any) {
    this.fondo = data;
    this.apertura = false;
    this.descargo = false;
    this.titleModal = 'Editar';
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  aperturar(data: any, template: any){
    this.fondo = data;
    this.apertura = true;
    this.descargo = false;
    this.titleModal = 'Aperturar';
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  descargos(data: any, template: any){
    this.fondo = data;
    this.descargo = true;
    this.apertura = false;
    this.titleModal = 'Descargo de ';
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  detalleFondo(data: any){
    this.fondo = data;
    this.router.navigate(['fondo/operativos/detalleFondo', data.id]);
    //this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  cerrar(data, tabla){
    this.notificacion.alertaSimpleConfirmacionBoton("Esta seguro que desea cerrar el fondo operativo: '"+data.nombre+"'.","Sí, cerrar",(response: any) => {
      if (response) {
        this.fondoOperativoService.cerrarFondo(data.id).subscribe(data =>{
          tabla.obtenerDatos();
          this.notificacion.successStandar('Registro cerrado exitosamente.');
        },(error) => {
          this.notificacion.alertError(error);
        });
      }
    })
  }

  cerrarModal(){
    this.modalService.hide();
  }

  habilitar(data: any, component, texto) {
    this.notificacion.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.fondoOperativoService.habilitar(data.id).subscribe(
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
