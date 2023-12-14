import { Component, Input, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BancoService } from "../servicios/banco.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";


type NewType = NotificacionService;

@Component({
  selector: "app-listado-banco",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.scss"],
})
export class ListadoComponent implements OnInit {

  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;

  //migas de pan
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Gestion de Bancos';
  titulo: any = "Bancos";

  editCreateWithModal = false;
  dataEdit = null;
  modalRef?: BsModalRef;
  formato: any;
  servicio = null;






  constructor(
    public BancoService: BancoService,

    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.servicio = BancoService;
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
        this.router.navigate(['./' + data.id, {}], { relativeTo: this.route });
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

  getCabecera() {
    return {
      cabeceras: {
        "id": this.getFielFilter('id', 12, 'number', false),
        "nombre": this.getFielFilter('Nombre', 12),
        "descripcion": this.getFielFilter('Descripción', 6),
        "direccion": this.getFielFilter('Dirección', 6),
        "url": this.getFielFilter('Url', 6, 'true', true)
      }
    };
  }
  
  getFielFilter(texto: string, colsize: number, filtrotipo: string = 'text', visible: boolean = true) {
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

 

}
