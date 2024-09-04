import { Component, EventEmitter, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { CentroCostosService } from "src/app/core/services/tesoreria/centro-costos.service";
import { EmpleadoService } from "src/app/core/services/tesoreria/empleado.service";
import { FondoRendirService } from "src/app/core/services/tesoreria/fondo-rendir.service";
import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "form-desembolso",
  templateUrl: "./form-desembolso.component.html",
  styleUrls: ["./form-desembolso.component.scss"],
})
export class FormDesembolsoComponent {
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  formDesembolso: UntypedFormGroup;
  submitted: boolean = false;
  totalAnticipo: number = 0;
  listaResponsables: any[] = [];
  listaCentroCostos: any[] = [];
  isStatusSubmit: boolean = false;

  public onSubmitFormStatus: boolean = false;

  constructor(
    private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    private empleadoService: EmpleadoService,
    private centroCostoService: CentroCostosService,
    protected utilityService: UtilityService,
    protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    public fondoRendirService: FondoRendirService
  ) {}

  ngOnInit() {
    this.getCentroCostos();
    this.getEmployeesList();
    this.setForm();
  }

  setForm() {
    this.formDesembolso = this.formBuilder.group({
      id: "",
      fecha: ["", [Validators.required]],
      empleadoId: ["", [Validators.required]],
      centroCostoId: ["", [Validators.required]],
      descripcionDesembolso: ["", [Validators.required]],
      nroReferencial: [""],
      importeDesembolso: [
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
    return this.formDesembolso.controls;
  }

  recibirMontoTotal(value) {
    this.formDesembolso.get("importeDesembolso").setValue(value);
  }

  alAperturar() {
    this.cerrarModal.emit();
  }

  getCentroCostos = () => {
    this.centroCostoService.habilitados().subscribe({
      next: (response: ApiResponseStandard) =>
        (this.listaCentroCostos =
          this.responseHandlerService?.handleResponseAsArray(response)),
      error: (error: ErrorResponseStandard) =>
        this.notificacionService.alertError(error),
    });
  };

  getEmployeesList = (): void => {
    this.empleadoService?.listarHabilitados().subscribe({
      next: (response: ApiResponseStandard) => {
        this.listaResponsables =
          this.responseHandlerService?.handleResponseAsArray(response);
      },
      error: (error: ErrorResponseStandard) => {
        this.notificacionService?.alertError(error);
      },
    });
  };

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formDesembolso.valid) {
      this.isStatusSubmit = false;
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
    if (this.formDesembolso.valid) {
      this.formDesembolso.value["movimientos"] =
        this.formDesembolso.value["transacciones"];
      this.formDesembolso.value["fechaDesembolso"] =
        this.formDesembolso.value["fecha"];
      this.fondoRendirService.desembolso(this.formDesembolso.value).subscribe(
        (data) => {
          this.alActualizar.emit(data);
          this.notificacionService.successStandar();
          this.isStatusSubmit = false;
        },
        (error) => {
          this.notificacionService.alertError(error);
          this.isStatusSubmit = false;
        }
      );
    }
    this.submitted = true;
  }
}
