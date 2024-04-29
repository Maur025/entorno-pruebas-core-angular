import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BancoService } from "../../services/tesoreria/banco.service";
import { FormularioComponent } from '../formulario/formulario.component';
import { CuentaFormularioComponent } from '../cuenta/cuenta-formulario/cuenta-formulario.component';
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit {

  @ViewChild('appFormBanco') appFormBanco: FormularioComponent;
  @ViewChild('appFormCuenta') appFormCuenta: CuentaFormularioComponent;
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Bancos';
  titulo: string = 'Lista de Bancos';
  textoBuscar = 'Ingrese criterio de busqueda: nombre, sigla, descripcion, dirección y url'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  editCreateWithModal = false;
  dataEdit = null;
  modalRef?: BsModalRef;
  formato: any;
  servicio = null;
  banco: any;
  modalForm: any;
  esModal: any;
  titleModal: any;

  constructor(
    public BancoService: BancoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.servicio = BancoService;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "nombre": this.getOpcionesCabecera('Nombre', 12),
        "sigla": this.getOpcionesCabecera('Sigla', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "telefono": this.getOpcionesCabecera('Teléfono', 6),
        "direccion": this.getOpcionesCabecera('Dirección', 6),
        "url": this.getOpcionesCabecera('Correo Electrónico', 12),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  crear(template: any) {
    this.titleModal = 'Nuevo';
    this.banco = undefined;
    this.modalRef = this.modalService.show(template, { class: `modal-xl modal-scrollable` });
  }

  editar(template: any, data: any) {
    this.titleModal = 'Editar';
    this.banco = data;
    this.modalRef = this.modalService.show(template, { class: `modal-xl modal-scrollable` });
    //this.router.navigate(['./id/' + data.id, {}], { relativeTo: this.route });
  }

  crearCuenta(template: any, data: any) {
    this.banco = data;
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  verCuentas(data: any) {
    this.router.navigate(['./' + data.id+'/cuentas/', {}], { relativeTo: this.route });
  }

  habilitar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.BancoService.habilitar(data.id).subscribe((data) => {
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
