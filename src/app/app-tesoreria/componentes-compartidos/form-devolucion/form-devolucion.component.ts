import { Component, inject, Input, Output, EventEmitter } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { AnticipoClienteService } from "src/app/core/services/tesoreria/anticipo-cliente.service";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "app-form-devolucion",
  templateUrl: "./form-devolucion.component.html",
  styleUrls: ["./form-devolucion.component.scss"],
})
export class FormDevolucionComponent {
  private anticipoClienteService = inject(AnticipoClienteService);
  @Input() datosCliente;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  submitted: boolean = false;
  formDevolucionAnticipo: UntypedFormGroup;
  saldoAnticipo: number = 0;
  isStatusSubmit: boolean = false;
  protected onSubmitFormStatus: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private notificacionService: NotificacionService,
    private screenshotService: ScreenshotService,
    protected utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.formDevolucionAnticipo = this.formBuilder.group({
      id: "",
      fecha: ["", [Validators.required]],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      anticipoClienteId: ["", [Validators.required]],
      monto: [
        0,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      ventaId: [""],
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
    this.formDevolucionAnticipo.controls["anticipoClienteId"].setValue(
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
        "No ha seleccionado ningun anticipo y el monto devolucion es 0."
      );
      return false;
    }

    if (
      this.formDevolucionAnticipo.controls["monto"].value > this.saldoAnticipo
    ) {
      this.notificacionService.warningMessage(
        "El monto de devolucion no debe sobre pasar al monto del saldo del anticipo"
      );
      return false;
    }
    return true;
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    let verificacion = this.verificarMontos();
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formDevolucionAnticipo.valid || verificacion == false) {
      this.isStatusSubmit = false;
      return;
    }
    const dataImg = await this.screenshotService?.takeScreenshot(
      "accountFormModalBodyDiv"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) this.guardarForm();
      this.isStatusSubmit = false;
    });
  };

  guardarForm() {
    if (this.formDevolucionAnticipo.valid) {
      this.formDevolucionAnticipo.value["movimientos"] =
        this.formDevolucionAnticipo.value["transacciones"];
      const newData = { ...this.formDevolucionAnticipo.value };
      newData.fechaDevolucion = newData.fecha;
      delete newData.fecha;
      this.anticipoClienteService.crearDevolucionAnticipo(newData).subscribe(
        (data) => {
          this.alActualizar.emit(data);
          this.isStatusSubmit = false;
          this.notificacionService.successStandar();
        },
        (error) => this.notificacionService.alertError(error)
      );
    }
  }
}
