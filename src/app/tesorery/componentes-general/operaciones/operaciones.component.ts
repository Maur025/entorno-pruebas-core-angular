import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, } from '@angular/forms'
import { CuentaBancoService } from 'src/app/tesorery/services/tesoreria/cuenta-banco.service'
import { BancoService } from 'src/app/tesorery/services/tesoreria/banco.service'
import { MedioTransferenciaService } from 'src/app/tesorery/services/tesoreria/medio-transferencia.service'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { CajaService } from '../../services/tesoreria/caja.service'

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent implements OnInit{

  @Input() cajaIdNoUse;
  @Input() montoPagar = 0;
  @Input() submitted = false;
  @Input() formGroup;
  @Input() listaMedioTransferencias;
  @Input() listaBancos;
  @Input() listaCajas;
  listaOperaciones = [];
  tipoOperacion: any = [
    { value: 'BN', name: 'Banco' },
    { value: 'CAJ', name: 'Caja' },
  ];
  montoTotal = 0;

  constructor(
    private bancoService: BancoService,
    private cajaService: CajaService,
    private cuentaBancoService: CuentaBancoService,
    private medioTransferenciaService: MedioTransferenciaService,
    private formBuilder: FormBuilder,
    private notificacionService: NotificacionService,

  ) {

  }

  ngOnChanges() {
    this.montoPagar;
    if (this.operaciones.controls?.length > 0) this.calcularMontos();
  }

  ngOnInit(): void {
    this.getBancos();
    this.getCajas();
    this.getMedioTransferencias();
  }

  get form() {
    return this.formGroup.controls;
  }

  get operaciones(): FormArray {
    return this.formGroup.get('operaciones') as FormArray;
  }

  getBancos() {
    this.bancoService.habilitados().subscribe(data => {
      this.listaBancos = data.content;
    }, error => this.notificacionService.alertError(error));
  }

  getCajas() {
    this.cajaService.aperturadas().subscribe(data => {
      this.listaCajas = data.content;
      if (this.cajaIdNoUse) {
        this.listaCajas.splice(this.listaCajas.findIndex(obj => obj.id === this.cajaIdNoUse), 1);
      }
    }, error => this.notificacionService.alertError(error));
  }

  getMedioTransferencias() {
    this.medioTransferenciaService.habilitados().subscribe(data => {
      this.listaMedioTransferencias = data.content;
    }, error => this.notificacionService.alertError(error));
  }


  newOperacion(): FormGroup {
    return this.formBuilder.group({
      tipoOperacion: [, Validators.required],
      monto: [0, [Validators.required, Validators.pattern('^[0-9]+(.[0-9]*)?$')]],
      descripcion: [, Validators.required],
    })
  }

  addOperacion() {
    this.listaOperaciones.push({ monto: 0 });
    this.operaciones.push(this.newOperacion());
    this.calcularMontos();
  }

  removeOperacion(index) {
    this.listaOperaciones.splice(index, 1);
    this.operaciones.removeAt(index);
    if (this.operaciones.controls.length > 0) this.calcularMontos();
  }

  cambiaOperacion(index) {
    delete this.listaOperaciones[index].datos;
    if (this.operaciones.controls[index]['controls']['tipoOperacion'].value != null) {
      if (this.operaciones.controls[index]['controls']['tipoOperacion'].value == 'BN') {
        this.operaciones.at(index)['addControl']('bancoId', new FormControl(null, Validators.required));
        this.operaciones.at(index)['addControl']('cuentaBancoId', new FormControl(null, Validators.required));
        this.operaciones.at(index)['addControl']('medioTransferenciaId', new FormControl(null, Validators.required));
        this.operaciones.at(index)['removeControl']('cajaId');
      } else {
        this.operaciones.at(index)['addControl']('cajaId', new FormControl(null, Validators.required));
        this.operaciones.at(index)['removeControl']('bancoId');
        this.operaciones.at(index)['removeControl']('cuentaBancoId');
        this.operaciones.at(index)['removeControl']('medioTransferenciaId');
      }
    } else {
      this.operaciones.at(index)['removeControl']('bancoId');
      this.operaciones.at(index)['removeControl']('cuentaBancoId');
      this.operaciones.at(index)['removeControl']('medioTransferenciaId');
      this.operaciones.at(index)['removeControl']('cajaId');
    }
  }

  calcularMontos() {
    this.montoTotal = 0;
    this.operaciones.controls.forEach(operacion => {
      this.montoTotal += operacion['controls']['monto'].value;
    })
    if (this.montoTotal != this.form.monto.value) {
      let indexUltimaOperacion = this.operaciones.controls.length - 1;
      this.operaciones.controls[indexUltimaOperacion]['controls']['monto'].setValue(this.operaciones.controls[indexUltimaOperacion]['controls']['monto'].value + (this.montoPagar - this.montoTotal))
      this.calcularMontos();
    }
  }


  cambioCaja(index) {
    if (this.operaciones.controls[index]['controls']['cajaId'].value != null) {
      this.listaOperaciones[index].datos = this.listaCajas.find(fo => fo.id === this.operaciones.controls[index]['controls']['cajaId'].value);
      this.listaOperaciones[index].tituloDetalle = 'Detalle de Caja';
    } else {
      this.listaOperaciones[index].datos = undefined;
    }
  }

  cambiaBanco(index) {
    delete this.listaOperaciones[index].datos;
    if (this.operaciones.controls[index]['controls']['bancoId'].value != null) {
      this.operaciones.controls[index]['controls']['cuentaBancoId'].setValue(null);
      this.cuentaBancoService.getCuentasBanco(1000, 1, 'id', false, '', this.operaciones.controls[index]['controls']['bancoId'].value).subscribe(data => {
        this.listaOperaciones[index].listaCuentasBanco = data.content
      }, error => { this.notificacionService.alertError(error) }
      )
    } else {
      this.operaciones.controls[index]['controls']['cuentaBancoId'].setValue(null)
      this.listaOperaciones[index].listaCuentasBanco = []
    }
  }

  cambioCuentaBancaria(index) {
    if (this.operaciones.controls[index]['controls']['cuentaBancoId'].value != null) {
      this.listaOperaciones[index].datos = this.listaOperaciones[index].listaCuentasBanco.find(lop => lop.id === this.operaciones.controls[index]['controls']['cuentaBancoId'].value)
      this.listaOperaciones[index].tituloDetalle = 'Detalle de Cuenta Bancaria'
    } else {
      this.listaOperaciones[index].datos = undefined
    }
  }
}
