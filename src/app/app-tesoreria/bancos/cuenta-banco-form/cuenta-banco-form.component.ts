import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { BancoService } from "src/app/core/services/tesoreria/banco.service";
import { CentroCostosService } from "src/app/core/services/tesoreria/centro-costos.service";
import { CuentaBancoService } from "src/app/core/services/tesoreria/cuenta-banco.service";
import { MonedaService } from "src/app/core/services/tesoreria/moneda.service";
import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { ResponseDataStandard } from "src/app/shared/interface/common-list-interface";
import { UtilityService } from "src/app/shared/services/utilityService.service";
import { tap, catchError } from 'rxjs/operators';
import { ArchivosService } from 'src/app/core/services/archivos.service'
import { of } from 'rxjs';

@Component({
  selector: "cuenta-banco-form",
  templateUrl: "./cuenta-banco-form.component.html",
  styleUrls: ["./cuenta-banco-form.component.scss"],
})
export class CuentaBancoFormComponent {
  @Input() idBanco: string;
  @Input() nombreBanco: string;
  @Input() datosBanco: any;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  isStatusSubmit: boolean = false;
  formCuentaBanco: UntypedFormGroup;
  public submitted: boolean = false;
  public onSubmitFormStatus: boolean = false;
  public listaMonedas: ResponseDataStandard[] = [];
  labelTipoApertura: string = "Apertura de cuenta de banco con saldo inicial";
  valueInicializacion: boolean = true;
  totalTransferencia = 0;
  fechaActual2;
  fechaActual;
  listaCentroCostos: any[] = [];

  public transferMediumList: ResponseDataStandard[] = [];

  constructor(
    public BancoService: BancoService,
    private monedaService: MonedaService,
    private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    private cuentaBancoService: CuentaBancoService,
    protected utilityService: UtilityService,
    protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    private centroCostosService: CentroCostosService,
		public archivosService: ArchivosService
  ) {}

  ngOnInit() {
    this.getMonedas();
    this.setForm();
    this.getCentroCostos();
  }

  get form() {
    return this.formCuentaBanco.controls;
  }

  setForm() {
    this.formCuentaBanco = this.formBuilder.group({
      id: "",
      nroCuenta: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      bancoId: [this.datosBanco["id"], [Validators.required]],
      monedaId: [null, [Validators.required]],
      inicializacion: [true],
      montoCuenta: ["", [Validators.required]],
      fecha: [null, [Validators.required]],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      centroCostoId: ["", [Validators.required]],
    });
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

  getMonedas = (): void => {
    this.monedaService.habilitados().subscribe({
      next: (response: ApiResponseStandard) => {
        this.listaMonedas =
          this.responseHandlerService?.handleResponseAsArray(response);
      },
      error: (error: ErrorResponseStandard) => {
        this.notificacionService.alertError(error);
      },
    });
  };

  onChangeSwitchTransferType = (event): void => {
    this.valueInicializacion = event;
    if (event) {
      this.labelTipoApertura = "Apertura de cuenta de banco con saldo inicial";
    } else {
      this.labelTipoApertura =
        "Apertura de cuenta de banco con Transferencia de cuenta(s) existente(s)";
      this.formCuentaBanco["addControl"](
        "transacciones",
        this.formBuilder.array([])
      );
    }
  };

  recibirMontoTotal(monto) {
    this.totalTransferencia = monto;
    this.formCuentaBanco.get("montoCuenta").setValue(monto);
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formCuentaBanco.valid) {
      this.isStatusSubmit = false;
      return;
    }
    const dataImg = await this.screenshotService?.takeScreenshot(
      "accountFormModalBodyDiv"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) {
        this.guardarForm();
      } else {
        this.isStatusSubmit = false;
      }
    });
  };

  guardarForm() {
    if (this.formCuentaBanco.valid) {
      this.formCuentaBanco.value["movimientosCuentaBanco"] = this
        .formCuentaBanco.value["transacciones"]
        ? this.formCuentaBanco.value["transacciones"]
        : null;
      this.formCuentaBanco.value["fechaCuenta"] =
        this.formCuentaBanco.value["fecha"];
      this.cuentaBancoService.register(this.formCuentaBanco.value).subscribe(
        (data) => {
          this.alActualizar.emit(data);
          this.notificacionService.successStandar();
          this.isStatusSubmit = false;
          this.descargarComprobante(data['data']['id']);
        },
        (error) => {
          this.notificacionService.alertError(error);
          this.isStatusSubmit = false;
        }
      );
    }
    this.submitted = true;
  }

  alAperturar() {
    this.cerrarModal.emit();
  }


  descargarComprobante(id) {
    this.cuentaBancoService.generarComprobanteCuenta(id).pipe(
      tap((data) => {
        this.archivosService.generar64aPDF(data['data'].content, data['data'].name);
      }),
      catchError((error) => {
        this.notificacionService.alertError(error);
        return of(null);
      })
    ).subscribe();
	}
}
