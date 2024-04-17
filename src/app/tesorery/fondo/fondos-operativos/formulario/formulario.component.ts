import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { FondoOperativoService } from "src/app/tesorery/services/tesoreria/fondo-operativo.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { CentrocostoService } from "src/app/tesorery/services/tesoreria/centrocosto.service";
import { BancoService } from "src/app/tesorery/services/tesoreria/banco.service";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { MovimientoCuentaBancoService } from "src/app/tesorery/services/tesoreria/movientos-cuenta-banco.service";
import { MedioTransferenciaService } from "src/app/tesorery/services/tesoreria/medio-transferencia.service";
import { DetalleFondoOperativoService } from "src/app/tesorery/services/tesoreria/detalle-fondo-operativo.service";
import { EstadosService } from "src/app/tesorery/services/tesoreria/estados.service";
import { forkJoin } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { BsModalService } from "ngx-bootstrap/modal";
import { EsquemaService } from "src/app/tesorery/services/tesoreria/esquema.service";

@Component({
  selector: 'app-formulario-operativo',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioOperativoComponent implements OnInit {

  @Input() transaccion;
  @Input() esquemaId;

  @Input() fondo;
  @Input() apertura;
  @Input() descargo;
  @Input() tipoDescargo;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Output() alProcesar = new EventEmitter<any>();
  formGroup: FormGroup;
  submitted = false;
  listaCentroCostos: any;
  listaBancos: any;
  listaCuentasBanco: any;
  listaMedioTransferencias: any;
  listaEstados: any;
  fechaMinima: any;
  saldo: any;

  constructor(
    private FormBuilder: FormBuilder,
    private fondoOperativoService: FondoOperativoService,
    private bancoService: BancoService,
    private estadosService: EstadosService,
    private movimientoCuentaBancoService: MovimientoCuentaBancoService,
    private medioTransferenciaService: MedioTransferenciaService,
    private detalleFontoOperativoService: DetalleFondoOperativoService,
    private centroCostosService: CentrocostoService,
    private cuentaBancoService: CuentaBancoService,
    private notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
    public esquemasService: EsquemaService,
    private modalService: BsModalService
  ) {
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.setForm();
    this.fechaMinima = new Date();
    if (this.fondo) {
      this.setFondo();
      this.getEstados();
      this.getCentroCostos();
      if (this.apertura) {
        this.getBancos();
        this.getMedioTransferencias();
        this.formGroup.disable();
        this.addFormApertura();
      } else if (this.descargo) {
        this.formGroup.disable();
        this.addFormDescargo();
        this.saldo = this.fondo.saldo;
      }
      if (this.transaccion) this.setTransaccion();
    }
  }

  setForm() {
    this.formGroup = this.FormBuilder.group({
      id: [, []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      fechaSolicitud: [, [Validators.required]],
      nroSolicitud: [, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      importe: [, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      aperturado: [],
      descripcion: [],
    });
  }


  addFormApertura() {
    this.formGroup.addControl('centroCostoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('bancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('cuentaBancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('medioTransferenciaId', new FormControl(null, Validators.required));
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
  }

  addFormDescargo() {
    this.formGroup.addControl('monto', new FormControl(null, [Validators.required]));
    this.formGroup.addControl('centroCostoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('fechaMovimiento', new FormControl(null, [Validators.required, this.validatorFecha(), this.validatorFechaMovimiento()]));
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
  }

  getCentroCostos() {
    this.centroCostosService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getBancos() {
    this.bancoService.habilitados().subscribe(data => {
      this.listaBancos = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getMedioTransferencias() {
    this.medioTransferenciaService.habilitados().subscribe(data => {
      this.listaMedioTransferencias = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getEstados() {
    this.estadosService.habilitadosFondos().subscribe(data => {
      this.listaEstados = data.content;
      if (this.apertura || this.descargo) this.form.estado.setValue(this.listaEstados.find(e => e.codigo == this.tipoDescargo).id);
      this.cambioEstado();
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  cambioBanco() {
    this.listaCuentasBanco = [];
    this.form.cuentaBancoId.setValue(null);
    if (this.form.bancoId.value != null) {
      this.cuentaBancoService.getCuentasBanco(1000, 1, 'id', false, '', this.form.bancoId.value).subscribe(data => {
        this.listaCuentasBanco = data.content;
      }, (error) => {
        this.notificacionService.alertError(error);
      });
    } else {
      this.listaCuentasBanco = [];
      this.form.cuentaBancoId.setValue(null);
    }
  }

  cambioEstado() {
    if (this.fondo && this.form.monto) {
      if (this.form.monto == undefined) {
        this.form.monto.setValidators([Validators.required]);
      } else {
        let estado = this.listaEstados.find(({ id }) => id === this.form.estado.value);
        switch (estado.codigo) {
          case "REND":
            this.form.monto.setValidators([Validators.required, Validators.min(1)]);
            break;
          case "REP":
            this.form.monto.setValidators([Validators.required, this.validatorMontoReposicion(this.fondo.importe - this.fondo.saldo), Validators.min(1)]);
            break;
          case "DEV":
            this.form.monto.setValidators([Validators.required, Validators.max(this.fondo.saldo), Validators.min(1)]);
            break;
        }
      }
      this.form.monto.updateValueAndValidity()
    }
  }

  get form() {
    return this.formGroup.controls;
  }

  setFondo() {
    this.formGroup.setValue({
      id: this.fondo.id,
      nombre: this.fondo.nombre,
      fechaSolicitud: new Date(this.fondo.fechaSolicitud),
      nroSolicitud: this.fondo.nroSolicitud,
      importe: this.fondo.importe,
      aperturado: this.fondo.aperturado,
      descripcion: this.fondo.descripcion,
    });
  }

  setTransaccion() {
    let fecha = this.transaccion.fechaMovimiento.substring(5, 7) + '-' + this.transaccion.fechaMovimiento.substring(8, 10) + '-' + this.transaccion.fechaMovimiento.substring(0, 4);
    this.formGroup.patchValue({
      monto: this.transaccion.monto,
      centroCostoId: this.transaccion.centroCostoId,
      fechaMovimiento: new Date(fecha),
      estado: this.transaccion.estado,
    });
    this.formGroup.disable();
    this.form.fechaMovimiento.enable();
  }

  public guardar() {
    this.submitted = true;
    this.cambioEstado();
    if (this.formGroup.valid) {
      if (this.descargo) {
        let data = this.formGroup.getRawValue();
        data.nroReferencia = data.nroSolicitud;
        data.refId = null;
        data.fondoOperativoId = data.id;
        this.detalleFontoOperativoService.register(data).subscribe(data => {
          this.notificacionService.successStandar();
          if (this.transaccion && this.esquemaId) {
            this.esquemasService.updateNextEstadoIntegracion(this.esquemaId).subscribe(data => {
              this.alProcesar.emit();
              this.cerrarModal();
            }, error => this.notificacionService.alertError(error));
          }
          this.alActualizar.emit();
        }, (error) => {
          this.notificacionService.alertError(error);
        });
      } else if (this.apertura) {
        let data = this.formGroup.getRawValue();
        data.monto = data.importe;
        data.saldo = data.importe;
        data.fecha = data.fechaSolicitud;
        data.nroReferencia = data.nroSolicitud;
        data.origen = 'FONDO OPERATIVO';
        data.aperturado = true;
        data.fechaMovimiento = data.fechaSolicitud;
        data.refId = null;
        data.fondoOperativoId = data.id;
        forkJoin([
          this.movimientoCuentaBancoService.register(data),
          this.detalleFontoOperativoService.register(data),
          this.fondoOperativoService.update(data)
        ]).subscribe((responses) => {
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        }, (error) => {
          this.notificacionService.alertError(error);
        });
      } else {
        if (this.fondo && !this.transaccion) {
          this.fondoOperativoService.update(this.formGroup.getRawValue()).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, (error) => {
            this.notificacionService.alertError(error);
          });
        } else {
          this.fondoOperativoService.register(this.formGroup.getRawValue()).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, (error) => {
            this.notificacionService.alertError(error);
          });
        }
      }
    }
  }

  public validatorFecha() {
    return (control: AbstractControl): any => {
      let errores = 'invalido';
      let diaActual = (new Date());
      diaActual.setHours(0, 0, 0, 0);
      if (control.value && control.value > diaActual || JSON.stringify(control.value) == JSON.stringify(diaActual)) errores = 'valido';
      if (control.value && errores == 'invalido') return { fechaInvalida: "INVALID" }
      else return null;
    }
  }

  validatorMontoReposicion(monto) {
    return (control: AbstractControl): any => {
      let errores = 'invalido';
      if (control.value && control.value <= monto) errores = 'valido';
      if (control.value && errores == 'invalido') return { montoReposicion: "INVALID" }
      else return null;
    }
  }

  validatorFechaMovimiento() {
    return (control: AbstractControl): any => {
      let errores = 'invalido';
      if (control.value && (new Date(control.value) >= new Date(this.fondo.fechaSolicitud))) errores = 'valido';
      if (control.value && errores == 'invalido') return { fechaMovimientoInvalida: "INVALID" }
      else return null;
    }
  }

  cerrarModal() {
    this.modalService.hide();
  }

}
