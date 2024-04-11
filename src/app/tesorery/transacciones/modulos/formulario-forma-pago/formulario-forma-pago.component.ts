import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ProveedorService } from 'src/app/tesorery/services/compras/proveedor.service';
import { EsquemaService } from 'src/app/tesorery/services/tesoreria/esquema.service';
import { MedioTransferenciaService } from 'src/app/tesorery/services/tesoreria/medio-transferencia.service';
import { TipoPagoContadoService } from 'src/app/tesorery/services/tesoreria/tipo-pago-contado.service';
import { TransaccionesComprasService } from 'src/app/tesorery/services/tesoreria/transaccionesCompras.service';

@Component({
  selector: 'app-formulario-forma-pago',
  templateUrl: './formulario-forma-pago.component.html',
  styleUrls: ['./formulario-forma-pago.component.scss']
})
export class FormularioFormaPagoComponent implements OnInit {

  @Output() alProcesar = new EventEmitter<any>();
  @Input() esquema;
  formFormasPago: UntypedFormGroup;
  transaccion: any;
  viewPlan = false;
  viewMedio = false;
  viewAnticipo = false;
  planPago: any;
  contado: any;
  creditos: any;
  anticipos: any;
  contadoList = [];
  creditoList = [];
  anticipoList = [];
  proveedoresList: any;
  medioTransferenciaList: any;
  tipoPagoContadoList: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private notificacion: NotificacionService,
    public transaccionesComprasService: TransaccionesComprasService,
    public proveedorService: ProveedorService,
    public medioTransferenciaService: MedioTransferenciaService,
    public tipoPagoContadoService: TipoPagoContadoService,
    public esquemaService: EsquemaService,
  ) { }

  ngOnInit(): void {
    console.log(this.esquema)
    this.transaccion = this.esquema.transaccionKafka.datos;
    this.getProveedores();
    this.getMediosTransferencia();
    this.getTipoPagoContado();
    this.verificarPlanPagoMedio();
  }

  getProveedores() {
    this.proveedorService.habilitados().subscribe(data => {
      this.proveedoresList = data.content;
    }, error => this.notificacion.alertError(error));
  }

  getMediosTransferencia() {
    this.medioTransferenciaService.habilitados().subscribe(data => {
      this.medioTransferenciaList = data.content;
    }, error => this.notificacion.alertError(error));
  }

  getTipoPagoContado(){
    this.tipoPagoContadoService.habilitados().subscribe(data => {
      this.tipoPagoContadoList = data.content;
    }, error => this.notificacion.alertError(error));
  }

  verificarPlanPagoMedio() {
    this.contadoList = [];
    this.creditoList = [];
    this.anticipoList = [];
    if (this.esquema.transaccionKafka.datos.formaPagos.length > 0) {
      this.esquema.transaccionKafka.datos.formaPagos.forEach(fp => {
        if (fp.tipoFormaPago == 'CONT') {
          this.contado = true;
          this.contadoList.push(fp);
        }
        if (fp.tipoFormaPago == 'CRED') {
          this.creditos = true;
          this.creditoList.push(fp);
        }
        if (fp.tipoFormaPago == 'ANTI') {
          this.anticipos = true;
          this.anticipoList.push(fp);
        }
      });
    }
  }

  verPlanPago(planPago) {
    this.planPago = planPago;
    this.viewAnticipo = false;
    planPago.forEach(pp => {
      if (pp.anticipoId != null) this.viewAnticipo = true;
    });
  }

  guardar() {
    this.transaccionesComprasService.getFormaPago({ transaccionKafkaId: this.esquema.transaccionKafkaId }).subscribe(data => {
      this.esquemaService.updateNextEstadoIntegracion(this.esquema.id).subscribe(data => {
        this.alProcesar.emit();
        this.notificacion.successStandar("Se registro la transaccion exitosamente");
      })
    }, error => this.notificacion.alertError(error));
  }


}
