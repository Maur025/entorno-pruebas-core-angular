import {
  Component,
  Input,
  EventEmitter,
  Output,
  inject,
  OnInit,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { CuentasUltimoNivelService } from "src/app/core/services/contabilidad/cuentas-ultimo-nivel.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { CentroCostosService } from "src/app/core/services/tesoreria/centro-costos.service";
import { PagosVariosService } from "src/app/core/services/tesoreria/pagos-varios.service";
import { TipoOtrosPagosService } from "src/app/core/services/tesoreria/tipos-otros-pagos-varios.service";
import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "app-pagos-varios-form",
  templateUrl: "./pagos-varios-form.component.html",
  styleUrls: ["./pagos-varios-form.component.scss"],
})
export class PagosVariosFormComponent implements OnInit {
  @Input() type: boolean;
  @Input() label: string = "";
  @Input() data: any;
  @Input() title: string = "";
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  private _pagosVariosService = inject(PagosVariosService);
  private notificacionService = inject(NotificacionService);
  private formBuilder = inject(UntypedFormBuilder);
  private _centroCostoService = inject(CentroCostosService);
  private _contaCuentasService = inject(CuentasUltimoNivelService);
  private _tipoOtrosPagosService = inject(TipoOtrosPagosService);
  protected utilityService = inject(UtilityService);
  protected screenshotService = inject(ScreenshotService);
  private responseHandlerService = inject(ResponseHandlerService);

  submitted: boolean = false;
  formPagosVarios: UntypedFormGroup;
  listaCentroCostos: any[] = [];
  isStatusSubmit: boolean = false;
  public onSubmitFormStatus: boolean = false;
  dataReceived: any = [];

  dataTipo: any;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.getCentroCostos();
    this.getAccountingAccounts();
    this.setForm();
    this.getTiposOtrosPagos();
  }

  setForm() {
    this.formPagosVarios = this.formBuilder.group({
      id: "",
      fecha: ["", [Validators.required]],
      cuentaContableId: ["", [Validators.required]],
      centroCostoId: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      total: [0, [Validators.required]],
      transacciones: this.formBuilder.array([]),
      tipoOtroPagoId: ["", [Validators.required]],
      nombreCuentaContable: ["", [Validators.required]],
      codigoCuentaContable: ["", [Validators.required]],
    });
  }
  get form() {
    return this.formPagosVarios.controls;
  }

  getTiposOtrosPagos = () => {
    this._tipoOtrosPagosService.getAll(false).subscribe({
      next: (data) => {
        this.dataTipo = data;
      },
      error: (err) => this.notificacionService.alertErrorOnlyMessage(err),
    });
  };

  getAccountingAccounts = () => {
    this._contaCuentasService.getAll(false).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => this.notificacionService.alertErrorOnlyMessage(err),
    });
  };

  alAperturar() {
    this.cerrarModal.emit();
  }

  getCentroCostos = () => {
    this._centroCostoService.habilitados().subscribe({
      next: (response: ApiResponseStandard) =>
        (this.listaCentroCostos =
          this.responseHandlerService?.handleResponseAsArray(response)),
      error: (error: ErrorResponseStandard) =>
        this.notificacionService.alertError(error),
    });
  };

  selectData(data) {
    if (typeof event !== "undefined") {
      this.formPagosVarios.get("cuentaContableId").setValue(data.id);
      this.formPagosVarios.get("nombreCuentaContable").setValue(data.nombre);
      this.formPagosVarios.get("codigoCuentaContable").setValue(data.codigo);
    }
  }

  recibirMontoTotal(value) {
    this.formPagosVarios.get("total").setValue(value);
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    const formData = this.formPagosVarios.value;
    if (!this.formPagosVarios.valid) {
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
    if (this.formPagosVarios.valid) {
      dataForm["movimientos"] = this.formPagosVarios.value["transacciones"];
      this._pagosVariosService.register(dataForm).subscribe({
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
}
