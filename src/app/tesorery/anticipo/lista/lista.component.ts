import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnticipoService } from '../../services/tesoreria/anticipo.service';
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormAnticipo') appFormAnticipo: FormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Anticipos';
  titulo: string = 'Lista Anticipos Proveedor'
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
  anticipo: any;
  anticipoData: any;

  constructor(
    public AnticipoService: AnticipoService,
    public modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    if (this.rel_prefix) this.servicio.setPrefix(this.rel_prefix);
    this.formato = this.cabecera();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(template: any) {
    this.anticipo = false;
    this.anticipoData = undefined;
    this.modalRef = this.modalService.show(template, { class: `modal-xl modal-dialog-scrollable` });
  }

  cabecera = () => {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "id": this.getOpcionesCabecera('ID', 0, 'text', false),
        "centroCosto": this.getOpcionesCabecera('Centro Costo', 12, 'text', true, true),
        "entidadReferencial": this.getOpcionesCabecera('Proveedor', 12, 'text', true, true),
        "nroReferencia": this.getOpcionesCabecera('Nro Referencia', 12, 'text', true, true),
        "fecha": this.getOpcionesCabecera('Fecha', 12, 'text', true, true),
        "monto": this.getOpcionesCabecera('Monto', 12, 'text', true, true),
        "saldo": this.getOpcionesCabecera('Saldo', 12, 'text', true, true),
        "estado": this.getOpcionesCabecera('Estado', 12, 'text', true, false)
      }
    }
  }

  verDetalleAnticipo(id) {
    this.router.navigate(['anticipo', id, 'aplicacion']);
  }

  eliminar(data: any, component) {
    this.NotificacionService.alertaEliminacion(data.nombre, (response: any) => {
      if (response) {
        this.servicio.delete(data.id).subscribe((data) => {
          component.obtenerDatos();
          this.NotificacionService.successStandar("Registro eliminado exitosamente.");
        }, (error) => {
          this.NotificacionService.alertError(error);
        }
        );
      }
    });
  }

  aplicacionAnticipo(data: any, template: any) {
    //this.fondo = data;
    this.anticipo = true;
    this.anticipoData = data;
    this.titleModal = 'Movimiento';
    this.modalRef = this.modalService.show(template, { class: `modal-xl modal-scrollable` });
  }

  cerrarModal() {
    this.modalService.hide();
    this.titleModal = '';
  }
}
