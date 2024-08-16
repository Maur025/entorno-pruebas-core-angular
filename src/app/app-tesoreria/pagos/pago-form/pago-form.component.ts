import { Component, EventEmitter, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { PagosService } from "src/app/core/services/tesoreria/pagos.service";
import { ProveedorService } from "src/app/core/services/tesoreria/proveedor.service";
import { ApiResponseStandard, ErrorResponseStandard } from "src/app/shared/interface/common-api-response";
import { UtilityService } from "src/app/shared/services/utilityService.service";

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
  datosProvedor: any;
  comprasDelProveedor: any[]=[];
  totalPagarCoutas = 0;
  totalTransacciones=0;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private notificacionService: NotificacionService,
    private screenshotService: ScreenshotService,
    private proveedorService: ProveedorService,
    public pagoService: PagosService,
    private responseHandlerService: ResponseHandlerService,
    protected utilityService: UtilityService,
    private router: Router,
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
			.getProveedores()
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
    this.datosProvedor = dato;
    this.getComprasPorProveedor(dato['id']);
  }

  getComprasPorProveedor(idProveedor){
    this.pagoService.comprasPorProveedor(idProveedor).subscribe(
      data=>{
        this.comprasDelProveedor=data['data'];
      }, error=>this.notificacionService.alertError(error)
    );
  }

  recibirMontoTotal(totalTransaccion){
    this.totalTransacciones=totalTransaccion;
    this.formPago.controls['montoPagado'].setValue(totalTransaccion);
  }

  recibirPagoTotal(montoPago){
    console.log(montoPago);
    this.totalPagarCoutas = montoPago;
  }

  verificarAdicionales(){
    let totalsCero = this.totalPagarCoutas == 0 && this.totalTransacciones== 0 ? true : false;

    if(!totalsCero){
      if(this.totalPagarCoutas !== this.totalTransacciones){
        let mensaje = "El total de pagos y el total de las transacciones deben ser iguales";
        this.notificacionService.warningMessage(mensaje);
        return false;
      }else{
        return true;
      }
    }else{
      let mensaje = "El total de pagos y el total de las transacciones se encuentran en 0";
      this.notificacionService.warningMessage(mensaje);
      return false;
    }
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    let verificacion = this.verificarAdicionales();
    console.log(!this.formPago.valid , verificacion==false,this.formPago.value);
    if (!this.formPago.valid || verificacion==false) {
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
    this.formPago.value['fechaPago']= this.formPago.value['fecha'];
    this.formPago.value['movimientos']= this.formPago.value['transacciones'];
    //console.log(this.formAccionCaja.value)
    this.pagoService.register(this.formPago.value).subscribe(data=>{
      this.notificacionService.successStandar();
      this.router.navigate(['./pagos', {}],

      )
    }, error=>this.notificacionService.alertError(error));
  }
}
