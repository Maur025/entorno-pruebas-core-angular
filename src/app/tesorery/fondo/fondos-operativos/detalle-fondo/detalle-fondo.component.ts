import { Component, Input, OnInit } from '@angular/core';
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FondoOperativoService } from "src/app/tesorery/services/tesoreria/fondo-operativo.service";
import { DetalleFondoOperativoService } from "src/app/tesorery/services/tesoreria/detalle-fondo-operativo.service";
import { Location } from '@angular/common';
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';

@Component({
  selector: 'app-detalle-fondo',
  templateUrl: './detalle-fondo.component.html',
  styleUrls: ['./detalle-fondo.component.scss']
})
export class DetalleFondoComponent extends FuncionesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Cuentas de Banco';
  titulo: string = 'Lista de Movimientos del Fondo Operativo'
  textoBuscar = 'Ingrese criterio de búsqueda: nro referencia';
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  nroSolicitud: any;
  fechaSolicitud: any;
  nombre: any;
  importe: any;
  descripcion: any;
  id: any;
  formato: any;
  fondo: any;

  constructor(
    private fondoOperativoService: FondoOperativoService,
    public detalleFontoOperativoService: DetalleFondoOperativoService,
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
        "createdAt": this.getOpcionesCabecera('Fecha Registro', 12),
        "fechaMovimiento": this.getOpcionesCabecera('Fecha Movimiento', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "centroCosto": this.getOpcionesCabecera('Centro de Costo', 6),
        "estadoFondo": this.getOpcionesCabecera('Estado Fondo', 12),
        "estadoContabilidad": this.getOpcionesCabecera('Estado Contabilidad', 6),
        "estado": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  setFondo() {
    this.fondoOperativoService.find(this.id).subscribe(data => {
      this.fondo = data.content
    }, (err: any) => {
      this.notificacionService.alertError(err);
    });
  }

  regresar() {
    this.location.back();
  }

  refrescar(){
    this.setFondo();
  }
}
