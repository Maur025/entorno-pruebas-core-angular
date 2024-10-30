import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TransaccionService } from "src/app/tesorery/services/tesoreria/transaccion.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';
import { EstadosService } from "src/app/tesorery/services/tesoreria/estados.service";
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaTransaccionesComponent extends FuncionesComponent implements OnInit{

  textoBuscar = 'Ingrese criterio de busqueda: origen'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo: string = 'Lista de Transacciones Kafka';
  formato: any;
  modalRef?: BsModalRef;
  cuentaContadoMedio: any;
  titleModal: any;
  listaEstadosSagas: any;
  tabValue: any;
  tabId: any;
  tabOrden: any;
  opciones = [];
  transaccion: any;

  constructor(
    public transaccionService: TransaccionService,
    public estadosService: EstadosService,
    private modalService: BsModalService,
    private notificacionService: NotificacionService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
    this.getEstadosSagas();
  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "topic": this.getOpcionesCabecera('Origen', 12),
        "procesado": this.getOpcionesCabecera('Procesado', 12, 'text'),
        "datos": this.getOpcionesCabecera('Datos', 12, 'text', true, false),
        "estadoSaga": this.getOpcionesCabecera('Estado', 12, 'text'),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  getEstadosSagas(){
    this.estadosService.habilitadosSagas().subscribe(data =>{
      this.listaEstadosSagas = data.content;
      this.tabId = this.listaEstadosSagas[0].id;
      this.tabValue = this.listaEstadosSagas[0].nombre;
      this.tabOrden = this.listaEstadosSagas[0].orden;
      this.cambioOpciones();
    },(error) => {
      this.notificacionService.alertError(error);
    });
  }

  tabSelect(data: TabDirective): void {
    this.tabValue = data.heading;
    this.tabId = data.id;
    this.tabOrden = this.listaEstadosSagas.find(e => e.id == this.tabId).orden;
    this.cambioOpciones();
  }

  cambioOpciones(){
    this.opciones = [];
    if(this.listaEstadosSagas.find(e => e.orden == this.tabOrden+1)) this.opciones.push(this.listaEstadosSagas.find(e => e.orden == this.tabOrden+1));
    if(this.listaEstadosSagas.find(e => e.orden == this.tabOrden.toString()+this.tabOrden.toString())) this.opciones.push(this.listaEstadosSagas.find(e => e.orden == this.tabOrden.toString()+this.tabOrden.toString()));
  }

  verDatos(template:any, data: any){
    this.transaccion = data;
    this.modalRef = this.modalService.show(template, {class: `modal-md modal-scrollable`});
  }

  operacion(data: any, estadoSaga: any, tabla){
    this.notificacionService.alertaSimpleConfirmacionBoton("¿Está seguro que desea registrar como '"+estadoSaga.nombre+"' la transacción seleccionada?.","Sí, registrar",(response: any) => {
      if (response) {
        if (estadoSaga.orden.toString().length  == 1) {
          if (estadoSaga.nombre == 'PROCESADO') {
            this.transaccionService.getTransaccionCredito(data.id).subscribe(res => {
              this.notificacionService.successStandar("Transacción registrada como "+estadoSaga.nombre+" exitosamente.");
              tabla.obtenerDatos();
            },(error) => {
              this.notificacionService.alertError(error);
            });
          } else {
            this.transaccionService.getTransaccionEstado(data.id).subscribe(res => {
              this.notificacionService.successStandar("Transacción registrada como "+estadoSaga.nombre+" exitosamente.");
              tabla.obtenerDatos();
            },(error) => {
              this.notificacionService.alertError(error);
            });
          }
        } else {
          this.transaccionService.getTransaccionEstadoCancelado(data.id).subscribe(res => {
            this.notificacionService.successStandar("Transacción registrada como "+estadoSaga.nombre+" exitosamente.");
            tabla.obtenerDatos();
          },(error) => {
            this.notificacionService.alertError(error);
          });
        }
      }
    });
  }

  cerrarModal(){
    this.modalService.hide();
  }
}
