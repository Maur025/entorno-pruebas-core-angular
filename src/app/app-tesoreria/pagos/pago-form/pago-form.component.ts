import { Component, EventEmitter, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { ProveedorService } from "src/app/core/services/tesoreria/proveedor.service";
import { ApiResponseStandard, ErrorResponseStandard } from "src/app/shared/interface/common-api-response";

@Component({
  selector: "pago-form",
  templateUrl: "./pago-form.component.html",
  styleUrls: ["./pago-form.component.scss"],
})
export class PagoFormComponent {
  @Output() alActualizar = new EventEmitter<void>();
  @Output() cerrarModal = new EventEmitter<void>();
  breadCrumbItems: object[];
  protected onSubmitFormStatus: boolean = false;

  formPago: UntypedFormGroup;
  submitted: boolean = false;
  listaProveedores:any[]=[];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private notificacionService: NotificacionService,
    private screenshotService: ScreenshotService,
    private proveedorService: ProveedorService,
    private responseHandlerService: ResponseHandlerService,
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Pagos" },
      { label: "Nuevo Pago", active: true },
    ];
    this.setForm();
    this.getProveedoresHabilitados('');
  }

  setForm() {
    this.formPago = this.formBuilder.group({
      id: "",
      fecha: ["", Validators.required],
      proveedorId: ["", [Validators.required]],
      montoPagado: ["", [Validators.required]],
      nroReferencia: [""],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      planPagos: this.formBuilder.array([]),
      transacciones: this.formBuilder.array([]),
    });
  }
  get form() {
    return this.formPago.controls;
  }

  getProveedoresHabilitados = (keyword: string) => {
		this.proveedorService
			.habilitados()
			.subscribe({
				next: (response: ApiResponseStandard) => {
					this.listaProveedores =
						this.responseHandlerService?.handleResponseAsArray(response)
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
	}

  selectProveedor(dato){
    console.log(dato);
  }

  recibirMontoTotal(totalTransaccion){
    console.log(totalTransaccion);
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;

    if (!this.formPago.valid) {
      return;
    }

    const dataImg = await this.screenshotService?.takeScreenshot(
      "accountFormModalBodyDiv"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) this.guardarForm();
    });
  };

  guardarForm() {}
}
