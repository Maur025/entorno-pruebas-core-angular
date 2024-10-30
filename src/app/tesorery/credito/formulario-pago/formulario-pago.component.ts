import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { TipoPagoContadoService } from '../../services/tesoreria/tipo-pago-contado.service';
import { FondoOperativoService } from '../../services/tesoreria/fondo-operativo.service';
import { CuentaBancoService } from '../../services/tesoreria/cuenta-banco.service';
import { MedioTransferenciaService } from '../../services/tesoreria/medio-transferencia.service';
import { BancoService } from '../../services/tesoreria/banco.service';
import { TipoDocumentoService } from '../../services/tesoreria/tipo-documento.service';
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { DetalleCreditoService } from '../../services/tesoreria/detalle-credito.service';

@Component({
  selector: 'app-formulario-pago',
  templateUrl: './formulario-pago.component.html',
  styleUrls: ['./formulario-pago.component.scss']
})
export class FormularioPagoComponent implements OnInit {

  @Output() alGuardar = new EventEmitter<any>();
  @Input() detalleCredito;
  cuentaBanco: any;
  nombreBanco = "";
  formPagoCredito: FormGroup;
  tipoPagoContadoList: any;
  cajaBanco: any;
  cajaTipoPago: any;
  bancoTipoPago: any;
  fondosOperativosList: any;
  bancosList: any;
  medioTransferenciasList: any;
  tipoDocumentosList: any;
  cuentasBancoList: any;
  fondoOperativo: any;
  banco: any;
  submitted = false;
  cargandoContenido = false;

  constructor(
    private formBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private tipoPagoContadoService: TipoPagoContadoService,
    private fondoOperativoService: FondoOperativoService,
    private bancoService: BancoService,
    private cuentaBancoService: CuentaBancoService,
    private medioTransferenciaService: MedioTransferenciaService,
    private tipoDocumentoService: TipoDocumentoService,
    private detalleCreditoService: DetalleCreditoService,
    private _localeService: BsLocaleService,
  ) {
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.cargandoContenido = true;
    this.setForm();
    this.getTipoPagoContado();
    this.getBancos();
    this.getFondos();
    this.getMedioTransferencias();
    this.getTipoDocumentos();
  }

  setForm() {
    this.formPagoCredito = this.formBuilder.group({
      id: [''],
      tipoPago: [],
      bancoId: [, [Validators.required]],
      cuentaBancoId: [, [Validators.required]],
      fondoOperativoId: [, [Validators.required]],
      aplicacionAnticipoId: [],
      detalleDevengadoId: [],
      detalleCreditoId: [this.detalleCredito.id,],
      tipoDocumentoId: [, [Validators.required]],
      medioTransferenciaId: [, [Validators.required]],
      numero: [, [Validators.required]],
      descripcionPagado: [, [Validators.required]],
      montoPagado: [, [Validators.required, Validators.max(this.detalleCredito.monto - (this.detalleCredito.montoPagado ? this.detalleCredito.montoPagado : 0)), Validators.pattern('^[0-9]+(.[0-9]*)?$')]],
      fechaPagado: [, [Validators.required]]
    });
  }

  get form() {
    return this.formPagoCredito.controls;
  }

  getTipoPagoContado() {
    this.tipoPagoContadoService.habilitados().subscribe(data => {
      this.tipoPagoContadoList = data.content;
      this.cajaTipoPago = data.content.find(c => c.codigo == 'C');
      this.bancoTipoPago = data.content.find(b => b.codigo == 'B');
      this.cajaBanco = this.bancoTipoPago.codigo;
      this.cambioTipoPago();
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getFondos() {
    this.fondoOperativoService.habilitados().subscribe(data => {
      this.fondosOperativosList = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getBancos() {
    this.bancoService.habilitados().subscribe(data => {
      this.bancosList = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getMedioTransferencias() {
    this.medioTransferenciaService.habilitados().subscribe(data => {
      this.medioTransferenciasList = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getTipoDocumentos() {
    this.tipoDocumentoService.habilitados().subscribe(data => {
      this.tipoDocumentosList = data.content;
      this.cargandoContenido = false;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  cambioBanco() {
    this.banco = this.bancosList.find(b => b.id == this.form.bancoId.value);
    this.cuentasBancoList = [];
    this.cuentaBanco = undefined;
    this.form.cuentaBancoId.setValue(null);
    if (this.form.bancoId.value != null) {
      this.cuentaBancoService.getCuentasBanco(1000, 1, 'id', false, '', this.form.bancoId.value).subscribe(data => {
        this.cuentasBancoList = data.content;
      }, (error) => {
        this.notificacionService.alertError(error);
      });
    } else {
      this.cuentasBancoList = [];
      this.form.cuentaBancoId.setValue(null);
    }
  }

  cambioCuentaBanco() {
    if (this.form.cuentaBancoId.value != null) {
      this.cuentaBanco = this.cuentasBancoList.find(cb => cb.id == this.form.cuentaBancoId.value);
    } else {
      this.cuentaBanco = undefined;
    }
  }

  cambioCaja() {
    if (this.form.fondoOperativoId.value != null) {
      this.fondoOperativo = this.fondosOperativosList.find(f => f.id == this.form.fondoOperativoId.value);
    } else {
      this.fondoOperativo = undefined;
    }
  }

  cambioTipoPago() {
    if (this.cajaBanco == 'B') {
      this.form.fondoOperativoId.clearValidators();
      this.form.fondoOperativoId.setValue(null);
      this.form.bancoId.setValidators([Validators.required]);
      this.form.cuentaBancoId.setValidators([Validators.required]);
    } else {
      this.form.fondoOperativoId.setValidators([Validators.required]);
      this.form.bancoId.clearValidators();
      this.form.cuentaBancoId.clearValidators();
      this.form.bancoId.setValue(null);
      this.form.cuentaBancoId.setValue(null);
    }
    this.form.fondoOperativoId.updateValueAndValidity();
    this.form.bancoId.updateValueAndValidity();
    this.form.cuentaBancoId.updateValueAndValidity();
  }

  guardar() {
    this.submitted = true;
    if (this.formPagoCredito.valid) {
      this.detalleCreditoService.pagoCredito(this.formPagoCredito.getRawValue()).subscribe(data => {
        this.alGuardar.emit(data);
        this.notificacionService.successStandar("Pago registrado exitosamente");
      }, (error) => {
        this.notificacionService.alertError(error);
      });
    }
  }
}

