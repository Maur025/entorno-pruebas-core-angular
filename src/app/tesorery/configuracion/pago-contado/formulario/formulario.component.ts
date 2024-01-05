import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BancoService } from "src/app/tesorery/services/tesoreria/banco.service";
import { CuentaContadoService } from "src/app/tesorery/services/tesoreria/cuenta-contado.service";
import { CuentaContadoMedioService } from "src/app/tesorery/services/tesoreria/cuenta-contado-medio.service";
import { FondoOperativoService } from "src/app/tesorery/services/tesoreria/fondo-operativo.service";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { MedioTransferenciaService } from "src/app/tesorery/services/tesoreria/medio-transferencia.service";
import { TipoPagoContadoService } from "src/app/tesorery/services/tesoreria/tipo-pago-contado.service";

@Component({
  selector: 'app-formulario-pagos',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioPagosComponent {

  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() cuentaContadoMedio;
  submitted= false;
  formGroup: FormGroup;
  fondoCuenta = 'fondo';
  listaBancos: any;
  listaCuentasBanco: any;
  listaMedioTransferencias: any;
  listaFondos: any;
  cajaTipoPago: any;
  bancoTipoPago: any;
  bancoId: any;
  fondoId: any;

  constructor(
    private FormBuilder: FormBuilder,
    private bancoService: BancoService,
    private cuentaContadoService: CuentaContadoService,
    private cuentaContadoMedioService: CuentaContadoMedioService,
    private tipoPagoContadoService: TipoPagoContadoService,
    private fondoOperativoService: FondoOperativoService,
    private cuentaBancoService: CuentaBancoService,
    private medioTransferenciaService: MedioTransferenciaService,
    private notificacionService: NotificacionService,
  ){}

  ngOnInit(): void {
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    this.getTipoPagoContado();
    if (this.cuentaContadoMedio) {
      this.cuentaContadoMedio.tipoPagoContado.codigo == 'B' ? this.fondoCuenta = 'cuentaBanco' : this.fondoCuenta = 'fondo';
      this.form.id.setValue(this.cuentaContadoMedio.id);
      this.form.bancoId.disable();
      this.form.cuentaBancoId.disable();
      this.form.fondoOperativoId.disable();

    }
    this.cambioTipoConfiguracion();
    this.getBancos();
    this.getFondos();
    this.getMedioTransferencias();
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      bancoId: [, []],
      cuentaBancoId: [, []],
      fondoOperativoId: [, []],
      medioTransferenciaId: [, [Validators.required]],
    };
  }

  get form() {
    return this.formGroup.controls;
  }

  getFondos(){
    this.fondoOperativoService.habilitados().subscribe(data =>{
      this.listaFondos = data.content;
      if (this.cuentaContadoMedio && this.fondoCuenta == 'fondo') {
        this.form.fondoOperativoId.setValue(this.cuentaContadoMedio.tablaRefId);
        let mediosId = [];
        this.cuentaContadoMedio.medioTransferencias.forEach(m => { mediosId.push(m.id);});
        this.form.medioTransferenciaId.setValue(mediosId);
      }
    },(error) => {
      this.notificacionService.alertError(error);
    });
  }

  async getBancos(){
    this.bancoService.habilitados().subscribe(data =>{
      this.listaBancos = data.content;
      if (this.cuentaContadoMedio && this.fondoCuenta == 'cuentaBanco') {
        this.bancoId = this.listaBancos.find(b => b.nombre == this.cuentaContadoMedio.nombre).id;
        this.form.bancoId.setValue(this.bancoId);
        this.cambioBanco();
        this.form.cuentaBancoId.setValue(this.cuentaContadoMedio.tablaRefId);
        let mediosId = [];
        this.cuentaContadoMedio.medioTransferencias.forEach(m => { mediosId.push(m.id);});
        this.form.medioTransferenciaId.setValue(mediosId);
      }
    },(error) => {
      this.notificacionService.alertError(error);
    });
  }

  getMedioTransferencias(){
    this.medioTransferenciaService.habilitados().subscribe(data =>{
      this.listaMedioTransferencias = data.content;
    },(error) => {
      this.notificacionService.alertError(error);
    });
  }

  getTipoPagoContado(){
    this.tipoPagoContadoService.habilitados().subscribe(data =>{
      this.cajaTipoPago = data.content.find(c => c.codigo == 'C');
      this.bancoTipoPago = data.content.find(b => b.codigo == 'B');
    },(error) => {
      this.notificacionService.alertError(error);
    });
  }

  cambioTipoConfiguracion(){
    this.form.bancoId.setValue(null);
    this.form.cuentaBancoId.setValue(null);
    this.form.fondoOperativoId.setValue(null);
    if (this.fondoCuenta == 'cuentaBanco') {
      this.form.bancoId.setValidators([Validators.required]);
      this.form.cuentaBancoId.setValidators([Validators.required]);
      this.form.fondoOperativoId.setValidators([]);
    } else {
      this.form.fondoOperativoId.setValidators([Validators.required]);
      this.form.bancoId.setValidators([]);
      this.form.cuentaBancoId.setValidators([]);
    }
    this.form.fondoOperativoId.updateValueAndValidity();
    this.form.bancoId.updateValueAndValidity();
    this.form.cuentaBancoId.updateValueAndValidity();
  }

  cambioBanco(){
    this.listaCuentasBanco = [];
    this.form.cuentaBancoId.setValue(null);
    if (this.form.bancoId.value != null) {
      this.cuentaBancoService.getCuentasBanco(1000, 1, 'id', false,'', this.form.bancoId.value).subscribe(data =>{
        this.listaCuentasBanco = data.content;
      },(error) => {
        this.notificacionService.alertError(error);
      });
    } else {
      this.listaCuentasBanco = [];
      this.form.cuentaBancoId.setValue(null);
    }
  }

  guardar(){
    this.submitted = true;
    if (this.formGroup.valid) {
      let dataCuentaContMedio = {};
      let dataCuentaCont = {};
      if (this.cuentaContadoMedio) {
        dataCuentaContMedio['id'] = this.cuentaContadoMedio.id;
        dataCuentaContMedio['cuentaContadoId'] = this.cuentaContadoMedio.id;
        dataCuentaContMedio['medioTransferenciaId'] = this.form.medioTransferenciaId.value;
        this.cuentaContadoMedioService.register(dataCuentaContMedio).subscribe(data => {
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        },(error) => {
          this.notificacionService.alertError(error);
        });
      } else {
        if (this.fondoCuenta == 'fondo') {
          dataCuentaCont['cuenta'] = 'FONDO OPERATIVO';
          dataCuentaCont['nombre'] = this.listaFondos.find(b => b.id == this.form.fondoOperativoId.value).nombre;
          dataCuentaCont['tabla'] =  'fondos_operativos';
          dataCuentaCont['tablaRefId'] =  this.form.fondoOperativoId.value;
          dataCuentaCont['tipoPagoContadoId'] =  this.cajaTipoPago.id;
        } else {
          dataCuentaCont['cuenta'] = this.listaCuentasBanco.find(c => c.id == this.form.cuentaBancoId.value).nroCuenta;
          dataCuentaCont['nombre'] = this.listaBancos.find(b => b.id == this.form.bancoId.value).nombre;
          dataCuentaCont['tabla'] =  'cuentas_banco';
          dataCuentaCont['tablaRefId'] =  this.form.cuentaBancoId.value;
          dataCuentaCont['tipoPagoContadoId'] =  this.bancoTipoPago.id;
        }
        this.cuentaContadoService.register(dataCuentaCont).subscribe(data => {
          dataCuentaContMedio['cuentaContadoId'] = data.content.id;
          dataCuentaContMedio['medioTransferenciaId'] = this.form.medioTransferenciaId.value;
          this.cuentaContadoMedioService.register(dataCuentaContMedio).subscribe(data => {
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          },(error) => {
            this.notificacionService.alertError(error);
          });
        },(error) => {
          this.notificacionService.alertError(error);
        });
      }
    }

  }
}
