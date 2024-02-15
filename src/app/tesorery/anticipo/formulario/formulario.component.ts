import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { CentrocostoService } from '../../services/tesoreria/centrocosto.service';
import { EntidadService } from '../../services/tesoreria/entidad.service';
import { AnticipoService } from '../../services/tesoreria/anticipo.service';
import { TipoEntidadService } from '../../services/tesoreria/tipoentidad.service';
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { BancoService } from "src/app/tesorery/services/tesoreria/banco.service";
import { MedioTransferenciaService } from "src/app/tesorery/services/tesoreria/medio-transferencia.service";
import { EstadoAnticipoService } from '../../services/tesoreria/estadoanticipo.service';
import { AplicacionAnticipoService } from '../../services/tesoreria/aplicacion-anticipo.service';
import { FondoOperativoService } from '../../services/tesoreria/fondo-operativo.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = "Gestión de Anticipos";
  titulo: any = "Anicipo";
  routeApi = 'anticipo';
  levelNavigate = 2;
  service = null;
  @Input() maxDate: any;
  formGroup: FormGroup;
  submitted = false;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() anticipo;
  @Input() anticipoData;
  @Input() idRuta;
  @Input() apertura;
  listaEntidades: any;
  listaTipoEntidad: any;
  listaCentroCostos: any;
  tipoEntidadId: any = null;
  listaEstadoAnticipo: any;
  listaFondoAperturados: any;
  listaBancos: any;
  listaCuentasBanco: any;
  listaMedioTransferencias: any;
  montoTotal: number = 0;
  listaOperaciones = [];
  dateNow = new Date((new Date).setHours(23, 59, 59, 999));
  inout: number = 0;
  operacion: any;
  ingresoEgreso: any = [
    { value: "IN", name: "INGRESO" },
    { value: "OUT", name: "EGRESO" },
  ];
  tipoOperacion: any = [
    { value: "BN", name: "Banco" },
    { value: "FNDO", name: "Fondo Operativo" },
    //{ value: "FNDR", name: "FONDO A RENDIR" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private centroCostoService: CentrocostoService,
    private entidadService: EntidadService,
    private anticipoService: AnticipoService,
    public tipoEntidadService: TipoEntidadService,
    private cuentaBancoService: CuentaBancoService,
    private bancoService: BancoService,
    private medioTransferenciaService: MedioTransferenciaService,
    private estadoAnticipoService: EstadoAnticipoService,
    private aplicacionAnticipoService: AplicacionAnticipoService,
    private fondoOperativoService: FondoOperativoService,
    private _localeService: BsLocaleService
  ) {
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.setForm();
    if (!this.maxDate) this.maxDate = this.dateNow;
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true },];
    this.getCentroCostos();
    this.getBancos();
    this.getMedioTransferencias();
    this.getTipoEntidadId("PROVEEDOR").then(uuid => {
      this.getEntidadReferencialTipoEntidad(uuid);
    });


    if (this.anticipo) {
      this.getEstadoAnticipo();
      this.formGroup.removeControl('estado');
      this.formGroup.removeControl('centroCostoId');
      this.formGroup.removeControl('entidadReferencialId');
      this.formGroup.removeControl('ingresoEgreso');
      this.formGroup.removeControl('bancoId');
      this.formGroup.removeControl('cuentaBancoId');
      this.formGroup.removeControl('medioTransferenciaId');
      this.formGroup.removeControl('descripcion');
      this.formGroup.removeControl('tipoOperacion');
      this.formGroup.addControl('estado', new FormControl(null, Validators.required));
    }
    else {
      this.formGroup.removeControl('tipoOperacion');
      this.formGroup.removeControl('estado');
      this.formGroup.removeControl('ingresoEgreso');
      this.getFondoApertudados();
    }
  }

  setForm() {
    this.formGroup = this.formBuilder.group({
      id: [, []],
      fecha: [, [Validators.required]],
      entidadReferencialId: [, [Validators.required]],
      centroCostoId: [, [Validators.required]],
      nroReferencia: [, [Validators.required]],
      ingresoEgreso: [, [Validators.required]],
      descripcion: [, [Validators.required]],
      estado: [, []],
      monto: [, [Validators.required, Validators.pattern('^[0-9]+(.[0-9]*)?$')]],
      operaciones: this.formBuilder.array([])
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  guardar() {
    this.submitted = true;
    if (this.formGroup.valid && this.montoTotal == this.form['monto'].value) {
      if (this.anticipo) {
        let data = this.formGroup.value;
        data.saldo = this.anticipo.monto
        data.movimiento = "MOVIMIENTO DE PROVEEDOR";
        data.anticipoId = this.anticipoData.id;
        this.aplicacionAnticipoService.register(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        }        );
      } else {
        let data = this.formGroup.value;
        data.saldo = Number(data.monto);
        data.saldo = data.monto;
        data.origen = 'ANTICIPO';
        data.ingresoEgreso = 'OUT';
        this.anticipoService.register(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        }
        );
      }
    }
  }

  guardarAnt() {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (this.anticipo) {
        //agregando datos y enviar
        let data = this.formGroup.value;
        data.saldo = this.anticipo.monto;
        this.anticipoService.update(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alActualizar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        });
      } else {
        let data = this.formGroup.value;
        data.saldo = data.monto;
        data.ingresoEgreso = 'OUT';
        data.origen = 'ANTICIPO';
        this.anticipoService.register(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        });
      }
    }
  }

  getCentroCostos() {
    this.centroCostoService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }
  getEntidadReferencialTipoEntidad(id: string) {

    this.entidadService.listaEntidadReferencialTipoEntidad(id).subscribe(data => {
      this.listaEntidades = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  async getTipoEntidadId(tipo: String) {
    let respuesta: any;
    await this.tipoEntidadService.habilitados().toPromise().then((response) => {
      respuesta = response.content.filter(data => data.tipo === tipo)[0].id;
    }).catch(e => console.error(e));
    return respuesta;
  }

  async getTipoEntidadInicio() {
    this.tipoEntidadService.habilitados().subscribe(async data => {
      this.listaTipoEntidad = await data.content;
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

  getEstadoAnticipo() {
    this.estadoAnticipoService.habilitados().subscribe(data => {
      this.listaEstadoAnticipo = data.content;
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  getFondoApertudados() {
    this.fondoOperativoService.aperturados().subscribe(fondo => {
      this.listaFondoAperturados = fondo.content
    }, (error) => {
      this.notificacionService.alertError(error);
    });
  }

  cambioEstado(event: any) {
    if (event.nombre === 'COMPENZACION') {
      this.inout = 2;
      this.formGroup.addControl('ingresoEgreso', new FormControl(null, Validators.required));
    }
    else {
      if (event.nombre === 'DEVOLUCION') {
        this.inout = 1;
        this.addFormMovimientoCuenta()
      }
      else {
        // this.formGroup.removeControl('ingresoEgreso');
        this.removeFormMovimientoCuenta()
        this.inout = 0;
      }
    }
  }

  cambioOperacion(event: any) {
    console.log(event.value);
    this.operacion = event.value;
    switch (event.value) {
      case 'BN':
        this.addFormMovimientoCuentaOperacion();
        this.inout = 1;
        break;
      case 'FNDO':
        this.inout = 0;
        this.removeFormMovimientoCuentaOperacion();
        break;
      /*  case 'FNDR':
          this.inout = 0;
          this.removeFormMovimientoCuentaOperacion();
          break; */
    }
  }

  addFormMovimientoCuenta() {
    this.formGroup.addControl('descripcion', new FormControl(null, Validators.required));
    this.formGroup.addControl('bancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('cuentaBancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('medioTransferenciaId', new FormControl(null, Validators.required));
    this.formGroup.removeControl('ingresoEgreso');
  }

  removeFormMovimientoCuenta() {
    this.formGroup.removeControl('centroCostoId');
    this.formGroup.removeControl('entidadReferencialId');
    this.formGroup.removeControl('ingresoEgreso');
    this.formGroup.removeControl('bancoId');
    this.formGroup.removeControl('cuentaBancoId');
    this.formGroup.removeControl('medioTransferenciaId');
    this.formGroup.removeControl('descripcion');
    this.formGroup.removeControl('tipoOperacion');
  }

  removeFormMovimientoCuentaOperacion() {
    this.formGroup.removeControl('bancoId');
    this.formGroup.removeControl('cuentaBancoId');
    this.formGroup.removeControl('medioTransferenciaId');
    this.formGroup.removeControl('descripcion');
    this.formGroup.addControl('fondoOperativoId', new FormControl(null, Validators.required));
  }

  addFormMovimientoCuentaOperacion() {
    this.formGroup.addControl('descripcion', new FormControl(null, Validators.required));
    this.formGroup.addControl('bancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('cuentaBancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('medioTransferenciaId', new FormControl(null, Validators.required));
    this.formGroup.removeControl('ingresoEgreso');
    this.formGroup.removeControl('fondoOperativoId');
  }

  get operaciones(): FormArray {
    return this.formGroup.get('operaciones') as FormArray
  }

  newOperacion(): FormGroup {
    return this.formBuilder.group({
      tipoOperacion: [, Validators.required],
      monto: [0, [Validators.required, Validators.pattern('^[0-9]+(.[0-9]*)?$')]],
    })
  }

  addOperacion() {
    this.listaOperaciones.push({ monto: 0 });
    this.operaciones.push(this.newOperacion());

  }

  removeOperacion(index) {
    this.listaOperaciones.splice(index, 1);
    this.operaciones.removeAt(index);
  }

  cambiaOperacion(index) {
    this.operaciones.controls[index]['controls']['monto'].setValue(0);
    if (this.operaciones.controls[index]['controls']['tipoOperacion'].value != null) {
      if (this.operaciones.controls[index]['controls']['tipoOperacion'].value == 'BN') {
        this.operaciones.at(index)['addControl']('bancoId', new FormControl(null, Validators.required));
        this.operaciones.at(index)['addControl']('cuentaBancoId', new FormControl(null, Validators.required));
        this.operaciones.at(index)['addControl']('medioTransferenciaId', new FormControl(null, Validators.required));
        this.operaciones.at(index)['addControl']('descripcion', new FormControl(null, Validators.required));
        this.operaciones.at(index)['removeControl']('fondoOperativoId');
      } else {
        this.operaciones.at(index)['addControl']('fondoOperativoId', new FormControl(null, Validators.required));
        this.operaciones.at(index)['removeControl']('bancoId');
        this.operaciones.at(index)['removeControl']('cuentaBancoId');
        this.operaciones.at(index)['removeControl']('medioTransferenciaId');
        this.operaciones.at(index)['removeControl']('descripcion');
      }
    } else {
      this.operaciones.at(index)['removeControl']('bancoId');
      this.operaciones.at(index)['removeControl']('cuentaBancoId');
      this.operaciones.at(index)['removeControl']('medioTransferenciaId');
      this.operaciones.at(index)['removeControl']('descripcion');
      this.operaciones.at(index)['removeControl']('fondoOperativoId');
    }
    this.calcularMontos();
    if (this.form['monto'].value != null && (this.form['monto'].value - this.montoTotal)) {
      this.operaciones.controls[index]['controls']['monto'].setValue(Number(this.form['monto'].value - this.montoTotal));
    } else {
      this.operaciones.controls[index]['controls']['monto'].setValue(0);
    }
    this.calcularMontos();
  }

  cambiaBanco(index) {
    if (this.operaciones.controls[index]['controls']['bancoId'].value != null) {
      this.cuentaBancoService.getCuentasBanco(1000, 1, 'id', false, '', this.operaciones.controls[index]['controls']['bancoId'].value).subscribe(data => {
        this.listaOperaciones[index].listaCuentasBanco = data.content;
      }, (error) => {
        this.notificacionService.alertError(error);
      });
    } else {
      this.operaciones.controls[index]['controls']['cuentaBancoId'].setValue(null);
      this.listaOperaciones[index].listaCuentasBanco = [];
    }
  }

  calcularMontos() {
    let formData = this.formGroup.value;
    this.montoTotal = 0;
    formData.operaciones.forEach(operacion => {
      if (operacion.monto != null) {
        this.montoTotal += Number(operacion.monto);
      }
    });
  }
}
