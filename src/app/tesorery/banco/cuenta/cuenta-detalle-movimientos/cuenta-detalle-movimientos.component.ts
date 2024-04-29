import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FuncionesComponent } from "src/app/tesorery/funciones.component";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { MovimientoCuentaBancoService } from "src/app/tesorery/services/tesoreria/movientos-cuenta-banco.service";

@Component({
  selector: 'app-cuenta-detalle-movimientos',
  templateUrl: './cuenta-detalle-movimientos.component.html',
  styleUrls: ['./cuenta-detalle-movimientos.component.scss']
})
export class CuentaDetalleMovimientosComponent  extends FuncionesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Detalle Movimientos Cuenta Bancaria';
  @Input() titulo = 'Lista de Movimientos Cuenta Bancaria'
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  textoBuscar: string = 'Ingrese criterio de búsqueda: nro cuenta y descripción'
  formato: any;
  cuentaBancoId: any;
  cuentaBanco: any;

  constructor(
    public movimientoCuentaBancoService: MovimientoCuentaBancoService,
    private cuentaBancoService: CuentaBancoService,
    private modalService: BsModalService,
    private notificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true }];
    this.formato = this.getCabeceras();
    if (this.route.snapshot.params["cuentaBancoId"]) {
      this.cuentaBancoId = this.route.snapshot.params["cuentaBancoId"];
      this.getCuentaBanco();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
    }
  }

  getCabeceras() {
    return {
      cabeceras: {
        //"acciones": this.getOpcionesCabecera('Acciones', 12),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "fecha": this.getOpcionesCabecera('fecha', 12),
        "origen": this.getOpcionesCabecera('Origen', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "medioTransferencia": this.getOpcionesCabecera('Medio Transferencia', 6),
        "estadoContabilidad": this.getOpcionesCabecera('Estado Contabilidad', 6),
      }
    };
  }

  getCuentaBanco(){
    this.cuentaBancoService.find(this.cuentaBancoId).subscribe(data => {
      this.cuentaBanco = data.content;
      this.titulo = this.titulo +' Nro. '+ this.cuentaBanco.nroCuenta +', '+ this.cuentaBanco.banco.nombre;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }
}
