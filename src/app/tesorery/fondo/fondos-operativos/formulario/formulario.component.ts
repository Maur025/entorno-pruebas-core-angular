import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { FondoOperativoService } from "src/app/tesorery/services/tesoreria/fondo-operativo.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { CentrocostoService } from "src/app/tesorery/services/tesoreria/centrocosto.service";
import { DetalleFondoOperativoService } from "src/app/tesorery/services/tesoreria/detalle-fondo-operativo.service";
import { EstadosService } from "src/app/tesorery/services/tesoreria/estados.service";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { BsModalService } from "ngx-bootstrap/modal";
import { EsquemaService } from "src/app/tesorery/services/tesoreria/esquema.service";
import { EntidadService } from "src/app/tesorery/services/tesoreria/entidad.service";

@Component({
  selector: 'app-formulario-operativo',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioOperativoComponent implements OnInit {

  @Input() transaccion;
  @Input() esquemaId;

  @Input() fondo;
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
  listaResponsables: any;
  fechaMinima: any;
  montoPagar:any;

  constructor(
    private formBuilder: FormBuilder,
    private fondoOperativoService: FondoOperativoService,
    private entidadService: EntidadService,
    private estadosService: EstadosService,
    private detalleFontoOperativoService: DetalleFondoOperativoService,
    private centroCostosService: CentrocostoService,
    private notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
    public esquemasService: EsquemaService,
    private modalService: BsModalService
  ) {
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.initForm();
    this.fechaMinima = new Date();
    this.getEstados();
    this.getCentroCostos();
    this.getResponsables();
    if (this.fondo) this.setFondo();
    if (this.transaccion) this.setTransaccion();
    this.tipoDescargoForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [, []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      fechaSolicitud: [, [Validators.required]],
      nroSolicitud: [, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      importe: [, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      aperturado: [],
      descripcion: [, [Validators.required]],
      responsableId: [],
      responsable: [],
    });
  }

  tipoDescargoForm() {
    if (this.tipoDescargo) {
      if (this.tipoDescargo == 'APERT') {
        this.formGroup.disable();
        this.addFormApertura();
        this.montoPagar = this.fondo.importe;
      } else if (this.tipoDescargo == 'CIERR') {
        this.formGroup.disable();
        this.addFormDescargo();
        this.form.saldo.setValue(this.fondo.saldo);
        this.form.saldo.disable();
        this.montoPagar = this.fondo.saldo;
        if (this.fondo.saldo == 0) {
          this.formGroup.removeControl('centroCostoId');
          this.formGroup.removeControl('operaciones');
        } else {
          this.form.centroCostoId.enable();
        }
        this.formGroup.addControl('documento', new FormControl(null, Validators.required));
      } else {
        this.formGroup.disable();
        this.addFormDescargo();
        this.form.saldo.setValue(this.fondo.saldo);
        this.form.saldo.disable();
        this.form.centroCostoId.enable();
      }
      this.form.descripcion.setValue(null);
      this.form.descripcion.enable();
    }
  }

  addFormApertura() {
    this.formGroup.addControl('centroCostoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
    this.formGroup.addControl('operaciones', this.formBuilder.array([], [Validators.required]));
  }

  addFormDescargo() {
    this.formGroup.addControl('centroCostoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('saldo', new FormControl(null, Validators.required));
    if (this.tipoDescargo != 'CIERR') this.formGroup.addControl('monto', new FormControl(null, [Validators.required]));
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
    this.formGroup.addControl('operaciones', this.formBuilder.array([], [Validators.required]));
  }

  getCentroCostos() {
    this.centroCostosService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getEstados() {
    this.estadosService.habilitadosFondos().subscribe(data => {
      this.listaEstados = data.content;
      if (this.tipoDescargo) this.form.estado.setValue(this.listaEstados.find(e => e.codigo == this.tipoDescargo).id);
      this.cambioEstado();
    }, error => this.notificacionService.alertError(error));
  }

  getResponsables() {
    this.entidadService.getEntidadesByTipo("EMPLEADO").subscribe(data => {
      this.listaResponsables = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  cambioResponsable() {
    if (this.form.responsableId != null) {
      this.form.responsable.setValue(this.listaResponsables.find(e => e.id == this.form.responsableId.value).entidad.nombre);
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

  cambioMonto(){
    this.montoPagar = this.form.monto.value;
  }

  get form() {
    return this.formGroup.controls;
  }

  setFondo() {
    this.formGroup.patchValue({
      id: this.fondo.id,
      nombre: this.fondo.nombre,
      fechaSolicitud: new Date(this.fondo.fechaSolicitud),
      nroSolicitud: this.fondo.nroSolicitud,
      importe: this.fondo.importe,
      aperturado: this.fondo.aperturado,
      descripcion: this.fondo.descripcion,
      saldo: this.fondo.saldo,
      responsable: this.fondo.responsable,
      responsableId: this.fondo.responsableId,
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
    let data = this.formGroup.getRawValue();
    this.cambioEstado();
    if (this.formGroup.valid) {
      if (this.tipoDescargo) {
        data.nroReferencia = data.nroSolicitud;
        data.refId = null;
        data.fondoOperativoId = data.id;
        data.fechaMovimiento = data.fechaSolicitud;
        if (this.tipoDescargo == 'APERT') {
          data.monto = data.importe;
        } else if (this.tipoDescargo == 'CIERR') {
          data.monto = data.saldo;
        }
        this.detalleFontoOperativoService.register(data).subscribe(res => {
          this.notificacionService.successStandar('Movimiento de fondo operativo registrado exitosamente.');
          this.alActualizar.emit();
        }, error => this.notificacionService.alertError(error));
      } else {
        if (this.fondo && !this.transaccion) {
          this.fondoOperativoService.update(data).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, error => this.notificacionService.alertError(error));
        } else {
          this.fondoOperativoService.register(data).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, error => this.notificacionService.alertError(error));
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
