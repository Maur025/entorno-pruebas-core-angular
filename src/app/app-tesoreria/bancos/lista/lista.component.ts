import { Component, OnInit, ViewChild } from "@angular/core";
import { FuncionesComponent } from "../../funciones.component";
import { TablaNewComponent } from "src/app/shared/ui/tabla-new/tabla-new.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { UtilityService } from "src/app/shared/services/utilityService.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { BancoService } from "src/app/core/services/tesoreria/banco.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.scss"],
})
export class ListaComponent extends FuncionesComponent implements OnInit {
  @ViewChild("tabla") tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  titleModal: any;
  idBancoEdit: string | number;
  submitted: boolean = false;
  formBancoCreate: UntypedFormGroup;
  listaResponsables: any[] = [];
  bancoData: any;
  isStatusSubmit: boolean = false;

  protected onSubmitFormStatus: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalService: BsModalService,
    private screenshotService: ScreenshotService,
    private notificacionService: NotificacionService,
    protected utilityService: UtilityService,
    private responseHandlerService: ResponseHandlerService,
    public bancoService: BancoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Bancos" },
      { label: "Gestión de bancos", active: true },
    ];
    this.formato = this.getCabeceras();
    this.setForm();
    //this.getEmployeesList();
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
        descripcion: this.getOpcionesCabecera("Descripción", 12),
      },
    };
  }

  setForm() {
    this.formBancoCreate = this.formBuilder.group({
      id: [null, []],
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
        ],
      ],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
    });
  }
  get form() {
    return this.formBancoCreate.controls;
  }

  crearBanco(template) {
    this.titleModal = "Nuevo banco";
    this.modalConfig.class = `modal-md modal-scrollable`;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  editar(fila, template) {
    this.titleModal = "Editar banco";
    this.modalConfig.class = `modal-md modal-scrollable`;
    this.modalRef = this.modalService.show(template, this.modalConfig);

    this.idBancoEdit = fila["id"];
    this.formBancoCreate.controls["id"].setValue(fila["id"]);
    this.formBancoCreate.controls["nombre"].setValue(fila["nombre"]);
    this.formBancoCreate.controls["descripcion"].setValue(fila["descripcion"]);
  }

  crearCuentaBanco(fila, template) {
    this.bancoData = fila;
    this.modalConfig.class = `modal-xl modal-scrollable`;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  verCuentas(banco) {
    this.router.navigate(["./" + banco.id + "/cuenta-banco/", {}], {
      relativeTo: this.route,
    });
  }

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formBancoCreate.valid) {
      this.isStatusSubmit = false;
      return;
    }

    const dataImg = await this.screenshotService?.takeScreenshot(
      "form-create-edit-cash"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) {
        this.registrar();
      } else {
        this.isStatusSubmit = false;
      }
    });
  };

  registrar() {
    if (this.idBancoEdit) {
      this.bancoService.update(this.formBancoCreate.value).subscribe(
        (data) => {
          this.cerrarModal();
          this.notificacionService.successStandar();
          this.isStatusSubmit = false;
          this.tabla.obtenerDatos();
        },
        (error) => this.notificacionService.alertError(error)
      );
    } else {
      this.bancoService.register(this.formBancoCreate.value).subscribe(
        (data) => {
          this.cerrarModal();
          this.notificacionService.successStandar();
          this.tabla.obtenerDatos();
          this.isStatusSubmit = false;
        },
        (error) => this.notificacionService.alertError(error)
      );
    }
  }

  cerrarModal = (): void => {
    this.modalService.hide();
    this.onSubmitFormStatus = false;
    this.formBancoCreate.reset();
    this.idBancoEdit = "";
  };
}
