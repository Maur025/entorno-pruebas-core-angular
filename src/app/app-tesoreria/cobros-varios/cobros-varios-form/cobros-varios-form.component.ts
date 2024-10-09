import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';
import { BsModalRef } from "ngx-bootstrap/modal";
import { CuentasUltimoNivelService } from 'src/app/core/services/contabilidad/cuentas-ultimo-nivel.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { CentroCostosService } from 'src/app/core/services/tesoreria/centro-costos.service';
import { CobrosVariosService } from 'src/app/core/services/tesoreria/cobros-varios.service';
import { TipoOtrosCobrosService } from 'src/app/core/services/tesoreria/tipos-otros-cobros-varios.service';
import { ApiResponseStandard, ErrorResponseStandard } from "src/app/shared/interface/common-api-response";
@Component({
  selector: 'app-cobros-varios-form',
  templateUrl: './cobros-varios-form.component.html',
  styleUrls: ['./cobros-varios-form.component.scss']
})
export class CobrosVariosFormComponent {

  @Input() type: boolean;
  @Input() label: string = "";
  @Input() data: any;
  @Input() title: string = "";
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();
  private _cobrosVariosService = inject(CobrosVariosService);
  private formBuilder = inject(UntypedFormBuilder);
  private _tipoOtrosCobrosService = inject(TipoOtrosCobrosService);
  private notificacionService = inject(NotificacionService);
  private _centroCostoService = inject(CentroCostosService);
  private _contaCuentasService = inject(CuentasUltimoNivelService);
  private responseHandlerService = inject(ResponseHandlerService);
  protected screenshotService = inject(ScreenshotService);
  submitted: boolean = false;
  formCobrosVarios: UntypedFormGroup;
  listaCentroCostos: any[] = [];
  isStatusSubmit: boolean = false;
  public onSubmitFormStatus: boolean = false;
  dataReceived: any = [];
  dataTipo: any;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.getCentroCostos();
    this.getAccountingAccounts();
    this.setForm();
    this.getTiposOtrosCobros();
  }

  setForm() {
    this.formCobrosVarios = this.formBuilder.group({
      id: null,
      fecha: [null, [Validators.required]],
      cuentaContableId: [null, [Validators.required]],
      centroCostoId: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      total: [0, [Validators.required]],
      transacciones: this.formBuilder.array([]),
      tipoOtroCobroId: [null, [Validators.required]],
      nombreCuentaContable: [null, [Validators.required]],
      codigoCuentaContable: [null, [Validators.required]],
    });
  }
  get form() {
    return this.formCobrosVarios.controls;
  }

  getTiposOtrosCobros = () => {
    this._tipoOtrosCobrosService.getAll(false).subscribe({
      next: (data) => {
        this.dataTipo = data;
      }, error: (err) => this.notificacionService.alertErrorOnlyMessage(err),
    });
  };

  getAccountingAccounts = () => {
    this._contaCuentasService.getAll(false).subscribe({
      next: (data) => {
        this.data = data.map(account => ({
          ...account,
          displayName: `${account.codigo} - ${account.nombre}`
        }));
      }, error: (err) => this.notificacionService.alertErrorOnlyMessage(err),
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
      this.formCobrosVarios.get("cuentaContableId").setValue(data.id);
      this.formCobrosVarios.get("nombreCuentaContable").setValue(data.nombre);
      this.formCobrosVarios.get("codigoCuentaContable").setValue(data.codigo);
    }
  }

  recibirMontoTotal(value) {
    this.formCobrosVarios.get("total").setValue(value);
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    const formData = this.formCobrosVarios.value;
    if (!this.formCobrosVarios.valid) {
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
    if (this.formCobrosVarios.valid) {
      dataForm["movimientos"] = this.formCobrosVarios.value["transacciones"];
      this._cobrosVariosService.register(dataForm).subscribe({
        next: (data) => {
          this.isStatusSubmit = false;
          this.alActualizar.emit(data);
          this.notificacionService.successStandar();
        }, error: (error) => this.notificacionService.alertError(error),
      });
    }
    this.submitted = true;
  }
}
