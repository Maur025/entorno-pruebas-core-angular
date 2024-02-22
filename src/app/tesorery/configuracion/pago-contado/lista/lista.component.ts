import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CuentaContadoMedioService } from "src/app/tesorery/services/tesoreria/cuenta-contado-medio.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FormularioPagosComponent } from '../formulario/formulario.component';
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaPagosComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormPagoContado') appFormPagoContado: FormularioPagosComponent;
  textoBuscar = 'Ingrese criterio de busqueda: nombre'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  titulo: string = 'Lista de Configuraciones de Pagos al Contado';
  formato: any;
  modalRef?: BsModalRef;
  cuentaContadoMedio: any;
  titleModal: any;

  constructor(
    public cuentaContadoMedioService: CuentaContadoMedioService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "tipoPagoContado": this.getOpcionesCabecera('Tipo Pago', 12),
        "nombre": this.getOpcionesCabecera('Nombre', 12),
        "cuenta": this.getOpcionesCabecera('Cuenta', 12),
        "medioTransferencias": this.getOpcionesCabecera('Medios de Transferencia', 12, 'text', true, false),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  crear(template: any) {
    this.cuentaContadoMedio = undefined;
    this.titleModal = 'Nueva';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  editar(data: any, template: any) {
    this.cuentaContadoMedio = data;
    this.titleModal = 'Editar';
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  cerrarModal() {
    this.modalService.hide();
  }

  habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.cuentaContadoMedioService.habilitar(data.id).subscribe(
          (data) => {
            let estado='';
            component.obtenerDatos();
            texto == 'habilitar'? estado='habilitado' : estado='inhabilitado';
            this.NotificacionService.successStandar('Registro '+estado+' exitosamente.');
          },(error) => {
            this.NotificacionService.alertError(error);
          }
        );
      }
    });
  }
}
