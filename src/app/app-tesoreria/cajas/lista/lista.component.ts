import { Component, OnInit, ViewChild } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { CajaService } from "src/app/core/services/tesoreria/caja.service";
import { UtilityService } from "src/app/shared/services/utilityService.service";
import { TablaNewComponent } from "src/app/shared/ui/tabla-new/tabla-new.component";
import { FuncionesComponent } from "../../funciones.component";
import { CentroCostosService } from "src/app/core/services/tesoreria/centro-costos.service";
import { ApiResponseStandard, ErrorResponseStandard } from "src/app/shared/interface/common-api-response";
import { EmpleadoService } from "src/app/core/services/tesoreria/empleado.service";

@Component({
  selector: "app-list",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
export class ListaComponent extends FuncionesComponent implements OnInit {
  @ViewChild("tabla") tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  titleModal: any;
  idCajaEdit: string | number;
  submitted: boolean = false;
  formCajaCreate: UntypedFormGroup;
  listaResponsables: any[] = [];
  listaCentroCostos: any[] = [];
  datosCaja: any;

  protected onSubmitFormStatus: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalService: BsModalService,
    private screenshotService: ScreenshotService,
    private notificacionService: NotificacionService,
    private centroCostosService: CentroCostosService,
    private empleadoService: EmpleadoService,
    protected utilityService: UtilityService,
    private responseHandlerService: ResponseHandlerService,
    public cajaService: CajaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Cajas" },
      { label: "Gestión de Cajas", active: true },
    ];
    this.formato = this.getCabeceras();
    this.setForm();
    this.getEmployeesList();
    this.getCentroCostos();
  }

  private modalConfig: {
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    class: string;
  } = {
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-xl modal-scrollable",
  };

  getCabeceras() {
    return {
      cabeceras: {
        acciones: this.getOpcionesCabecera("Acciones", 12, "text", true, false),
        nombre: this.getOpcionesCabecera("Nombre", 12),
        centroCosto: this.getOpcionesCabecera("Centro de Costos", 12),
        empleado: this.getOpcionesCabecera("Responsable", 12)
      },
    };
  }

  setForm() {
    this.formCajaCreate = this.formBuilder.group({
      id: [null, []],
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
        ],
      ],
			empleadoId: [null, [Validators.required]],
			centroCostoId: [null, [Validators.required]],
    });
  }
  get form() {
    return this.formCajaCreate.controls;
  }

  crearCaja(template) {
    this.titleModal = "Nueva Caja";
    this.modalConfig.class = `modal-md modal-scrollable`;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  editar(fila, template) {
    this.titleModal = "Editar Caja";
    this.modalConfig.class = `modal-md modal-scrollable`;
    this.modalRef = this.modalService.show(template, this.modalConfig);

    this.idCajaEdit = fila["id"];
    this.formCajaCreate.controls["id"].setValue(fila["id"]);
    this.formCajaCreate.controls["nombre"].setValue(fila["nombre"]);
    this.formCajaCreate.controls["empleadoId"].setValue(fila["empleado"]["id"]);
    this.formCajaCreate.controls["centroCostoId"].setValue(fila["centroCosto"]["id"]);

  }

  aperturarCaja(fila, template) {
    this.datosCaja = fila;
    this.modalConfig.class = `modal-xl modal-scrollable`;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  detalleCaja(caja) {
    console.log(caja);
    /* this.router.navigate(["./" + banco.id + "/cuenta-banco/", {}], {
      relativeTo: this.route,
    }); */
  }

  getCentroCostos() {
		this.centroCostosService.habilitados().subscribe({
			next: (response: ApiResponseStandard) => {
				this.listaCentroCostos =
					this.responseHandlerService?.handleResponseAsArray(response)
			},
			error: (error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error),
		})
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
    if (!this.formCajaCreate.valid) {return;}

    const dataImg = await this.screenshotService?.takeScreenshot(
      "form-create-caja"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) =>
      this.registrar()
    );
  };

  registrar() {
    if (this.idCajaEdit) {
      this.cajaService.update(this.formCajaCreate.value).subscribe(
        (data) => {
          this.cerrarModal();
          this.notificacionService.successStandar();
          this.tabla.obtenerDatos();
        },
        (error) => this.notificacionService.alertError(error)
      );
    } else {
      this.cajaService.register(this.formCajaCreate.value).subscribe(
        (data) => {
          this.cerrarModal();
          this.notificacionService.successStandar();
          this.tabla.obtenerDatos();
        },
        (error) => this.notificacionService.alertError(error)
      );
    }
  }

  cerrarModal = (): void => {
    this.modalService.hide();
    this.onSubmitFormStatus = false;
    this.formCajaCreate.reset();
    this.idCajaEdit = "";
  };
}
