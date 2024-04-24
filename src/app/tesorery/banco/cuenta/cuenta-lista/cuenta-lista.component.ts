import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { CuentaFormularioComponent } from '../cuenta-formulario/cuenta-formulario.component';
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';

@Component({
  selector: 'app-cuenta-lista',
  templateUrl: './cuenta-lista.component.html',
  styleUrls: ['./cuenta-lista.component.scss']
})
export class CuentaListaComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormCuenta') appFormCuenta: CuentaFormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Cuentas de Banco';
  @Input() titulo = 'Lista de Cuentas de Banco'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  @Input() getAll = 'getAll';
  @Input() id;
  @Input() direccion = true;
  textoBuscar: string = 'Ingrese criterio de búsqueda: nro cuenta y descripción'
  editCreateWithModal = false;
  dataEdit = null;
  modalRef?: BsModalRef;
  formato: any;
  servicio = null;
  cuenta: any;

  constructor(
    public CuentaBancoService: CuentaBancoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    if (this.rel_prefix) this.servicio.setPrefix(this.rel_prefix);
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "nroCuenta": this.getOpcionesCabecera('Nro Cuenta', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        /* "banco": this.getOpcionesCabecera('Banco', 12), */
        "moneda": this.getOpcionesCabecera('Moneda', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "estadoContabilidad": this.getOpcionesCabecera('Estado Contabilidad', 6),
        "estado": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }


  crear(template: any) {
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  editar(data: any, template: any) {
    this.cuenta = data;
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.CuentaBancoService.habilitar(data.id).subscribe((data) => {
          let estado = '';
          component.obtenerDatos();
          texto == 'habilitar' ? estado = 'habilitado' : estado = 'inhabilitado';
          this.NotificacionService.successStandar('Registro ' + estado + ' exitosamente.');
        }, (error) => {
          this.NotificacionService.alertError(error);
        }
        );
      }
    });
  }

  eliminar(data: any, component) {
    this.NotificacionService.alertaEliminacion(data.nombre, (response: any) => {
      if (response) {
        this.servicio.delete(data.id).subscribe((data) => {
          component.obtenerDatos();
          this.NotificacionService.successStandar(
            "Registro eliminado exitosamente."
          );
        }, (error) => {
          this.NotificacionService.alertError(error);
        }
        );
      }
    });
  }

  cerrarModal() {
    this.modalService.hide();
  }

}
