import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { BancoService } from "../../../services/tesoreria/banco.service";
import { MonedaService } from "../../../services/tesoreria/monedas.service";

@Component({
  selector: 'app-cuenta-formulario',
  templateUrl: './cuenta-formulario.component.html',
  styleUrls: ['./cuenta-formulario.component.scss']
})
export class CuentaFormularioComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = "Gestión de Cuentas-Banco";
  titulo: any = "Cuentas-Banco";
  routeApi = 'cuentaBanco';
  levelNavigate = 2;
  service = null;

  formGroup: FormGroup;
  submitted = false;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() cuenta;
  @Input() idRuta;
  listaBancos: any;
  listaMonedas: any;

  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private cuentaBancoService: CuentaBancoService,
    private bancoService: BancoService,
    private monedaService: MonedaService
  ){}

  ngOnInit(): void {
    this.breadCrumbItems = [ { label: this.breadCrumbTitle },{ label: this.titulo, active: true },];
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    if(this.idRuta) this.form['bancoId'].disable();
    this.getBancos();
    this.getMonedas();
    if (this.cuenta) {
      this.formGroup.setValue({
        id: this.cuenta.id,
        nroCuenta: this.cuenta.nroCuenta,
        descripcion: this.cuenta.descripcion,
        bancoId: this.cuenta.bancoId,
        monedaId: this.cuenta.monedaId,
      });
    } else {
      this.form['bancoId'].setValue(this.idRuta)
    }
  }

  get form() {
    return this.formGroup.controls;
  }

  getBancos(){
    this.bancoService.habilitados().subscribe(data => {
      this.listaBancos = data.content;
    });
  }

  getMonedas(){
    this.monedaService.habilitados().subscribe(data => {
      this.listaMonedas = data.content;
    });
  }

  guardar() {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (this.cuenta) {
        this.cuentaBancoService.update(this.formGroup.value).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alActualizar.emit(res);
        },(err: any) => {
          this.notificacionService.alertError(err);
        }
      );
      } else {
        this.cuentaBancoService.register(this.formGroup.value).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        },(err: any) => {
          this.notificacionService.alertError(err);
        }
      );
      }
    }
  }

  fieldsEntity(data: any) {
    return {
      id: data.id, //obligatorio
      nroCuenta: data.nroCuenta, //obligatorio
      bancoId: data.bancoId, //obligatorio
      monedaId: data.monedaId, //obligatorio
      descripcion: data.descripcion != undefined ? data.descripcion : null

    };
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      nroCuenta: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      descripcion: [, [Validators.minLength(2)]],
      bancoId: [, [Validators.required]],
      monedaId: [, [Validators.required]],
    };
  }
}
