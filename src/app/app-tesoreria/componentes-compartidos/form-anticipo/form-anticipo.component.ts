import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ProveedorService } from "src/app/core/services/compras/proveedor.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { AnticipoClienteService } from "src/app/core/services/tesoreria/anticipo-cliente.service";
import { AnticipoProveedorService } from "src/app/core/services/tesoreria/anticipo-proveedor.service";
import { BancoService } from "src/app/core/services/tesoreria/banco.service";
import { CentroCostosService } from "src/app/core/services/tesoreria/centro-costos.service";
import { ClienteService } from "src/app/core/services/ventas/clientes.service";
import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "app-form-anticipo",
  templateUrl: "./form-anticipo.component.html",
  styleUrls: ["./form-anticipo.component.scss"],
})
export class FormAnticipoComponent {
  private _clienteService = inject(ClienteService);
  formAnticipo: UntypedFormGroup;
  submitted: boolean = false;
  totalAnticipo: number = 0;
  listaProveedores: any[] = [];
  listaCentroCostos: any[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  @Input() title: string = "";
  @Input() label: string = "";
  @Input() data: any = [];
  @Input() type: boolean;
  isStatusSubmit: boolean = false;
  public onSubmitFormStatus: boolean = false;
  dataReceived: any = [];

  constructor(
    public BancoService: BancoService,
    private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    private comprasProveedorService: ProveedorService,
    private centroCostoService: CentroCostosService,
    protected utilityService: UtilityService,
    protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    public anticipoProveedorService: AnticipoProveedorService,
    public anticipoClienteService: AnticipoClienteService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.getCentroCostos();
    this.setForm();
    if (this.type) {
      this.getClients();
    } else {
      this.getProveedoresHabilitados("");
    }
  }

  setForm() {
    this.formAnticipo = this.formBuilder.group({
      id: "",
      fecha: ["", [Validators.required]],
      clienteRefId: [""],
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

  getClients = () => {
    this._clienteService.getAll(100, 1, "id", false, "").subscribe({
      next: (data) => {
        this.data = data;
        console.log("DATA: ", this.data)
      },
      error: (err) => console.log(err),
    });
  };

  searchData(event) {
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

  selectData(data) {
    if (typeof event !== "undefined") {
      this.formAnticipo.addControl(
        "clienteNombreComercial",
        this.formBuilder.control(data["nombre"], [Validators.required])
      );
      this.formAnticipo.addControl(
        "clienteRazonSocial",
        this.formBuilder.control(data["nombre"], [Validators.required])
      );
      this.formAnticipo.addControl(
        "clienteNroDocumento",
        this.formBuilder.control(data["documentoNumero"], [Validators.required])
      );
    }
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    const formData = this.prepareFormData(this.formAnticipo.value);

    if (!this.formAnticipo.valid) {
      console.log("aqui");
      this.isStatusSubmit = false;
      return;
    }
    const dataImg = await this.screenshotService?.takeScreenshot(
      "accountFormModalBodyDiv"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) this.guardarForm(formData);
      else this.isStatusSubmit = false;
    });
  };
  guardarForm(dataForm) {
    if (this.formAnticipo.valid) {
      dataForm["movimientos"] = this.formAnticipo.value["transacciones"];
      this.anticipoClienteService.crearAnticipo(dataForm).subscribe({
        next: (data) => {
          this.isStatusSubmit = false;
          this.alActualizar.emit(data);
          this.notificacionService.successStandar();
        },
        error: (error) => this.notificacionService.alertError(error),
      });
    }
    this.submitted = true;
  }

  private prepareFormData(data: any): any {
    const newData = { ...data };
    // Renombrar el campo 'oldName' a 'newName'
    if (newData.fecha && newData.descripcion && newData.monto) {
      newData.montoTotal = newData.monto;
      newData.fechaAnticipo = newData.fecha;
      newData.descripcionAnticipo = newData.descripcion;
      delete newData.fecha;
      delete newData.descripcion;
      delete newData.monto;
    }
    // Agregar aquí cualquier otro ajuste necesario en los datos
    return newData;
  }
}
