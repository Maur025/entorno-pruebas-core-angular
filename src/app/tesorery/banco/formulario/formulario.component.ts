import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BancoService } from "../../services/tesoreria/banco.service";
import { FuncionesComponent } from "../../funciones.component";

@Component({
  selector: 'app-formulario-de-banco',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent extends FuncionesComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = "Gestión de Banco";
  levelNavigate = 2;
  service = null;
  formGroup: FormGroup;
  submitted = false;
  @Input() banco;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private bancoService: BancoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setForm();
    if (this.banco) {
      this.setBanco();
    }
  }

  setForm() {
    this.formGroup = this.FormBuilder.group({
      id: ["", []],
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      sigla: ["", [Validators.minLength(2), Validators.maxLength(255)]],
      descripcion: ["", []],
      url: ["", []],
      direccion: ["", []],
      telefono: ["", []],
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  setBanco() {
    this.formGroup.setValue({
      id: this.banco.id,
      nombre: this.banco.nombre,
      sigla: this.banco.sigla,
      descripcion: this.banco.descripcion,
      telefono: this.banco.telefono,
      direccion: this.banco.direccion,
      url: this.banco.url,
    });
  }

  guardar() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;
      if (this.banco) {
        this.bancoService.update(this.formGroup.value).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alActualizar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        });
      } else {
        this.bancoService.register(this.formGroup.value).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alActualizar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        });
      }
    }
  }

  regresar() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
