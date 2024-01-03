import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
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

@Component({
  selector: 'app-formulario-rendir',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioRendirComponent implements OnInit {
  @Input() fondo;
  @Input() apertura;
  @Input() descargo;
  @Input() tipoDescargo;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
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

  constructor(
    private FormBuilder: FormBuilder,
    private fondoRendirService: FondoRendirService,
    private bancoService: BancoService,
    private entidadService: EntidadService,
    private estadosService: EstadosService,
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
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    this.getResponsables();
    if (this.fondo) {
      this.setFondo();
      this.getCentroCostos();
      this.getEstados();
      if (this.apertura) {
        this.getBancos();
        this.getMedioTransferencias();
        this.formGroup.disable();
        this.addFormApertura();
      }
      if (this.descargo) {
        this.formGroup.disable();
        this.addFormDescargo();
        this.saldo = this.fondo.saldo;
      }
    }
    this.fechaActual = new Date();
  }

  fieldsFormValidation() {
    return {
      id: [, []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      fechaSolicitud: [, [Validators.required]],
      nroSolicitud: [, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      importe: [, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      aperturado: [],
      descripcion: [],
      responsableId: [, [Validators.required]]
    };
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
    this.formGroup.addControl('fechaMovimiento', new FormControl(null, [Validators.required, this.validatorFecha()]));
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
  }

  getCentroCostos() {
    this.centroCostosService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getResponsables() {
    this.entidadService.getTipoEntidad().subscribe(data => {
      let entidadEmpleado = data.content;
      entidadEmpleado = entidadEmpleado.find(e => e.tipo == 'EMPLEADO');
      this.entidadService.getEntidadesTipoEntidad(entidadEmpleado.id).subscribe(res => {
        this.listaResponsables = res.content;
      })
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
      if (this.apertura || this.descargo){
        this.form.estado.setValue(this.listaEstados.find(e => e.nombre == this.tipoDescargo).id);      ;
        this.rendicion = this.listaEstados.find(e => e.nombre == 'RENDIDO');
        this.reposicion = this.listaEstados.find(e => e.nombre == 'REPOSICIÓN');
        this.devolucion = this.listaEstados.find(e => e.nombre == 'DEVOLUCIÓN');
      }
    }, (error) => {
      this.notificacionService.alertError(error);
    });
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
      responsableId: this.fondo.responsableId,
    });
  }

  cambioBanco() {
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

  public guardar() {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (this.descargo) {
        let data = this.formGroup.getRawValue();
        data.nroReferencia = data.nroSolicitud;
        data.refId = null;
        data.fondoRendirId = data.id;
        if (this.form.monto.value < this.fondo.importe) {
          this.detalleFondoRendirService.register(data).subscribe(res => {
            let dataDevolucion = this.formGroup.getRawValue();
            dataDevolucion.nroReferencia = data.nroSolicitud;
            dataDevolucion.refId = null;
            dataDevolucion.fondoRendirId = data.id;
            dataDevolucion.monto = this.fondo.importe - data.monto;
            dataDevolucion.estado = this.devolucion.id;
            this.detalleFondoRendirService.register(dataDevolucion).subscribe(res => {
            }, (error) => {
            this.notificacionService.alertError(error);
            });
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, (error) => {
          this.notificacionService.alertError(error);
          });
        } else if (this.form.monto.value > this.fondo.importe){
          this.detalleFondoRendirService.register(data).subscribe(res => {
            let dataReposicion = this.formGroup.getRawValue();
            dataReposicion.nroReferencia = data.nroSolicitud;
            dataReposicion.refId = null;
            dataReposicion.fondoRendirId = data.id;
            dataReposicion.monto = Math.abs(this.fondo.importe - data.monto);
            dataReposicion.estado = this.reposicion.id;
            this.detalleFondoRendirService.register(dataReposicion).subscribe(res => {
            }, (error) => {
            this.notificacionService.alertError(error);
            });
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, (error) => {
          this.notificacionService.alertError(error);
          });

        } else {
          this.detalleFondoRendirService.register(data).subscribe(res => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, (error) => {
          this.notificacionService.alertError(error);
          });
        }
      } else if (this.apertura) {
        let data = this.formGroup.getRawValue();
        data.monto = data.importe;
        data.saldo = data.importe;
        data.fecha = data.fechaSolicitud;
        data.nroReferencia = data.nroSolicitud;
        data.origen = 'TESORERIA';
        data.aperturado = true;
        data.fechaMovimiento = data.fechaSolicitud;
        data.refId = null;
        data.fondoRendirId = data.id;
        data.reponsable = this.listaResponsables.find(e => e.entidadId == data.responsableId).entidad.nombre;
        forkJoin([
          this.movimientoCuentaBancoService.register(data),
          this.detalleFondoRendirService.register(data),
          this.fondoRendirService.update(data)
        ]).subscribe((responses) => {
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        }, (error) => {
          this.notificacionService.alertError(error);
        });
      } else {
        if (this.fondo) {
          this.fondoRendirService.update(this.formGroup.getRawValue()).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          }, (error) => {
            this.notificacionService.alertError(error);
          });
        } else {
          let data = this.formGroup.getRawValue();
          data.reponsable = this.listaResponsables.find(e => e.entidadId == data.responsableId).entidad.nombre;
          this.fondoRendirService.register(data).subscribe(data => {
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
}
