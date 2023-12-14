import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CuentaBancoService } from "src/app/tesorery/services/cuenta-banco.service";
/* mis importaciones*/

@Component({
  selector: 'app-cuenta-lista',
  templateUrl: './cuenta-lista.component.html',
  styleUrls: ['./cuenta-lista.component.scss']
})
export class CuentaListaComponent {

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Cuentas de Banco';
  titulo: string = 'Cuentas de Banco'

  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;

  editCreateWithModal = false;
  dataEdit = null;
  modalRef?: BsModalRef;
  formato: any;
  servicio = null;

  constructor(
    public CuentaBancoService: CuentaBancoService,

    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.servicio = CuentaBancoService;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];

    if (this.rel_prefix) this.servicio.setPrefix(this.rel_prefix);
    this.formato = this.getCabecera();

    if (this.rel_prefix && this.rel_field) {
      this.formato.cabeceras[this.rel_field].visible = false;
      this.formato.cabeceras[this.rel_field].visibleCheck = false;
    }
  }




  crear(data: any, template: any) {
    if (this.editCreateWithModal) {
      this.openModal(null, template);
    } else {
      if (this.rel_prefix == null) {
        this.router.navigate(['./nuevo', {}], { relativeTo: this.route });
      }
      else {
        this.openModal(null, template);
      }
    }
  }

  editar(data: any, template: any) {
    if (this.editCreateWithModal) {
      this.openModal(data, template);
    } else {
      if (this.rel_prefix == null) {
        this.router.navigate(['./id/' + data.id, {}], { relativeTo: this.route });
      }
      else {
        this.openModal(data, template);
      }
    }

  }

  habilitar(data: any, component) {
    this.servicio.habilitar(data, data.id).subscribe(
      (data) => {
        component.obtenerDatos();
        this.NotificacionService.successStandar(
          "Registro habilitado exitosamente."
        );
      },
      (error) => {
        this.NotificacionService.alertError(error);
      }
    );
  }

  deshabilitar(data: any, component) {
    this.servicio.deshabilitar(data, data.id).subscribe(
      (data) => {
        component.obtenerDatos();
        this.NotificacionService.successStandar(
          "Registro deshabilitado exitosamente."
        );
      },
      (error) => {
        this.NotificacionService.alertError(error);
      }
    );
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

  openModal(data, template) {
    this.dataEdit = data;
    this.modalRef = this.modalService.show(template, {
      class: `modal-lg modal-fullscreen-lg-down modal-dialog-centered`,
    });
    return;
  }

  /**
   * 
   * @param data 
   * @returns 
   * {
      "nroCuenta",
      "descripcion",
      "bancoId",
      "monedaId"
    }
 */
  getCabecera() {
    let jsonMoneda = this.getFielFilter('Moneda', 6);
    jsonMoneda.mascara = {
      campo:"moneda",
      valor:"nombre"
    };
    let jsonBanco = this.getFielFilter('Banco', 6);
    jsonBanco.mascara = {
      campo:"banco",
      valor: "nombre"
    } 

    
    return {
      cabeceras: {
        "id": this.getFielFilter('id', 12, 'number', false),
        "nroCuenta": this.getFielFilter('Nro de cuenta', 12),
        "descripcion": this.getFielFilter('Descripción', 6),
        "bancoId": jsonBanco,
        "monedaId": jsonMoneda
      }
    };
  }

  getFielFilter(texto: string, colsize: number, filtrotipo: string = 'text', visible: boolean = true): any {
    let json = JSON.parse("{}");
    json.visible=visible;
    json.buscable= true;
    json.buscableCheck= true;
    json.visibleCheck= visible;
    json.sortable= true;
    json.filtrable= true;
    json.texto= texto;
    json.colsize= colsize;
    json.filtrotipo= filtrotipo;
    return json;
  }


}
