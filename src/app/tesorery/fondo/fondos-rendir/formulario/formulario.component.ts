import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FondoRendirService } from "src/app/tesorery/services/tesoreria/fondo-rendir.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { CentrocostoService } from "src/app/tesorery/services/tesoreria/centrocosto.service";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { MovimientoCuentaBancoService } from "src/app/tesorery/services/tesoreria/movientos-cuenta-banco.service";
import { DetalleFondoRendirService } from "src/app/tesorery/services/tesoreria/detalle-fondo-rendir.service";
import { EntidadService } from "src/app/tesorery/services/tesoreria/entidad.service";
import { EstadosService } from "src/app/tesorery/services/tesoreria/estados.service";
import { forkJoin } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { EsquemaService } from "src/app/tesorery/services/tesoreria/esquema.service";

@Component({
  selector: 'app-formulario-rendir',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioRendirComponent implements OnInit {

  @Input() esquema;
  @Input() transaccion;
  @Input() fondo;
  @Input() tipoDescargo;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Output() alProcesar = new EventEmitter<any>();
  formGroup: FormGroup;
  submitted = false;
  listaCentroCostos: any;
  listaBancos: any;
  listaResponsables: any;
  listaCuentasBanco: any;
  listaMedioTransferencias: any;
  listaEstados: any;
  fechaActual: any;
  creditoForm = [];
  montoPagar: any;
  montoExcedentePagar: any;
  importeTotalCredito = 0
  isDevolucion: any;
  isPlanPagos: any;

  constructor(
    private formBuilder: FormBuilder,
    private fondoRendirService: FondoRendirService,
    private entidadService: EntidadService,
    private estadosService: EstadosService,
    private esquemaService: EsquemaService,
    private movimientoCuentaBancoService: MovimientoCuentaBancoService,
    private detalleFondoRendirService: DetalleFondoRendirService,
    private centroCostosService: CentrocostoService,
    private cuentaBancoService: CuentaBancoService,
    private notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
  ) {
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.initForm();
    this.getResponsables();
    this.getCentroCostos();
    this.getEstados();
    if (this.fondo) this.setFondo();
    if (this.esquema) this.setTransaccion();
    this.fechaActual = new Date();
    this.fechaActual.setHours(0, 0, 0, 0);
    this.tipoDescargoForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [, []],
      fechaSolicitud: [, [Validators.required]],
      nroSolicitud: [, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      importe: [, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      aperturado: [],
      descripcion: [],
      responsableId: [, [Validators.required]],
      centroCostoId: [, [Validators.required]]
    });
  }

  tipoDescargoForm() {
    if (this.tipoDescargo) {
      if (this.tipoDescargo == 'DESE') {
        this.addFormDesembolso();
      } else {
        this.formGroup.disable();
        this.addFormDescargo();
        this.form.descripcion.setValue(null);
        this.form.descripcion.enable();
        this.form.saldo.setValue(this.fondo.saldo);
        this.form.saldo.disable();
        if (this.tipoDescargo == 'CIERR') {
          if (this.fondo.saldo < 0) {
            this.form.monto.setValue(this.form.saldo.value * -1);
            this.montoExcedentePagar = this.form.monto.value;
            this.form.monto.disable();
          } else if (this.fondo.saldo >= 0) {
            this.form.monto.setValue(this.form.saldo.value);
            this.montoPagar = this.form.monto.value;
            this.form.monto.disable();
          }
        }
      }
    }
  }

  addFormDesembolso() {
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
    this.formGroup.addControl('operaciones', this.formBuilder.array([], [Validators.required]));
  }

  addFormDescargo() {
    if (this.tipoDescargo == 'DEVO') {
      this.formGroup.addControl('monto', new FormControl(null, [Validators.required, Validators.min(1), this.validatorMontoDevolucion(this.fondo.saldo)]));
    } else if (this.tipoDescargo == 'CIERR') {
      this.formGroup.addControl('monto', new FormControl(null, [Validators.required, Validators.min(1)]));
    }
    this.formGroup.addControl('saldo', new FormControl(null, [Validators.required]));
    //this.formGroup.addControl('fechaMovimiento', new FormControl(null, [Validators.required, this.validatorFecha()]));
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
    if (this.fondo.saldo > 0) this.formGroup.addControl('operaciones', this.formBuilder.array([], [Validators.required]));
    if (this.fondo.saldo < 0 && this.tipoDescargo == 'CIERR') this.formGroup.addControl('planPagos', this.formBuilder.array([], [Validators.required]));
    this.form.descripcion.setValidators([Validators.required]);
  }

  getCentroCostos() {
    this.centroCostosService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getResponsables() {
    this.entidadService.getTipoEntidad().subscribe(data => {
      let entidadEmpleado = data.content;
      entidadEmpleado = entidadEmpleado.find(e => e.tipo == 'EMPLEADO');
      this.entidadService.getEntidadesTipoEntidad(entidadEmpleado.id).subscribe(res => {
        this.listaResponsables = res.content;
      });
    }, error => this.notificacionService.alertError(error));
  }

  getEstados() {
    this.estadosService.habilitadosFondoRendir().subscribe(data => {
      this.listaEstados = data.content;
      if (this.tipoDescargo) this.form.estado.setValue(this.listaEstados.find(e => e.codigo == this.tipoDescargo).id);
    }, error => this.notificacionService.alertError(error));
  }

  get form() {
    return this.formGroup.controls;
  }

  setFondo() {
    this.formGroup.patchValue({
      fechaSolicitud: new Date(this.fondo.fechaSolicitud),
      nroSolicitud: this.fondo.nroSolicitud,
      importe: this.fondo.importe,
      saldo: this.fondo.saldo,
      aperturado: this.fondo.aperturado,
      descripcion: this.fondo.descripcion,
      responsableId: this.fondo.responsableId,
      centroCostoId: this.fondo.centroCostoId
    });
  }

  setTransaccion() {
    let fecha = this.transaccion.fechaMovimiento.substring(5, 7) + '-' + this.transaccion.fechaMovimiento.substring(8, 10) + '-' + this.transaccion.fechaMovimiento.substring(0, 4);
    this.formGroup.patchValue({
      fechaMovimiento: new Date(fecha),
      centroCostoId: this.transaccion.centroCostoId,
      monto: this.transaccion.monto,
      responsableId: this.transaccion.empleadoId,
    });
    this.form.monto.disable();
    this.form.centroCostoId.disable();
    this.form.fechaMovimiento.disable();
    this.cambioMontoMovimiento();
  }

  get planPagos(): FormArray {
    return this.formGroup.get('planPagos') as FormArray
  }

  newPago(): FormGroup {
    return this.formBuilder.group({
      fechaPago: [, Validators.required],
      importe: [, [Validators.required, Validators.min(1)]],
    })
  }

  addPago() {
    this.planPagos.push(this.newPago());
  }

  removePago(index) {
    this.planPagos.removeAt(index);
  }

  generarPlanPagos() {
    this.submitted = true
    if (this.montoExcedentePagar > 0) {
      this.planPagos.controls = []
      let cuotas = this.creditoForm['cuotas'] ?? 1;
      let montoCalculado = this.montoExcedentePagar / cuotas;
      var fechaPago = new Date();
      if (this.creditoForm['tipoCuota'] == 2 && this.creditoForm['cuotas'] > 0) {
        cuotas = 100 / this.creditoForm['cuotas'];
        montoCalculado = (this.montoExcedentePagar * this.creditoForm['cuotas']) / 100;
      }
      for (let ic = 0; ic < cuotas; ic++) {
        if (this.creditoForm['dias'] > 0) fechaPago = this.addHoursToDate(fechaPago, parseInt(this.creditoForm['dias']) * 24)
        this.addPago();
        this.planPagos.controls[ic]['controls'].fechaPago.setValue(fechaPago);
        this.planPagos.controls[ic]['controls'].importe.setValue(montoCalculado);
      }
      this.calcularCuotas()
    }
  }

  calcularCuotas() {
    this.importeTotalCredito = 0;
    this.planPagos.controls.forEach((pago, index) => {
      this.importeTotalCredito += pago['controls']['importe'].value;
    })
    if (this.importeTotalCredito != this.montoExcedentePagar) {
      let ultimaCuotaIndice = this.planPagos.controls.length - 1;
      this.planPagos.controls[ultimaCuotaIndice]['controls']['importe'].setValue(
        this.planPagos.controls[ultimaCuotaIndice]['controls']['importe'].value + (this.montoExcedentePagar - this.importeTotalCredito)
      )
      this.calcularCuotas()
    }
  }


  addHoursToDate(objDate, intHours) {
    var numberOfMlSeconds = objDate.getTime()
    var addMlSeconds = intHours * 60 * 60000
    var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)
    return newDateObj
  }

  cambioMontoApertura() {
    this.montoPagar = this.form.importe.value;
  }

  cambioMontoMovimiento() {
    this.montoPagar = this.form.monto.value;
  }

  public guardar() {
    this.submitted = true;
    let data = this.formGroup.getRawValue();
    if (this.formGroup.valid) {
      data.nroReferencia = data.nroSolicitud;
      data.refId = null;
      data.reponsable = this.listaResponsables.find(e => e.entidadId == data.responsableId).entidad.nombre;
      if (this.tipoDescargo && this.fondo) {
        data.fondoRendirId = this.fondo.id;
        if (this.tipoDescargo == 'DESE') {
          data.ingresoEgreso = 'OUT';
          data.aperturado = true;
        } else {
          data.ingresoEgreso = 'INPUT';
        }
        data.fechaMovimiento = new Date();
        this.detalleFondoRendirService.register(data).subscribe(data => {
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        }, error => this.notificacionService.alertError(error));
      } else if (!this.tipoDescargo && this.fondo) {
        data.id = this.fondo.id;
        this.fondoRendirService.update(data).subscribe(data => {
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        }, error => this.notificacionService.alertError(error));
      } else {
        this.fondoRendirService.register(data).subscribe(data => {
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        }, error => this.notificacionService.alertError(error));
      }
    }
  }

  validatorFecha() {
    return (control: AbstractControl): any => {
      let errores = 'invalido';
      let diaActual = new Date();
      diaActual.setHours(0, 0, 0, 0);
      if (control.value && new Date(control.value) >= diaActual) errores = 'valido';
      if (control.value && errores == 'invalido') return { fechaInvalida: "INVALID" }
      else return null;
    }
  }

  validatorMontoDevolucion(monto) {
    return (control: AbstractControl): any => {
      let errores = 'invalido';
      if (control.value && control.value <= monto) errores = 'valido';
      if (control.value && errores == 'invalido') return { montoDevolucion: "INVALID" }
      else return null;
    }
  }
}
