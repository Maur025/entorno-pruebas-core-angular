import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { AnticipoProveedorService } from "src/app/core/services/tesoreria/anticipo-proveedor.service";

@Component({
  selector: "form-devolucion",
  templateUrl: "./form-devolucion.component.html",
  styleUrls: ["./form-devolucion.component.scss"],
})
export class FormDevolucionComponent {
  @Input() datosProveedor;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  submitted: boolean = false;
  formDevolucionAnticipo: UntypedFormGroup;
  saldoAnticipo: number = 0;
  protected onSubmitFormStatus: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private notificacionService: NotificacionService,
    private screenshotService: ScreenshotService,
    private anticipoProveedorService: AnticipoProveedorService
  ) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.formDevolucionAnticipo = this.formBuilder.group({
      id: "",
      fecha: ["", [Validators.required]],
      nroReferencia: [""],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      anticipoProveedorId: ["", [Validators.required]],
      monto: [
        0,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      transacciones: this.formBuilder.array([]),
    });
  }

  get form() {
    return this.formDevolucionAnticipo.controls;
  }

  alAperturar() {
    this.cerrarModal.emit();
  }

  recibirAnticipo(value) {
    this.formDevolucionAnticipo.controls["anticipoProveedorId"].setValue(
      value["id"]
    );
    this.saldoAnticipo = value["saldo"];
  }

  recibirMontoTotal(data) {
    this.formDevolucionAnticipo.get("monto").setValue(data);
  }

  verificarMontos() {
    const totalsCero =
      this.saldoAnticipo === 0 &&
      this.formDevolucionAnticipo.controls["monto"].value == 0;
    if (totalsCero) {
      this.notificacionService.warningMessage(
        "No ha seleccionado un anticipo y el monto devolucion es 0."
      );
      return false;
    }

    if (
      this.saldoAnticipo !== this.formDevolucionAnticipo.controls["monto"].value
    ) {
      this.notificacionService.warningMessage(
        "El saldo del anticipo seleccionado no coindice con el monto devolucion"
      );
      return false;
    }
    return true;
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    let verificacion = this.verificarMontos();
    this.submitted = true;

    if (!this.formDevolucionAnticipo.valid || verificacion==false) {
      return;
    }
    const dataImg = await this.screenshotService?.takeScreenshot(
      "accountFormModalBodyDiv"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) this.guardarForm();
    });
  };

  guardarForm() {
    if(this.formDevolucionAnticipo.valid){
      this.formDevolucionAnticipo.value['movimientos']= this.formDevolucionAnticipo.value['transacciones'];
      //console.log(this.formAccionCaja.value)
      this.anticipoProveedorService.crearDevolucionAnticipo(this.formDevolucionAnticipo.value).subscribe(data=>{
        this.alActualizar.emit(data);
        this.notificacionService.successStandar();
      }, error=>this.notificacionService.alertError(error));
    }
  }
}
