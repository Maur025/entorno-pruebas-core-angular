import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BancoService } from "../servicios/banco.service";

@Component({
  selector: "app-formulario-banco",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = "Registro de Banco";
  titulo: any = "Banco";
  routeApi = 'banco';
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
    private BancoService: BancoService
  ) {
    this.service = BancoService;
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
  volver() {
    this.router.navigate([".."], { relativeTo: this.route });
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
              this.router.navigate([".."], { relativeTo: this.route });
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
              this.router.navigate([".."], { relativeTo: this.route });
          },
          (err: any) => {
            this.notificacionService.alertError(err);
          }
        );
      }
    }
  }


  fieldsEntity(data) {
    return {
      id: data.id, //obligatorio
      nombre: data.nombre, //obligatorio
      sigla: data.sigla, //obligatorio
      descripcion: data.descripcion != undefined ? data.descripcion : null,
      url: data.url != undefined ? data.url : null,
      api: data.api != undefined ? data.api : null,
      direccion: data.direccion != undefined ? data.direccion : null,
      telefono: data.telefono != undefined ? data.telefono : null,
    };
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      nombre: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ],
      ],
      sigla: ["",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      descripcion: ["", []],
      url: ["", []],
      api: ["", []],
      direccion: ["", []],
      telefono: ["", []],
    };
  }
}
