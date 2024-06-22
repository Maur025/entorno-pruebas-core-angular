import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FondoRendirService } from "src/app/tesorery/services/tesoreria/fondo-rendir.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { CentrocostoService } from "src/app/tesorery/services/tesoreria/centrocosto.service";
import { BancoService } from "src/app/tesorery/services/tesoreria/banco.service";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { MovimientoCuentaBancoService } from "src/app/tesorery/services/tesoreria/movientos-cuenta-banco.service";
import { MedioTransferenciaService } from "src/app/tesorery/services/tesoreria/medio-transferencia.service";
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
  saldo: any;
  rendicion: any;
  reposicion: any;
  devolucion: any;
  creditoForm = [];
  montoPagar: any;
  importeTotalCredito = 0

  isDevolucion: any;
  isPlanPagos: any;


  constructor(
    private formBuilder: FormBuilder,
    private fondoRendirService: FondoRendirService,
    private bancoService: BancoService,
    private entidadService: EntidadService,
    private estadosService: EstadosService,
    private esquemaService: EsquemaService,
    private movimientoCuentaBancoService: MovimientoCuentaBancoService,
    private medioTransferenciaService: MedioTransferenciaService,
    private detalleFondoRendirService: DetalleFondoRendirService,
    private centroCostosService: CentrocostoService,
    private cuentaBancoService: CuentaBancoService,
    private notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
  ) {
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.setForm();
    this.getResponsables();
    this.getCentroCostos();
    this.getEstados();
    if (this.tipoDescargo) {
      if (this.tipoDescargo == 'DESE') {
        this.addFormApertura();
      } else if (this.tipoDescargo == 'CIERR') {
        this.formGroup.disable();
        this.addFormDescargo();
        this.saldo = this.fondo.saldo;
      } else {
        this.addFormDescargo();
      }
    }
    if (this.fondo) this.setFondo();
    if (this.esquema) this.setTransaccion();

    this.fechaActual = new Date();
    this.fechaActual.setHours(0, 0, 0, 0);
  }

  setForm() {
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

  addFormApertura() {
    console.log('addFormApertura', );
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
    this.formGroup.addControl('operaciones', this.formBuilder.array([], [Validators.required]));
  }

  addFormDescargo() {
    console.log('addFormDescargo', );
    this.formGroup.addControl('monto', new FormControl(null, [Validators.required]));
    this.formGroup.addControl('fechaMovimiento', new FormControl(null, [Validators.required, this.validatorFecha()]));
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
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

  getBancos() {
    this.bancoService.habilitados().subscribe(data => {
      this.listaBancos = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getMedioTransferencias() {
    this.medioTransferenciaService.habilitados().subscribe(data => {
      this.listaMedioTransferencias = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getEstados() {
    this.estadosService.habilitadosFondoRendir().subscribe(data => {
      this.listaEstados = data.content;
      console.log('lsi estados', this.listaEstados)
      if (this.tipoDescargo) {
        console.log('tipo descargo...', this.tipoDescargo)
        this.form.estado.setValue(this.listaEstados.find(e => e.codigo == this.tipoDescargo).id);
        this.rendicion = this.listaEstados.find(e => e.nombre == 'RENDIDO');
        this.reposicion = this.listaEstados.find(e => e.nombre == 'REPOSICIÓN');
        this.devolucion = this.listaEstados.find(e => e.nombre == 'DEVOLUCION');
      }
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
      aperturado: this.fondo.aperturado,
      descripcion: this.fondo.descripcion,
      responsableId: this.fondo.responsableId,
      centroCostoid: this.fondo.centroCostoId
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
      importe: [, [Validators.required, Validators.pattern('^[0-9]+(.[0-9]*)?$')]],
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
    if (this.montoPagar > 0) {
      this.planPagos.controls = []
      let cuotas = this.creditoForm['cuotas'] ?? 1
      let montoCalculado = this.montoPagar / cuotas
      var fechaPago = new Date()
      if (this.creditoForm['tipoCuota'] == 2 && this.creditoForm['cuotas'] > 0) {
        cuotas = 100 / this.creditoForm['cuotas']
        montoCalculado = (this.montoPagar * this.creditoForm['cuotas']) / 100
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
    this.importeTotalCredito = 0
    this.planPagos.controls.forEach((pago, index) => {
      this.importeTotalCredito += pago['controls']['importe'].value;
    })
    if (this.importeTotalCredito != this.montoPagar) {
      let ultimaCuotaIndice = this.planPagos.controls.length - 1
      this.planPagos.controls[ultimaCuotaIndice]['controls']['importe'].setValue(this.planPagos.controls[ultimaCuotaIndice]['controls']['importe'].value + (this.montoPagar - this.importeTotalCredito))
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
    if (this.form.monto.value == this.form.importe.value) {
      this.isPlanPagos = undefined;
      this.isDevolucion = undefined;
      this.formGroup.removeControl('planPagos');
      this.formGroup.removeControl('bancoId');
      this.formGroup.removeControl('cuentaBancoId');
      this.formGroup.removeControl('medioTransferenciaId');

    } else if (this.form.monto.value > this.form.importe.value) {
      this.isPlanPagos = true;
      this.isDevolucion = undefined;
      this.montoPagar = this.form.monto.value - this.form.importe.value;
      this.formGroup.addControl('planPagos', this.formBuilder.array([]));
      this.formGroup.removeControl('bancoId');
      this.formGroup.removeControl('cuentaBancoId');
      this.formGroup.removeControl('medioTransferenciaId');
    } else {
      this.isPlanPagos = undefined;
      this.isDevolucion = true;
      this.formGroup.removeControl('planPagos');
      this.formGroup.addControl('bancoId', new FormControl(null, Validators.required));
      this.formGroup.addControl('cuentaBancoId', new FormControl(null, Validators.required));
      this.formGroup.addControl('medioTransferenciaId', new FormControl(null, Validators.required));
    }
  }

  cambioBanco() {
    if (this.form.bancoId.value != null) {
      this.cuentaBancoService.getCuentasBanco(1000, 1, 'id', false, '', this.form.bancoId.value).subscribe(data => {
        this.listaCuentasBanco = data.content;
      }, error => this.notificacionService.alertError(error));
    } else {
      this.listaCuentasBanco = [];
      this.form.cuentaBancoId.setValue(null);
    }
  }

  public guardar() {
    this.submitted = true;
    let data = this.formGroup.getRawValue();
    console.log('DATA. FORM....-> ', data)
    if (this.formGroup.valid) {
      data.nroReferencia = data.nroSolicitud;
      data.refId = null;
      data.reponsable = this.listaResponsables.find(e => e.entidadId == data.responsableId).entidad.nombre;
      if (this.tipoDescargo) {
        if (this.tipoDescargo == 'DESE') {
          data.ingresoEgreso = 'OUT';
          data.aperturado = true;
          this.fondoRendirService.register(data).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, error => this.notificacionService.alertError(error));
        }


        /* if (this.tipoDescargo != 'DESE') {
          if (this.form.planPagos) {
            if (this.importeTotalCredito == this.montoPagar) {
              this.detalleFondoRendirService.register(data).subscribe(res => {
                this.notificacionService.successStandar();
                this.alActualizar.emit();
                if (this.transaccion && this.esquema) {
                  this.esquemaService.updateNextEstadoIntegracion(this.esquema.id).subscribe(data => {
                    this.alProcesar.emit();
                  }, error => this.notificacionService.alertError(error));
                }
              }, error => this.notificacionService.alertError(error));
            }
          } else {
            this.detalleFondoRendirService.register(data).subscribe(res => {
              this.notificacionService.successStandar();
              this.alActualizar.emit();
              if (this.transaccion && this.esquema) {
                this.esquemaService.updateNextEstadoIntegracion(this.esquema.id).subscribe(data => {
                  this.alProcesar.emit();
                }, error => this.notificacionService.alertError(error));
              }
            }, error => this.notificacionService.alertError(error));
          }
        } else {
          data.id = this.fondo.id;
          data.monto = data.importe;
          data.saldo = data.importe;
          data.fecha = data.fechaSolicitud;
          data.origen = 'FONDO RENDIR';
          data.aperturado = true;
          data.fechaMovimiento = data.fechaSolicitud;
          forkJoin([
            this.movimientoCuentaBancoService.register(data),
            this.detalleFondoRendirService.register(data),
            this.fondoRendirService.update(data)
          ]).subscribe((responses) => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, error => this.notificacionService.alertError(error));
        } */
      } else {
        if (this.fondo) {
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
  }

  public validatorFecha() {
    return (control: AbstractControl): any => {
      let errores = 'invalido';
      let diaActual = new Date();
      diaActual.setHours(0, 0, 0, 0);
      if (control.value && new Date(control.value) >= diaActual) errores = 'valido';
      if (control.value && errores == 'invalido') return { fechaInvalida: "INVALID" }
      else return null;
    }
  }
}
