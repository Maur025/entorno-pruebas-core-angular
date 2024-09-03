import { Component, EventEmitter, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ProveedorService } from "src/app/core/services/compras/proveedor.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { AnticipoProveedorService } from "src/app/core/services/tesoreria/anticipo-proveedor.service";
import { BancoService } from "src/app/core/services/tesoreria/banco.service";
import { CentroCostosService } from "src/app/core/services/tesoreria/centro-costos.service";
import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "form-anticipo",
  templateUrl: "./form-anticipo.component.html",
  styleUrls: ["./form-anticipo.component.scss"],
})
export class FormAnticipoComponent {
  formAnticipo: UntypedFormGroup;
  submitted: boolean = false;
  totalAnticipo: number = 0;
  listaProveedores: any[] = [];
  listaCentroCostos: any[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  isStatusSubmit: boolean = false;
  public onSubmitFormStatus: boolean = false;

  constructor(
    public BancoService: BancoService,
    private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    private comprasProveedorService: ProveedorService,
    private centroCostoService: CentroCostosService,
    protected utilityService: UtilityService,
    protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    public anticipoProveedorService: AnticipoProveedorService
  ) {}

  ngOnInit() {
    this.getCentroCostos();
    this.getProveedoresHabilitados("");
    this.setForm();
  }

  setForm() {
    this.formAnticipo = this.formBuilder.group({
      id: "",
      fecha: ["", [Validators.required]],
      proveedorId: ["", [Validators.required]],
      centroCostoId: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      nroReferencia: [""],
      monto: [
        0,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      transacciones: this.formBuilder.array([]),
      proveedor: ["", [Validators.required]],
    });
  }
  get form() {
    return this.formAnticipo.controls;
  }

  recibirMontoTotal(value) {
    this.formAnticipo.get("monto").setValue(value);
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

  getProveedoresHabilitados = (keyword: string) => {
    this.comprasProveedorService
      .getAndFindProveedor(0, 50, "id", false, keyword)
      .subscribe({
        next: (response: ApiResponseStandard) => {
          this.listaProveedores =
            this.responseHandlerService?.handleResponseAsArray(response);
        },
        error: (error: ErrorResponseStandard) =>
          this.notificacionService.alertError(error),
      });
  };

  searchProveedores(event) {
    if (typeof event !== "undefined") {
      if (event?.term?.length > 2) {
        this.comprasProveedorService
          ?.searchProviers(0, 10, "nombre", false, event?.term, false)
          .subscribe({
            next: (response: ApiResponseStandard) => {
              this.listaProveedores =
                this.responseHandlerService?.handleResponseAsArray(response);
            },
            error: (error: ErrorResponseStandard) =>
              this.notificacionService.alertError(error),
          });
      }
    }
  }

  selectProveedor(data) {
    if (typeof event !== "undefined") {
      let proveedor = {};
      proveedor["id"] = data["id"];
      proveedor["nombreComercial"] = data["nombreComercial"];
      proveedor["razonSocial"] = data["nombre"];
      proveedor["nroDocumento"] = data["nitCi"];
      this.formAnticipo.controls["proveedor"].setValue(proveedor);
    }
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formAnticipo.valid) {
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
    if (this.formAnticipo.valid) {
      this.formAnticipo.value["movimientos"] =
        this.formAnticipo.value["transacciones"];
      //console.log(this.formAccionCaja.value)
      this.anticipoProveedorService
        .crearAnticipo(this.formAnticipo.value)
        .subscribe(
          (data) => {
            this.alActualizar.emit(data);
            this.notificacionService.successStandar();
            this.isStatusSubmit = false;
          },
          (error) => this.notificacionService.alertError(error)
        );
    }
    this.submitted = true;
  }
}
