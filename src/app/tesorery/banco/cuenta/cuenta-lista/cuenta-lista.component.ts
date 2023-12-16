import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CuentaBancoService } from "src/app/tesorery/services/cuenta-banco.service";
import { CuentaFormularioComponent } from '../cuenta-formulario/cuenta-formulario.component';

@Component({
  selector: 'app-cuenta-lista',
  templateUrl: './cuenta-lista.component.html',
  styleUrls: ['./cuenta-lista.component.scss']
})
export class CuentaListaComponent {

  @ViewChild('appFormCuenta') appFormCuenta: CuentaFormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Cuentas de Banco';
  titulo: string = 'Cuentas de Banco'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  @Input() getAll = 'getAll';
  @Input() id;
  @Input() direccion = true;



  editCreateWithModal = false;
  dataEdit = null;
  modalRef?: BsModalRef;
  formato: any;
  servicio = null;
  cuenta:any;

  constructor(
    public CuentaBancoService: CuentaBancoService,
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
        "nroCuenta":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Nro Cuenta","colsize":"12","filtrotipo":"number"},
        "banco":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Banco","colsize":"12","filtrotipo":"text"},
        "moneda":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Moneda","colsize":"12","filtrotipo":"text"},
        "estado":{"visible":true,"buscable":true,"buscableCheck":true,"visibleCheck":true,"sortable":true,"filtrable":true,"texto":"Estado","colsize":"12","filtrotipo":"text"},
      }
    };
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false;this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  crear(template: any) {
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  editar(data: any, template: any) {
    this.cuenta = data;
    this.modalRef = this.modalService.show(template, {class: `modal-lg modal-scrollable`});
  }

  habilitar(data: any, component, texto) {
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
  }

}
