import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BancoService } from '../../services/tesoreria/banco.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { ScreenshotService } from '../../services/tesoreria/screenshot.service';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { CentrocostoService } from '../../services/tesoreria/centrocosto.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { ProveedorService } from '../../services/compras/proveedor.service';
import { AnticipoService } from '../../services/tesoreria/anticipo.service';

@Component({
  selector: 'nuevo-anticipo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent {
  formAnticipo: UntypedFormGroup;
  submitted:boolean=false;
  totalAnticipo: number=0;
  listaProveedores:any[]=[];
  listaCentroCostos: any[]=[];
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() alActualizar = new EventEmitter<void>();

  public onSubmitFormStatus: boolean = false;


  constructor(
		public BancoService: BancoService,
		private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder,
    private comprasProveedorService: ProveedorService,
		private centroCostoService: CentrocostoService,
		protected utilityService: UtilityService,
		protected screenshotService: ScreenshotService,
    private responseHandlerService: ResponseHandlerService,
    public anticipoService: AnticipoService,
	) {}

  ngOnInit(){
    this.getCentroCostos();
    this.getProveedoresHabilitados('');
    this.setForm();
  }

  setForm(){
    this.formAnticipo = this.formBuilder. group({
			id: '',
      fecha:['', [Validators.required]],
      proveedorId:['', [Validators.required]],
      centroCostoId: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      nroReferencia: [''],
      monto:[0, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ]],
      transacciones: this.formBuilder.array([]),
      proveedor:['', [Validators.required]]
    });
  }
  get form() {return this.formAnticipo.controls}

  recibirMontoTotal(value){
    this.formAnticipo.get('monto').setValue(value);
  }

  alAperturar(){
    this.cerrarModal.emit()
  }

  getCentroCostos = () => {
		this.centroCostoService.habilitados().subscribe({
			next: (response: ApiResponseStandard) =>
				(this.listaCentroCostos =
					this.responseHandlerService?.handleResponseAsArray(response)),
			error: (error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error),
		})
	}

	getProveedoresHabilitados = (keyword: string) => {
		this.comprasProveedorService
			.getAndFindProveedor(0, 50, 'id', false, keyword)
			.subscribe({
				next: (response: ApiResponseStandard) => {
					this.listaProveedores =
						this.responseHandlerService?.handleResponseAsArray(response)
				},
				error: (error: ErrorResponseStandard) =>
					this.notificacionService.alertError(error),
			})
	}

  selectProveedor(data){
    console.log(data)
    let proveedor = {};
    proveedor['id'] = data['id'];
    proveedor['nombreComercial'] =data['nombreComercial'];
    proveedor['razonSocial'] = data['nombre'];
    proveedor['nroDocumento'] = data['nitCi'];
    this.formAnticipo.controls['proveedor'].setValue(proveedor);
    console.log(proveedor);
  }

  confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true;
    console.log(this.formAnticipo.valid);
    console.log(this.formAnticipo.value);
		if (!this.formAnticipo.valid) {
      console.log("aqui");
			return
		}
		const dataImg = await this.screenshotService?.takeScreenshot('accountFormModalBodyDiv');
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>{
			if(response) this.guardarForm();
    }
		)
	}
  guardarForm(){
    console.log(this.formAnticipo.value);
    if(this.formAnticipo.valid){
      this.formAnticipo.value['movimientos']= this.formAnticipo.value['transacciones'];
      //console.log(this.formAccionCaja.value)
      this.anticipoService.crearAnticipo(this.formAnticipo.value).subscribe(data=>{
          this.alActualizar.emit(data);
            this.notificacionService.successStandar();
      }, error=>this.notificacionService.alertError(error));
    }
    this.submitted = true;
  }
}
