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

import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { EmpleadoService } from "src/app/core/services/tesoreria/empleado.service";

@Component({
  selector: "app-list",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
export class ListaComponent extends FuncionesComponent implements OnInit {
  titulo = "Cajas"
  tituloLista = "Lista de Cajas"
  @ViewChild("tabla") tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  titleModal: any;
  idCajaEdit: string | number;
  submitted: boolean = false;
  formCajaCreate: UntypedFormGroup;
  listaResponsables: any[] = [];
  datosCaja: any;
  isStatusSubmit: boolean = false;

  protected onSubmitFormStatus: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalService: BsModalService,
    private screenshotService: ScreenshotService,
    private notificacionService: NotificacionService,
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
      { label: this.titulo },
      { label: this.tituloLista, active: true },
    ];
    this.formato = this.getCabeceras();
    this.setForm();
    this.getEmployeesList();
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
        empleado: this.getOpcionesCabecera("Responsable", 12),
        saldo: this.getOpcionesCabecera("Saldo", 12),
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
    setTimeout(()=>{
      this.formCajaCreate.get('empleadoId')?.setValue(fila["empleado"]["id"]);
    }, 500);
  }

  aperturarCaja(fila, template) {
    this.datosCaja = fila;
    this.modalConfig.class = `modal-xl modal-scrollable`;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  detalleCaja(caja) {
    this.router.navigate(["./" + caja.id + "/caja/", {}], {
      relativeTo: this.route,
    });
  }

  getEmployeesList = (): void => {
    this.empleadoService?.listarHabilitados().subscribe({
      next: (response: ApiResponseStandard) => {
        this.listaResponsables =
          this.responseHandlerService?.handleResponseAsArray(response);
      },
      error: (error: ErrorResponseStandard) => {
        this.notificacionService?.alertError(error);
      },
    });
  };

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formCajaCreate.valid) {
      this.isStatusSubmit = false;
      return;
    }

    const dataImg = await this.screenshotService?.takeScreenshot(
      "form-create-caja"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) this.registrar();
      this.isStatusSubmit = false;
    });
  };

  registrar() {
    if (this.idCajaEdit) {
      this.cajaService.update(this.formCajaCreate.value).subscribe(
        (data) => {
          this.cerrarModal();
          this.isStatusSubmit = false;
          this.notificacionService.successStandar();
          this.tabla.obtenerDatos();
        },
        (error) => this.notificacionService.alertError(error)
      );
    } else {
      this.cajaService.register(this.formCajaCreate.value).subscribe(
        (data) => {
          this.cerrarModal();
          this.isStatusSubmit = false;
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
