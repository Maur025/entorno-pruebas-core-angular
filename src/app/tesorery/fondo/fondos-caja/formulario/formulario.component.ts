import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FondoCajaService } from "src/app/tesorery/services/tesoreria/fondo-caja.service";
import { CentrocostoService } from "src/app/tesorery/services/tesoreria/centrocosto.service";
import { EstadosService } from "src/app/tesorery/services/tesoreria/estados.service";
import { BancoService } from "src/app/tesorery/services/tesoreria/banco.service";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { MedioTransferenciaService } from "src/app/tesorery/services/tesoreria/medio-transferencia.service";

@Component({
  selector: 'app-formulario-caja',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioCajaComponent implements OnInit{

  @Input() fondo;
  @Input() apertura;
  @Input() descargo;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  formGroup: FormGroup;
  submitted = false;
  listaEstados: any;
  listaCentroCostos: any;
  listaBancos: any;
  listaMedioTransferencias: any;
  listaCuentasBanco: any;
  fechaActual:any;

  constructor(
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
    private fondoCajaService: FondoCajaService,
    private centroCostosService: CentrocostoService,
    private estadosService: EstadosService,
    private bancoService: BancoService,
    private cuentaBancoService: CuentaBancoService,
    private medioTransferenciaService: MedioTransferenciaService,

  ){
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    if (this.fondo) {
      this.setFondo();
      if (this.apertura) {
        this.getCentroCostos();
        this.getBancos();
        this.getMedioTransferencias();
        this.getEstados();
        this.formGroup.disable();
        this.addFormApertura();
        this.form.estado.disable();
      }
      if (this.descargo) {
        this.formGroup.disable();
        this.getEstados();
        this.getCentroCostos();
        //this.addFormDescargo();
        //this.saldo = this.fondo.saldo;
      }
    }
    this.fechaActual = new Date();
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      sigla: [, [Validators.required]],
      descripcion: [],
    };
  }

  addFormApertura(){
    this.formGroup.addControl('centroCostoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('bancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('cuentaBancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('medioTransferenciaId', new FormControl(null, Validators.required));
    this.formGroup.addControl('estado', new FormControl(null, Validators.required));
  }

  get form() {
    return this.formGroup.controls;
  }

  getCentroCostos(){
    this.centroCostosService.habilitados().subscribe(data =>{
      this.listaCentroCostos = data.content;
    },(error) => {
      this.notificacionService.alertError(error);
    });
  }
  getEstados(){
    this.estadosService.habilitadosFondos().subscribe(data =>{
      this.listaEstados = data.content;
      if(this.apertura) this.form.estado.setValue(this.listaEstados.filter((data: { nombre: any; }) => data.nombre == 'APERTURADO')[0].id);
      if(this.descargo) this.listaEstados.splice(this.listaEstados.map(estado => estado.nombre).indexOf('APERTURADO'), 1);
    },(error) => {
      this.notificacionService.alertError(error);
    });
  }

  getBancos(){
    this.bancoService.habilitados().subscribe(data =>{
      this.listaBancos = data.content;
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

  setFondo(){
    this.formGroup.setValue({
      id: this.fondo.id,
      nombre: this.fondo.nombre,
      sigla: this.fondo.sigla,
      descripcion: this.fondo.descripcion,
    });
  }


  cambioBanco(){
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
      if (this.fondo) {
        this.fondoCajaService.update(this.formGroup.getRawValue()).subscribe(data =>{
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        },(error) => {
          this.notificacionService.alertError(error);
        });
      } else {
        this.fondoCajaService.register(this.formGroup.getRawValue()).subscribe(data =>{
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        },(error) => {
          this.notificacionService.alertError(error);
        });
      }
    }
  }
}
