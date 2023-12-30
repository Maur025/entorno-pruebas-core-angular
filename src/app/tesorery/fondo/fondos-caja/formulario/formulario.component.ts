import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FondoCajaService } from "src/app/tesorery/services/tesoreria/fondo-caja.service";

@Component({
  selector: 'app-formulario-caja',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioCajaComponent implements OnInit{

  @Input() fondo;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  formGroup: FormGroup;
  submitted = false;

  constructor(
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
    private fondoCajaService: FondoCajaService,

  ){
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    if (this.fondo) {
      this.setFondo();
    }
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      sigla: [, [Validators.required]],
      descripcion: [],
    };
  }

  get form() {
    return this.formGroup.controls;
  }

  setFondo(){
    this.formGroup.setValue({
      id: this.fondo.id,
      nombre: this.fondo.nombre,
      sigla: this.fondo.sigla,
      descripcion: this.fondo.descripcion,
    });
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
