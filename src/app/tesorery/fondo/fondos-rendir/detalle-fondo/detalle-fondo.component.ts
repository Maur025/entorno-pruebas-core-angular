import { Component, Input, OnInit } from '@angular/core';
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FondoRendirService } from "src/app/tesorery/services/tesoreria/fondo-rendir.service";
import { DetalleFondoRendirService } from "src/app/tesorery/services/tesoreria/detalle-fondo-rendir.service";
import { Location } from '@angular/common';
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';

@Component({
  selector: 'app-detalle-fondo',
  templateUrl: './detalle-fondo.component.html',
  styleUrls: ['./detalle-fondo.component.scss']
})
export class DetalleFondoRendirComponent extends FuncionesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Cuentas de Banco';
  titulo: string = 'Lista de Movimientos del Fondo Rendir'
  textoBuscar = 'Ingrese criterio de búsqueda: nro referencia';
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  id: any;
  formato: any;
  fondo: any;

  constructor(
    private fondoRendirService: FondoRendirService,
    public detalleFondoRendirService: DetalleFondoRendirService,
    private router: Router,
    private route: ActivatedRoute,
    private notificacionService: NotificacionService,
    private location: Location,
  ) {
    super();
  }

  ngOnInit(): void {
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
    if (this.route.snapshot.params["id"]) {
      this.id = this.route.snapshot.params["id"];
      this.setFondo();
    }
  }

  getCabeceras() {
    return {
      cabeceras: {
        /* "acciones": this.getOpcionesCabecera('Acciones', 12), */
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "nroReferencia": this.getOpcionesCabecera('Nro Referencia', 12),
        "fechaMovimiento": this.getOpcionesCabecera('Fecha Movimiento', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "centroCosto": this.getOpcionesCabecera('Centro de Costo', 6),
        "estadoFondo": this.getOpcionesCabecera('Estado Fondo', 12),
        "estado": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  setFondo() {
    this.fondoRendirService.find(this.id).subscribe(data => {
      this.fondo = data.content
    }, (err: any) => {
      this.notificacionService.alertError(err);
    });
  }

  regresar() {
    this.location.back();
  }
}
