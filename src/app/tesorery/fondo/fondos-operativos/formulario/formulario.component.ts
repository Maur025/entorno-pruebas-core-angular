import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { FondoOperativoService } from "src/app/tesorery/services/tesoreria/fondo-operativo.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { CentroCostosService } from "src/app/tesorery/services/config/centrocosto.service";
import { BancoService } from "src/app/tesorery/services/tesoreria/banco.service";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { MovimientoCuentaBancoService } from "src/app/tesorery/services/tesoreria/movientos-cuenta-banco.service";
import { MedioTransferenciaService } from "src/app/tesorery/services/tesoreria/medio-transferencia.service";

@Component({
  selector: 'app-formulario-fondoOperativo',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{

  @Input() fondo;
  @Input() apertura;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  formGroup: FormGroup;
  submitted = false;
  listaCentroCostos: any;
  listaBancos: any;
  listaCuentasBanco: any;
  listaMedioTransferencias: any;

  constructor(
    private FormBuilder: FormBuilder,
    private fondoOperativoService: FondoOperativoService,
    private bancoService: BancoService,
    private movimientoCuentaBancoService: MovimientoCuentaBancoService,
    private medioTransferenciaService: MedioTransferenciaService,
    private centroCostosService: CentroCostosService,
    private cuentaBancoService: CuentaBancoService,
    private notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
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
        this.formGroup.disable();
        this.addFormApertura();
      }
    }
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      fechaSolicitud: [, [Validators.required]],
      nroSolicitud: [, [Validators.required]],
      importe: [, [Validators.required]],
      aperturado: [false],
      descripcion: [],
    };
  }


  addFormApertura(){
    this.formGroup.addControl('centroCostoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('bancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('cuentaBancoId', new FormControl(null, Validators.required));
    this.formGroup.addControl('medioTransferenciaId', new FormControl(null, Validators.required));
  }

  getCentroCostos(){
    this.centroCostosService.habilitados().subscribe(data =>{
      this.listaCentroCostos = data.content;
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

  get form() {
    return this.formGroup.controls;
  }

  setFondo(){
    console.log(this.fondo)
    this.formGroup.setValue({
      id: this.fondo.id,
      nombre: this.fondo.nombre,
      fechaSolicitud: new Date(this.fondo.fechaSolicitud),
      nroSolicitud: this.fondo.nroSolicitud,
      importe: this.fondo.importe,
      aperturado: this.fondo.aperturado,
      descripcion: this.fondo.descripcion,
    });
  }

  guardar(){
    this.submitted = true;
    if (this.formGroup.valid) {
      if (this.apertura) {
        console.log("entro apertura")
        let data = this.formGroup.getRawValue();
        data.monto = data.importe;
        data.saldo = data.importe;
        data.fecha = data.fechaSolicitud;
        data.nroReferencia = data.nroSolicitud;
        data.origen = 'origen de prueba';
        console.log(data)
        this.movimientoCuentaBancoService.register(data).subscribe(data =>{
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        },(error) => {
          this.notificacionService.alertError(error);
        });
      } else {
        if (this.fondo) {
          this.fondoOperativoService.update(this.formGroup.getRawValue()).subscribe(data =>{
            this.notificacionService.successStandar();
            this.alActualizar.emit();
          },(error) => {
            this.notificacionService.alertError(error);
          });
        } else {
          this.fondoOperativoService.register(this.formGroup.getRawValue()).subscribe(data =>{
            this.notificacionService.successStandar();
            this.alGuardar.emit();
          },(error) => {
            this.notificacionService.alertError(error);
          });
        }
      }
    }
  }
}
