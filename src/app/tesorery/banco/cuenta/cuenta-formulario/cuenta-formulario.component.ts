import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CuentaBancoService } from "src/app/tesorery/services/cuenta-banco.service";
/** Mis importaciones */

@Component({
  selector: 'app-cuenta-formulario',
  templateUrl: './cuenta-formulario.component.html',
  styleUrls: ['./cuenta-formulario.component.scss']
})
export class CuentaFormularioComponent {
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

  @Input() esModal: boolean = false;
  @Input() show_rel: boolean = true;
  @Input() dataEdit: any;
  @Input() rel_prefix: any;
  @Input() rel_field: any = "";
  @Input() rel_id: any = "";


  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private CuentaBancoService: CuentaBancoService
  ) {
    this.service = CuentaBancoService;
  }

  get form() {
    return this.formGroup.controls;
  }

  getDataFromFormname(array, formName) {
    let element = array.find((e) => e.id == this.form[formName].value);
    return element;
  }
  setDataFromFormname(array, formName, data: any) {
    let temp_value = this.form[formName].value;
    let el =
      array[
      array.indexOf(array.find((e) => e.id == this.form[formName].value))
      ];
    Object.keys(data.content).forEach((k) => {
      el[k] = data.content[k];
    });
  }

  alCambiar(control) {
    //console.log("control", control);
  }

  cargarArrays() { }



  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: this.breadCrumbTitle },
      { label: this.titulo, active: true },
    ];
    this.cargarArrays();
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());

    if (this.dataEdit != null) {
      this.formGroup.setValue(this.fieldsEntity(this.dataEdit));
      this.rel_prefix = `/${this.routeApi}/` + this.dataEdit.id;
    }
    let id = this.route.snapshot.params["id"];
    if (this.rel_prefix && this.rel_field)
      this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id != "nuevo") {
      this.service.find(id).subscribe((result: any) => {
        if (result.content.length == 0) return;

        if (Array.isArray(result.content)) this.dataEdit = result.content[0];
        else this.dataEdit = result.content;

        this.formGroup.setValue(this.fieldsEntity(this.dataEdit));
        this.rel_prefix = `/${this.routeApi}/` + id;
        this.rel_id = id;
      });
    }
  }
  arrayToSingle(posibleArray) {
    if (Array.isArray(posibleArray))
      if (posibleArray.length > 0) return posibleArray[0];
      else return {};
    return posibleArray;
  }
  volver(level: number = 1) {
    this.router.navigate([this.subLevelNro(level)], { relativeTo: this.route });
  }

  subLevelNro(level: number = 1): string {
    let filelevel = "..";
    for (let index = 1; index < level; index++) {
      filelevel += "/..";
    }
    return filelevel;
  }
  cleanForm(data: any) {
    return Object.fromEntries(Object.entries(data).filter((value) => value[1]));
  }

  guardar() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;

      if (this.rel_prefix && this.rel_field) {
        this.formGroup.enable(); //*
        this.formGroup.get(this.rel_field).setValue(this.rel_id); //*
      }
      let sendData = this.cleanForm(this.formGroup.value);

      if (this.dataEdit == null) {
        this.service.register(sendData).subscribe(
          (res: any) => {
            this.notificacionService.successStandar();
            this.alGuardar.emit(res);
            if (!this.esModal)
              this.volver();
          },
          (err: any) => {
            this.notificacionService.alertError(err);
          }
        );
      } else {
        this.service.update(sendData, this.dataEdit.id).subscribe(
          (res: any) => {
            this.notificacionService.successStandar();
            this.alActualizar.emit(res);
            if (!this.esModal)
              this.volver(this.levelNavigate);
          },
          (err: any) => {
            this.notificacionService.alertError(err);
          }
        );
      }
    }
  }

  /**
   * {
      "nroCuenta",
      "descripcion",
      "bancoId",
      "monedaId"
    }
 */
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
      descripcion: ["", [Validators.minLength(2)]],
      bancoId: ["", [Validators.required]],
      monedaId: ["", [Validators.required]],

    };
  }
}
