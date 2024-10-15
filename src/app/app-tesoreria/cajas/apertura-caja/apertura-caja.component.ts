import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { CentroCostosService } from "src/app/core/services/tesoreria/centro-costos.service";
import { MovimientoCajaService } from "src/app/core/services/tesoreria/movimiento-caja.service";
import { ApiResponseStandard, ErrorResponseStandard } from "src/app/shared/interface/common-api-response";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "apertura-caja",
  templateUrl: "./apertura-caja.component.html",
  styleUrls: ["./apertura-caja.component.scss"],
})
export class AperturaCajaComponent {
  @Input() datosCaja: any;
  @Output() alActualizar = new EventEmitter<void>();
  @Output() cerrarModal = new EventEmitter<void>();
  labelOperacion: string = "";
  modalRef?: BsModalRef;
  formAccionCaja: UntypedFormGroup;
  submitted: boolean = false;
  totalApertura: number = 0;
  fechaActual2;
  fechaActual;
  isStatusSubmit: boolean = false;
  protected onSubmitFormStatus: boolean = false;
  listaCentroCostos: any[] = [];

  constructor(
    private movimientoCajaService: MovimientoCajaService,
    private formBuilder: UntypedFormBuilder,
    private notificacionService: NotificacionService,
    private screenshotService: ScreenshotService,
    protected utilityService: UtilityService,
    private centroCostosService:CentroCostosService,
    private responseHandlerService: ResponseHandlerService,
  ) {}

  ngOnInit() {
    if (this.datosCaja) {
      this.labelOperacion = !this.datosCaja["aperturado"]
        ? "Apertura de Caja"
        : "Cierre de Caja";
    }

    this.setForm();
    this.getCentroCostos();
  }

  setForm() {
    this.formAccionCaja = this.formBuilder.group({
      id: "",
      cajaId: [this.datosCaja["id"], [Validators.required]],
      montoApertura: ["", [Validators.required]],
      fecha: [this.fechaActual2, Validators.required],
      descripcionApertura: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      centroCostoId: [null, [Validators.required]],
      transacciones: this.formBuilder.array([]),
    });
  }
  get form() {
    return this.formAccionCaja.controls;
  }

  getCentroCostos() {
    this.centroCostosService.habilitados().subscribe({
      next: (response: ApiResponseStandard) => {
        this.listaCentroCostos =
          this.responseHandlerService?.handleResponseAsArray(response);
      },
      error: (error: ErrorResponseStandard) =>
        this.notificacionService.alertError(error),
    });
  }

  recibirMontoTotal(monto) {
    this.totalApertura = monto;
    this.formAccionCaja.get("montoApertura").setValue(monto);
  }

  guardarForm() {
    if (this.formAccionCaja.valid) {
      this.formAccionCaja.value["movimientoCajas"] = this.formAccionCaja.value["transacciones"];
      this.formAccionCaja.value["fechaApertura"] = this.formAccionCaja.value["fecha"];
      this.movimientoCajaService
        .movimientoApertura(this.formAccionCaja.value)
        .subscribe(
          (data) => {
            this.alActualizar.emit(data);
            this.isStatusSubmit = false;
            this.notificacionService.successStandar();
          },
          (error) => this.notificacionService.alertError(error)
        );
    }
    this.submitted = true;
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formAccionCaja.valid) {
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

  alAperturar() {
    this.cerrarModal.emit();
  }

}
