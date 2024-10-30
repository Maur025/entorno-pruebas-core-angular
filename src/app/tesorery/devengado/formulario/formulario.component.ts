import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { CentrocostoService } from '../../services/tesoreria/centrocosto.service';
import { EntidadService } from '../../services/tesoreria/entidad.service';
import { TipoEntidadService } from '../../services/tesoreria/tipoentidad.service';
import { CuentaBancoService } from '../../services/tesoreria/cuenta-banco.service';
import { BancoService } from '../../services/tesoreria/banco.service';
import { MedioTransferenciaService } from '../../services/tesoreria/medio-transferencia.service';
import { EstadoAnticipoService } from '../../services/tesoreria/estadoanticipo.service';
import { DevengadoService } from '../../services/tesoreria/devengado.service';

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
  @Input() devengado;
  @Input() idRuta;
  @Input() apertura;
  listaEntidades: any;
  listaTipoEntidad: any;
  listaCentroCostos: any;
  tipoEntidadId: any = null;
  listaEstadoAnticipo: any;
  listaBancos: any;
  listaCuentasBanco: any;
  listaMedioTransferencias: any;
  dateNow = new Date((new Date).setHours(23, 59, 59, 999));
  inout: number = 0;
  ingresoEgreso: any = [
    { value: "IN", name: "INGRESO" },
    { value: "OUT", name: "EGRESO" },
  ];

  constructor(
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private centroCostoService: CentrocostoService,
    private entidadService: EntidadService,
    public tipoEntidadService: TipoEntidadService,
    private cuentaBancoService: CuentaBancoService,
    private bancoService: BancoService,
    private medioTransferenciaService: MedioTransferenciaService,
    private estadoAnticipoService: EstadoAnticipoService,
    private devengadoService: DevengadoService,
  ) { }

  ngOnInit(): void {
    this.setForm();
    if (!this.maxDate) this.maxDate = this.dateNow;
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true },];
    this.getCentroCostos();
    this.getBancos();
    this.getMedioTransferencias();
    this.getTipoEntidadId("PROVEEDOR").then(uuid => {
      this.getEntidadReferencialTipoEntidad(uuid);
    })
    if (this.devengado) {
      this.formGroup.setValue({
        id: this.devengado.id,
        entidadReferencialId: this.devengado.entidadReferencialId,
        fecha: new Date(this.devengado.fecha),
        monto: this.devengado.monto,
        centroCostoId: this.devengado.centroCostoId,
        nroReferencia: this.devengado.nroReferencia
      });
    }
    else {
      this.form['id'].setValue(this.idRuta)
    }
  }

  setForm() {
    this.formGroup = this.FormBuilder.group({
      id: [, []],
      monto: [, [Validators.required]],
      fecha: [, [Validators.required]],
      nroReferencia: [, [Validators.required]],
      centroCostoId: [, [Validators.required]],
      entidadReferencialId: [, [Validators.required]],
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  guardar() {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (this.devengado) {
        //agregando datos y enviar
        let data = this.formGroup.value;
        this.devengadoService.update(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alActualizar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        });
      } else {
        let data = this.formGroup.value;
        this.devengadoService.register(data).subscribe((res: any) => {
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
}
