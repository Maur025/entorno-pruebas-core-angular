import { Component, OnInit, ViewChild } from '@angular/core';
import { FuncionesComponent } from '../../funciones.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FondoOperativoService } from 'src/app/core/services/tesoreria/fondo-operativo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ScreenshotService } from 'src/app/core/services/screenshot.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';
import { ApiResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { ResponseHandlerService } from 'src/app/core/services/response-handler.service';
import { TablaNewComponent } from 'src/app/shared/ui/tabla-new/tabla-new.component';
import { EmpleadoService } from 'src/app/core/services/tesoreria/empleado.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit {
	@ViewChild('tabla') tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  titleModal: any;
  idFondoEdit: string|number;
  submitted: boolean = false;
  formFondoCreate: UntypedFormGroup;
  listaResponsables: any[]=[];
  dataFondo: any;
  protected onSubmitFormStatus: boolean = false;
  operacionFondo: string ="";

  constructor(
    private formBuilder: UntypedFormBuilder,
    public fondoOperativoService: FondoOperativoService,
    private modalService: BsModalService,
    private screenshotService: ScreenshotService,
    private notificacionService: NotificacionService,
    protected utilityService: UtilityService,
    private responseHandlerService: ResponseHandlerService,
    private empleadoService: EmpleadoService,
    ){super()}

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: "Fondo operativo" },
			{ label: "Gestión de fondo operativo", active: true },
		]
    this.formato = this.getCabeceras();
    this.setForm();
    this.getEmployeesList();
  }

  private modalConfig: {
		ignoreBackdropClick: boolean
		keyboard: boolean
		class: string

	} = {
		ignoreBackdropClick: true,
		keyboard: false,
		class: 'modal-xl modal-scrollable',

	}

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12,'text', true, false),
        "nombre": this.getOpcionesCabecera('Nombre', 12, 'text-end'),
        "importe": this.getOpcionesCabecera('Importe', 12),
        "montoApertura": this.getOpcionesCabecera('Monto Apertura', 12),
        "totalDescargos": this.getOpcionesCabecera('Total Descargos', 12),
        "totalReposicion": this.getOpcionesCabecera('Total Reposición', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "estado":this.getOpcionesCabecera('Estado', 12),
      }
    };
  }

  setForm(){
		this.formFondoCreate = this.formBuilder.group({
			id: [null, []],
			nombre: [null,[Validators.required,Validators.minLength(6),Validators.maxLength(255)]],
			empleadoId: [null, [Validators.required]],
			importe: [null, [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]+(.[0-9]*)?$')]],
		})
  }

  get form() {return this.formFondoCreate.controls}

  nuevoFondo(template){
    this.titleModal = 'Nuevo fondo operativo';
		this.modalConfig.class = `modal-md modal-scrollable`;
		this.modalRef = this.modalService.show(template, this.modalConfig)
  }

  editar(fila,template){
    this.titleModal = 'Editar fondo operativo';
		this.modalConfig.class = `modal-md modal-scrollable`;
		this.modalRef = this.modalService.show(template, this.modalConfig);

    this.idFondoEdit = fila['id'];
    this.formFondoCreate.controls['id'].setValue(fila['id']);
    this.formFondoCreate.controls['nombre'].setValue(fila['nombre']);
    this.formFondoCreate.controls['empleadoId'].setValue(fila['empleadoId']);
    this.formFondoCreate.controls['importe'].setValue(fila['importe']);
  }

  aperturarFondo(fila,template){
    this.operacionFondo="APER";

    this.dataFondo =fila;
    this.modalConfig.class = `modal-lg modal-scrollable`;
		this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  reposicionFondo(fila,template){
    this.operacionFondo="REPO";
    this.dataFondo =fila;
    this.modalConfig.class = `modal-lg modal-scrollable`;
		this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  cierreFondo
  (fila,template){
    this.operacionFondo="CIE";
    this.dataFondo =fila;
    this.modalConfig.class = `modal-lg modal-scrollable`;
		this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  getEmployeesList = (): void => {
		this.empleadoService?.listarHabilitados().subscribe({
			next: (response: ApiResponseStandard) => {
				this.listaResponsables =
					this.responseHandlerService?.handleResponseAsArray(response)
			},
			error: (error: ErrorResponseStandard) => {
				this.notificacionService?.alertError(error)
			},
		})
	}

  confirmAndContinueSaving = async (): Promise<void> => {
		this.submitted = true;
		if (!this.formFondoCreate.valid) {return}

		const dataImg = await this.screenshotService?.takeScreenshot(
			'form-create-edit-cash'
		)
		this.notificacionService?.confirmAndContinueAlert(dataImg, response =>
      this.registrar()
		)
	}

  registrar(){
    if(this.idFondoEdit){
      this.fondoOperativoService.update(this.formFondoCreate.value).subscribe(data=>{
        this.cerrarModal();
        this.notificacionService.successStandar();
        this.tabla.obtenerDatos();
      }, error=>this.notificacionService.alertError(error));
    }else{
      this.fondoOperativoService.register(this.formFondoCreate.value).subscribe(data=>{
        this.cerrarModal();
        this.notificacionService.successStandar();
        this.tabla.obtenerDatos();
      }, error=>this.notificacionService.alertError(error));
    }
  }

  cerrarModal = (): void => {
		this.modalService.hide()
		this.onSubmitFormStatus = false;
    this.formFondoCreate.reset();
    this.idFondoEdit="";
	}


}


