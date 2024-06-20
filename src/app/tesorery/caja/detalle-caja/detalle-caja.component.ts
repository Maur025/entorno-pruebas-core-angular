import { Component, Input, OnInit } from '@angular/core';
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FuncionesComponent } from '../../funciones.component';
import { MovimientoCajaService } from "src/app/tesorery/services/tesoreria/movimiento-caja.service";
import { Location } from '@angular/common';
import { CajaService } from "src/app/tesorery/services/tesoreria/caja.service";

@Component({
  selector: 'app-detalle-caja',
  templateUrl: './detalle-caja.component.html',
  styleUrls: ['./detalle-caja.component.scss']
})
export class DetalleCajaComponent extends FuncionesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Detalle Movimientos Caja';
  titulo: string = 'Lista de Movimientos de Caja'
  textoBuscar = 'Ingrese criterio de búsqueda: nro referencia';
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  id: any;
  formato: any;
  caja: any;

  constructor(
    private cajaService: CajaService,
    public movimientoCajaService: MovimientoCajaService,
    private route: ActivatedRoute,
    private notificacionService: NotificacionService,
    private location: Location,
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
    if (this.route.snapshot.params["cajaId"]) {
      this.id = this.route.snapshot.params["cajaId"];
      this.setCaja();
    }
  }

  getCabeceras() {
    return {
      cabeceras: {
        /* "acciones": this.getOpcionesCabecera('Acciones', 12), */
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "nroReferencia": this.getOpcionesCabecera('Nro Referencia', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "createdAt": this.getOpcionesCabecera('Fecha Registro', 12),
        "fecha": this.getOpcionesCabecera('Fecha Movimiento', 12),
        "origen": this.getOpcionesCabecera('Origen', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "estadoCaja": this.getOpcionesCabecera('Estado Caja', 12),
        "estadoContabilidad": this.getOpcionesCabecera('Estado Contabilidad', 6),
        "estado": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  setCaja() {
    this.cajaService.find(this.id).subscribe(data => {
      this.caja = data.content
    }, (err: any) => {
      this.notificacionService.alertError(err);
    });
  }

  regresar() {
    this.location.back();
  }

  refrescar(){
    this.setCaja();
  }
}
