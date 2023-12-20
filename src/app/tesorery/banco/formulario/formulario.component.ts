import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BancoService } from "../../services/tesoreria/banco.service";

@Component({
  selector: 'app-formulario-de-banco',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = "Gestión de Banco";
  titulo: any = "Banco";
  routeApi = 'banco';
  levelNavigate = 2;
  service = null;
  formato: any;
  formGroup: FormGroup;
  submitted = false;
  @Input() banco: any;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() esModal;
  @Input() rel_prefix: any;
  @Input() rel_field: any = "";
  @Input() rel_id: any = "";
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];
  id: any;

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private bancoService: BancoService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    this.formato = {
      cabeceras: {
        "acciones": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Acciones", "colsize": "12", "filtrotipo": "number" },
        "id": { "visible": false, "buscable": true, "buscableCheck": true, "visibleCheck": false, "sortable": true, "filtrable": true, "texto": "ID", "colsize": "12", "filtrotipo": "text" },
        "nombre": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Nombre", "colsize": "12", "filtrotipo": "number" },
        "sigla": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Sigla", "colsize": "12", "filtrotipo": "text" },
        "descripcion": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Descripción", "colsize": "12", "filtrotipo": "text" },
        "telefono": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Telefono", "colsize": "12", "filtrotipo": "text" },
        "direccion": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Dirección", "colsize": "12", "filtrotipo": "text" },
        "url": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Url", "colsize": "12", "filtrotipo": "text" },
        "estado": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Estado", "colsize": "12", "filtrotipo": "text" },
      }
    };
    if (this.route.snapshot.params["id"]) {
      this.id = this.route.snapshot.params["id"];
      this.setBanco();
    }
  }

  get form() {
    return this.formGroup.controls;
  }

  setBanco() {
    this.bancoService.find(this.id).subscribe(data => {
      this.formGroup.setValue({
        id: data.content.id,
        nombre: data.content.nombre,
        sigla: data.content.sigla,
        descripcion: data.content.descripcion,
        telefono: data.content.telefono,
        direccion: data.content.direccion,
        url: data.content.url,
      });
    }, (err: any) => {
      this.notificacionService.alertError(err);
    });
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
      if (this.id) {
        this.bancoService.update(this.formGroup.value).subscribe(
          (res: any) => {
            this.notificacionService.successStandar();
            this.alActualizar.emit(res);
          },
          (err: any) => {
            this.notificacionService.alertError(err);
          }
        );
      } else {
        this.bancoService.register(this.formGroup.value).subscribe(
          (res: any) => {
            this.notificacionService.successStandar();
            this.alGuardar.emit(res);
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
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      sigla: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      descripcion: ["", []],
      url: ["", []],
      direccion: ["", []],
      telefono: ["", []],
    };
  }

  regresar(){
    this.router.navigate(['../..'], {relativeTo: this.route});
  }
}
