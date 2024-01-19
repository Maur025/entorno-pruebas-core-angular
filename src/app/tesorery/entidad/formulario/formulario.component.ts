import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EntidadService } from "src/app/tesorery/services/tesoreria/entidad.service";
import { ProveedorService } from "src/app/tesorery/services/compras/proveedor.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";

@Component({
  selector: 'app-formulario-entidad',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() entidad;
  listaEntidades: any;
  submitted= false;
  formGroup: FormGroup;
  datos_entidad: any;
  datos_nitCi: any;
  tipoId = true;
  entidades = {};
  id: any;
  entidadTipos: any;
  tipos = [];
  tiposAnteriores = [];

  constructor(
    private FormBuilder: FormBuilder,
    private entidadService: EntidadService,
    private proveedorService: ProveedorService,
    private notificacionService: NotificacionService,
  ){}

  ngOnInit(): void {
    this.getEntidades();
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    this.cambioTipo();
    if (this.entidad) {
      this.setEntidad();
    }
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      nitCi: [, [Validators.minLength(2)]],
      tipoId: [, [Validators.required]],
      refId: [],
    };
  }

  get form() {
    return this.formGroup.controls;
  }

  setEntidad(){
    this.formGroup.setValue({
      id: this.entidad.id,
      nombre: this.entidad.nombre,
      nitCi: this.entidad.nitCi,
      tipoId: '',
      refId: this.entidad.refId ? this.entidad.refId : null
    });
    this.form.nombre.disable();
    this.form.nitCi.disable();
    this.entidad.entidadReferencial.forEach(e => {
      this.tipos.push(e.tipoEntidadId);
      this.tiposAnteriores.push(e.tipoEntidadId);
    });
  }

  getEntidades(){
    this.entidadService.getTipoEntidad().subscribe(data => {
      this.listaEntidades = data.content;
      this.listaEntidades.forEach(entidad  => {
        this.entidades[entidad.id] = entidad.tipo;
      });
    });
  }

  cambioTipo(){
    if (!this.entidad) {
      if (this.form.tipoId.value != null){
        this.tipoId = false
        this.form.nombre.enable();
        this.form.nitCi.enable();
      } else {
        this.tipoId = true;
        this.form.nombre.disable();
        this.form.nitCi.disable();
      }
    }
  }

  cambioEntidad(event){
    if (event != undefined ) {
      if (event.id) {
        this.form['refId'].setValue(event.id);
        this.form['nombre'].setValue(event.nombre);
        this.form['nitCi'].setValue(event.nitCi);
      } else {
        this.form['refId'].setValue(null);
      }
    }
  }

  buscar(e){
    if (this.form.tipoId.value != null){
      if (e.term.length >= 3) {
        let searchTerm = e.term.toLocaleUpperCase();
        this.buscarPorTipo(searchTerm, this.entidades[this.form.tipoId.value]);
      }
    }
  }

  buscarPorTipo(keyword, tipo){
    switch (tipo) {
      case "CLIENTE":
        /* busca en el modulo de ventas */
        break;
      case "PROVEEDOR":
        /* busca en el modulo de compras */
        this.proveedorService.searchProveedor(keyword).subscribe(data =>{
          this.datos_entidad = data.content;
        })
        break;
      case "EMPLEADO":
        /* busca en el congif */
        break;
      default:
        break;
    }
  }

  guardar() {
    this.submitted = true;
    if (this.entidad) {
      this.tipos.forEach(t => {
        if (!this.tiposAnteriores.includes(t)) {
          let data = {};
          data['tipoEntidadId'] = t;
          data['entidadId'] = this.entidad.id;
          this.entidadService.registerTipoEntidad(data).subscribe((data) => {
          }, (error) => {
            this.notificacionService.alertError(error);
          });
        }
      });
      this.tiposAnteriores.forEach(ti => {
        if (!this.tipos.includes(ti)) {
          let data = {};
          data['tipoEntidadId'] = ti;
          data['entidadId'] = this.entidad.id;
          this.entidadService.deleteEntidadTipo(data).subscribe((res) => {
          }, (error) => {
            this.notificacionService.alertError(error);
          });
        }
      });
      this.notificacionService.successStandar("Registros guardados exitosamente");
      this.alActualizar.emit();
    } else {
      if (this.formGroup.valid) {
        let data = this.formGroup.value;
        this.entidadService.register(data).subscribe(
          (res: any) => {
            let datos = {};
            datos['entidadId'] = res.content.id;
            datos['tipoEntidadId'] = data.tipoId;
            this.entidadService.registerTipoEntidad(datos).subscribe(result =>{
              this.notificacionService.successStandar();
              this.alActualizar.emit();
            })
          },
          (err: any) => {
            this.notificacionService.alertError(err);
          }
        );
      }
    }
  }

}
