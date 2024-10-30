import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { EstadosFondoRendir } from "src/app/core/models/estados-tesoreria.model";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { FondoRendirService } from "src/app/core/services/tesoreria/fondo-rendir.service";
import { UtilityService } from "src/app/shared/services/utilityService.service";
import { tap, catchError } from 'rxjs/operators';
import { ArchivosService } from 'src/app/core/services/archivos.service'
import { of } from 'rxjs';

@Component({
  selector: "form-pago",
  templateUrl: "./form-pago.component.html",
  styleUrls: ["./form-pago.component.scss"],
})
export class FormPagoComponent {
  formPago: UntypedFormGroup;
  submitted: boolean = false;
  montoPagarSelect: number = 0;
  listaResponsables: any[] = [];
  listaCentroCostos: any[] = [];
  isStatusSubmit: boolean = false;
  @Input() fondoRendirData: any;
  @Input() operacion: any;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  public onSubmitFormStatus: boolean = false;
  labelTitle = "";
  labelFecha = "";
  labelMonto = "";

  constructor(
    private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    protected utilityService: UtilityService,
    protected screenshotService: ScreenshotService,
		public archivosService: ArchivosService,
    public fondoRendirService: FondoRendirService
  ) {}

  ngOnInit() {
    this.setForm();
    this.fieldByOperation();
  }

  get form() {
    return this.formPago.controls;
  }

  setForm() {
    this.formPago = this.formBuilder.group({
      id: [],
      fecha: ["", [Validators.required]],
      fondoRendirId: ["", [Validators.required]],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      montoPagar: [
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

  alAperturar() {
    this.cerrarModal.emit();
  }

  fieldByOperation() {
    if (this.operacion == EstadosFondoRendir.PAGO_REEMBOLSO) {
      this.labelTitle = "Pago por reembolso al empleado";
      this.labelFecha = "(*)Fecha pago reembolso";
      this.labelMonto = "Monto total por reembolso";
    }
    if (this.operacion == EstadosFondoRendir.DEVOLUCION) {
      this.labelTitle = "Pago por devolución del empleado";
      this.labelFecha = "(*)Fecha pago devolucion";
      this.labelMonto = "Monto total por devolución";
    }
  }

  recibirMontoPago(monto) {
    this.formPago.controls["montoPagar"].setValue(monto);
  }

  recibirMontoReembolsaDevolucion(reembolsoDevolucion) {
    this.formPago.controls["fondoRendirId"].setValue(
      reembolsoDevolucion["fondoRendirId"]
    );
    this.montoPagarSelect = reembolsoDevolucion["montoPagar"];
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    let verificar = this.verificarMontos();
    if (!this.formPago.valid || verificar == false) {
      this.isStatusSubmit = false;
      return;
    }
    const dataImg = await this.screenshotService?.takeScreenshot(
      "accountFormModalBodyDiv"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) this.guardar();
      this.isStatusSubmit = false;
    });
  };

  verificarMontos() {
    const totalsCero =
      Number(this.montoPagarSelect) === 0 &&
      this.formPago.controls["montoPagar"].value == 0;
    if (totalsCero) {
      this.notificacionService.warningMessage(
        "No ha seleccionado ningun reeembolso pendiente y el monto total de reembolso es 0."
      );
      return false;
    }

    if (
      this.formPago.controls["montoPagar"].value !==
      Number(this.montoPagarSelect)
    ) {
      this.notificacionService.warningMessage(
        `El monto total de ${this.operacion} en monto ingresado para el fondo a rendir a ${this.operacion} deben coincidir`
      );
      return false;
    }
    return true;
  }

  guardar() {
    if (this.operacion == EstadosFondoRendir.PAGO_REEMBOLSO) {
      this.guardarPagoReembolso();
    }
    if (this.operacion == EstadosFondoRendir.DEVOLUCION) {
      this.guardarDevolucion();
    }
  }

  guardarDevolucion() {
    this.formPago.value["fechaPagoDevolucion"] = this.formPago.value["fecha"];
    this.formPago.value["montoADevolver"] = this.formPago.value["montoPagar"];
    this.formPago.value["movimientos"] = this.formPago.value["transacciones"];

    this.fondoRendirService.pagoDevolucion(this.formPago.value).subscribe(
      (data) => {
        this.alActualizar.emit(data);
        this.isStatusSubmit = false;
        this.notificacionService.successStandar();
        this.descargarComprobante(data['data']['id']);
      },
      (error) => this.notificacionService.alertError(error)
    );
  }

  guardarPagoReembolso() {
    this.formPago.value["fechaPagoReembolso"] = this.formPago.value["fecha"];
    this.formPago.value["montoReembolso"] = this.formPago.value["montoPagar"];
    this.formPago.value["movimientos"] = this.formPago.value["transacciones"];
    this.fondoRendirService.pagoReembolso(this.formPago.value).subscribe(
      (data) => {
        this.alActualizar.emit(data);
        this.isStatusSubmit = false;
        this.notificacionService.successStandar();
        this.descargarComprobante(data['data']['id']);
      },
      (error) => this.notificacionService.alertError(error)
    );
  }

  descargarComprobante(id) {
    this.fondoRendirService.generarComprobante(id).pipe(
      tap((data) => {
        this.archivosService.generar64aPDF(data['data'].content, 'comprobante_fondo_rendir.pdf');
      }),
      catchError((error) => {
        this.notificacionService.alertError(error);
        return of(null);
      })
    ).subscribe();
	}
}
