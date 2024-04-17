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
  formGroup: FormGroup;
  submitted = false;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() tipo;
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
  estado: any;
  ingresoEgreso: any = [
    { value: "IN", name: "INGRESO" },
    { value: "OUT", name: "EGRESO" },
  ];
  tipoOperacion: any = [
    { value: "BN", name: "Banco" },
    { value: "FNDO", name: "Fondo Operativo" },
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
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true },];
    this.getBancos();
    this.getFondoApertudados();
    this.getMedioTransferencias();
    this.setTipoAnticipo();
  }

  setForm() {
    this.formGroup = this.formBuilder.group({
      id: [, []],
      fecha: [, [Validators.required]],
      entidadReferencialId: [, [Validators.required]],
      centroCostoId: [, [Validators.required]],
      nroReferencia: [, [Validators.required]],
      descripcion: [, [Validators.required]],
      estado: [, []],
      saldo: [, [Validators.required]],
      monto: [, []],
      operaciones: this.formBuilder.array([])
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  setTipoAnticipo() {
    if (this.tipo == 'nuevo') {
      this.formGroup.removeControl('estado');
      this.formGroup.removeControl('saldo');
      this.getCentroCostos();
      this.getTipoEntidadId("PROVEEDOR").then(uuid => {
        this.getEntidadReferencialTipoEntidad(uuid);
      });
    } else {
      this.getEstadoAnticipo();
      this.formGroup.removeControl('centroCostoId');
      this.formGroup.removeControl('operaciones');
      this.formGroup.removeControl('entidadReferencialId');
      this.form.estado.setValidators([Validators.required]);
      this.form.monto.setValidators([Validators.required, Validators.max(this.anticipoData.saldo), Validators.pattern('^[0-9]+(.[0-9]*)?$')]);
      this.form.saldo.setValue(this.anticipoData.saldo);
      this.form.saldo.disable();
    }
  }

  getCentroCostos() {
    this.centroCostoService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getEntidadReferencialTipoEntidad(id: string) {
    this.entidadService.listaEntidadReferencialTipoEntidad(id).subscribe(data => {
      this.listaEntidades = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  async getTipoEntidadId(tipo: String) {
    let respuesta: any;
    await this.tipoEntidadService.habilitados().toPromise().then((response) => {
      respuesta = response.content.filter(data => data.tipo === tipo)[0].id;
    }).catch(error => this.notificacionService.alertError(error));
    return respuesta;
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

  /* cambioBanco() {
    if (this.form.bancoId.value != null) {
      this.cuentaBancoService.getCuentasBanco(1000, 1, 'id', false, '', this.form.bancoId.value).subscribe(data => {
        this.listaCuentasBanco = data.content;
      }, error => this.notificacionService.alertError(error));
    } else {
      this.listaCuentasBanco = [];
      this.form.cuentaBancoId.setValue(null);
    }
  } */

  getEstadoAnticipo() {
    this.estadoAnticipoService.habilitados().subscribe(data => {
      this.listaEstadoAnticipo = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getFondoApertudados() {
    this.fondoOperativoService.aperturados().subscribe(fondo => {
      this.listaFondoAperturados = fondo.content
    }, error => this.notificacionService.alertError(error));
  }

  cambioEstado() {
    if (this.form.estado.value != null) {
      this.estado = this.listaEstadoAnticipo.find(x => x.id === this.form.estado.value);
      switch (this.estado.nombre) {
        case 'COMPENZACION':
          this.formGroup.removeControl('operaciones');
          this.formGroup.addControl('ingresoEgreso', new FormControl(null, Validators.required));
          break;
        case 'DEVOLUCION':
          this.formGroup.addControl('operaciones', this.formBuilder.array([]));
          this.formGroup.removeControl('ingresoEgreso');
          break;
        case 'REGULARIZACION':
          this.formGroup.removeControl('operaciones');
          this.formGroup.removeControl('ingresoEgreso');
          break;
      }
    } else {
      this.formGroup.removeControl('ingresoEgreso');
      this.estado = undefined;
    }
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
    delete this.listaOperaciones[index].datos;
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
    delete this.listaOperaciones[index].datos;
    if (this.operaciones.controls[index]['controls']['bancoId'].value != null) {
      this.operaciones.controls[index]['controls']['cuentaBancoId'].setValue(null);
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

  cambioCuentaBancaria(index){
    if (this.operaciones.controls[index]['controls']['cuentaBancoId'].value != null) {
      this.listaOperaciones[index].datos = this.listaOperaciones[index].listaCuentasBanco.find(lop => lop.id === this.operaciones.controls[index]['controls']['cuentaBancoId'].value);
      this.listaOperaciones[index].tituloDetalle = 'Detalle de Cuenta Bancaria';
    } else {
      this.listaOperaciones[index].datos = undefined;
    }
  }

  cambioFondoOperativo(index){
    if (this.operaciones.controls[index]['controls']['fondoOperativoId'].value != null) {
      this.listaOperaciones[index].datos = this.listaFondoAperturados.find(fo => fo.id === this.operaciones.controls[index]['controls']['fondoOperativoId'].value);
      this.listaOperaciones[index].tituloDetalle = 'Detalle de Fondo Operativo';
    } else {
      this.listaOperaciones[index].datos = undefined;
    }
  }

  calcularMontos() {
    let formData = this.formGroup.value;
    this.montoTotal = 0;
    formData.operaciones.forEach(operacion => {
      if (operacion.monto != null) this.montoTotal += Number(operacion.monto);
    });
  }

  guardar() {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (this.tipo == 'aplicacion') {
        let data = this.formGroup.value;
        data.movimiento = "MOVIMIENTO DE PROVEEDOR";
        data.anticipoId = this.anticipoData.id;
        this.aplicacionAnticipoService.register(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        }, error => this.notificacionService.alertError(error));
      } else if (this.tipo == 'nuevo' && this.montoTotal == this.form['monto'].value) {
        let data = this.formGroup.value;
        data.saldo = Number(data.monto);
        data.saldo = data.monto;
        data.origen = 'ANTICIPO';
        data.ingresoEgreso = 'OUT';
        this.anticipoService.register(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        }, error => this.notificacionService.alertError(error));
      }
    }
  }

  /*  guardarAnt() {
     this.submitted = true;
     if (this.formGroup.valid) {
       if (this.anticipo) {
         //agregando datos y enviar
         let data = this.formGroup.value;
         data.saldo = this.anticipo.monto;
         this.anticipoService.update(data).subscribe((res: any) => {
           this.notificacionService.successStandar();
           this.alActualizar.emit(res);
         }, error => this.notificacionService.alertError(error));
       } else {
         let data = this.formGroup.value;
         data.saldo = data.monto;
         data.ingresoEgreso = 'OUT';
         data.origen = 'ANTICIPO';
         this.anticipoService.register(data).subscribe((res: any) => {
           this.notificacionService.successStandar();
           this.alGuardar.emit(res);
         }, error => this.notificacionService.alertError(error));
       }
     }
   } */
}
