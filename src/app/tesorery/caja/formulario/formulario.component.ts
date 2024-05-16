import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { CentrocostoService } from "src/app/tesorery/services/tesoreria/centrocosto.service";
import { EstadosService } from "src/app/tesorery/services/tesoreria/estados.service";
import { CajaService } from "src/app/tesorery/services/tesoreria/caja.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { FondoCajaService } from "src/app/tesorery/services/tesoreria/fondo-caja.service";
import { MovimientoCajaService } from "src/app/tesorery/services/tesoreria/movimiento-caja.service";
import { EntidadService } from "src/app/tesorery/services/tesoreria/entidad.service";

@Component({
  selector: 'app-formulario-caja',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioCajaComponent implements OnInit {

  @Input() caja;
  @Input() cajaIdNoUse;
  @Input() tipoMovimiento;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Output() alProcesar = new EventEmitter<any>();
  formGroup: FormGroup;
  submitted = false;
  listaCentroCostos: any;
  listaBancos: any;
  listaCuentasBanco: any;
  listaMedioTransferencias: any;
  listaEstadosCaja: any;
  listaResponsables: any;
  listaFondoCajas: any;

  constructor(
    private cajaService: CajaService,
    private centroCostosService: CentrocostoService,
    private fondoCajaService: FondoCajaService,
    private movimientoCajaService: MovimientoCajaService,
    private formBuilder: FormBuilder,
    private estadosService: EstadosService,
    private notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
    private modalService: BsModalService,
    private entidadService: EntidadService,


  ) {
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.setForm();
    if (this.caja) this.setCaja();
    this.tipoForm();
    this.getEstadosCaja();
    this.getCentroCostos();
    this.getFondoCajas();
    this.getResponsables();
  }

  setForm() {
    this.formGroup = this.formBuilder.group({
      id: [, []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      descripcion: [, [Validators.required]],
      responsable: [, [Validators.required]],
      responsableId: [, [Validators.required]],
      centroCostoId: [, [Validators.required]],
      fondoCajaId: [, [Validators.required]],
    });
  }

  tipoForm() {
    if (this.tipoMovimiento) {
      if (this.tipoMovimiento == 'APERT') {
        this.formGroup.disable();
        this.addFormApertura();
      } else if (this.tipoMovimiento == 'CIERR') {
        this.formGroup.disable();
        this.addFormMovimiento();
        this.form.monto.disable();
        this.form.monto.setValue(this.caja.saldo);
        this.form.centroCostoId.disable();
      }
      this.form.descripcion.setValue(null);
      this.form.descripcion.enable();
    }
  }

  get form() {
    return this.formGroup.controls;
  }

  get operaciones(): FormArray {
    return this.formGroup.get('operaciones') as FormArray
  }

  setCaja() {
    this.formGroup.patchValue({
      id: this.caja.id,
      nombre: this.caja.nombre,
      descripcion: this.caja.descripcion,
      monto: this.caja.saldo,
      responsable: this.caja.responsable,
      responsableId: this.caja.responsableId,
      centroCostoId: this.caja.centroCostoId,
      fondoCajaId: this.caja.fondoCajaId,
    });
  }

  getEstadosCaja() {
    this.estadosService.habilitadosCajas().subscribe(data => {
      this.listaEstadosCaja = data.content;
      if (this.tipoMovimiento) this.form.estadoCajaId.setValue(this.listaEstadosCaja.find(e => e.codigo == this.tipoMovimiento).id);
    }, error => this.notificacionService.alertError(error));
  }

  getCentroCostos() {
    this.centroCostosService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getFondoCajas() {
    this.fondoCajaService.habilitados().subscribe(data => {
      this.listaFondoCajas = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getResponsables() {
    this.entidadService.getEntidadesByTipo("EMPLEADO").subscribe(data => {
      this.listaResponsables = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  addFormApertura() {
    this.formGroup.addControl('monto', new FormControl(null, [Validators.required, Validators.min(1)]));
    this.formGroup.addControl('operaciones', this.formBuilder.array([], Validators.required));
    this.formGroup.addControl('estadoCajaId', new FormControl(null, Validators.required));
  }

  addFormMovimiento() {
    this.formGroup.addControl('monto', new FormControl(null, [Validators.required]));
    this.formGroup.addControl('estadoCajaId', new FormControl(null, Validators.required));
    if (this.caja.saldo != 0) {
      this.formGroup.addControl('operaciones', this.formBuilder.array([], Validators.required));
    }
  }


  cambioResponsable() {
    if (this.form.responsableId != null) {
      this.form.responsable.setValue(this.listaResponsables.find(e => e.id == this.form.responsableId.value).entidad.nombre);
      console.log('this.formGroup.getRawValue()', this.formGroup.getRawValue());
    }
  }

  guardar() {
    this.submitted = true;
    let data = this.formGroup.getRawValue();
    if (this.formGroup.valid) {
      if (this.tipoMovimiento) {
        data.cajaId = this.caja.id;
        data.fecha = new Date();
        data.origen = 'MOVIMIENTO CAJA';
        if (this.tipoMovimiento == 'APERT') {
          data.ingresoEgreso = 'INPUT';
        } else if (this.tipoMovimiento == 'CIERR') {
          data.ingresoEgreso = 'OUT';
        }
        this.movimientoCajaService.register(data).subscribe(data => {
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        }, error => this.notificacionService.alertError(error));
      } else {
        if (this.caja) {
          this.cajaService.update(data).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, error => this.notificacionService.alertError(error));
        } else {
          this.cajaService.register(data).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, error => this.notificacionService.alertError(error));
        }
      }
    }
  }
}
