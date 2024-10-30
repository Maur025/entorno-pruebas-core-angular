import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FuncionesComponent } from "../../funciones.component";
import { TablaNewComponent } from "src/app/shared/ui/tabla-new/tabla-new.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { EmpleadoService } from "src/app/core/services/tesoreria/empleado.service";
import { ErrorResponseStandard } from "src/app/shared/interface/common-api-response";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.scss"],
})
export class EmpleadosComponent extends FuncionesComponent implements OnInit {
  @ViewChild("tabla") tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  titleModal: string = "";
  formEmpleado: UntypedFormGroup;
  submitted: boolean = true;
  empleado;
  isStatusSubmit: boolean = false;

  public onSubmitFormStatus: boolean = false;

  constructor(
    private modalService: BsModalService,
    public empleadoService: EmpleadoService,
    private notificacionService: NotificacionService,
    public formBuilder: UntypedFormBuilder,
    private screenshotService: ScreenshotService,
    protected utilityService: UtilityService
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Empleado" },
      { label: "Gestión de empleados", active: true },
    ];
    this.formato = this.getCabeceras();
    this.setForm();
  }

  private modalConfig: {
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    class: string;
  } = {
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-md modal-scrollable",
  };

  getCabeceras() {
    return {
      cabeceras: {
        acciones: this.getOpcionesCabecera("Acciones", 12, "text", true, false),
        nombre: this.getOpcionesCabecera("Empleado", 12),
        nitCi: this.getOpcionesCabecera("CI / NIT", 12),
        estado: this.getOpcionesCabecera("Estado", 12),
      },
    };
  }

  get form() {
    return this.formEmpleado.controls;
  }

  setForm() {
    this.formEmpleado = this.formBuilder.group({
      id: [null],
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      nitCi: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  nuevoEmpleado(template) {
    this.titleModal = "Nuevo Empleado";
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  editar(fila, template) {
    this.titleModal = "Editar Empleado";
    this.modalRef = this.modalService.show(template, this.modalConfig);
    this.empleado = fila["id"];

    this.formEmpleado.controls["id"].setValue(fila["id"]);
    this.formEmpleado.controls["nombre"].setValue(fila["nombre"]);
    this.formEmpleado.controls["nitCi"].setValue(fila["nitCi"]);
  }

  habilitar = (data: { id: string }, texto) => {
    this.notificacionService.inhabilitarAlerta(texto, (response: boolean) => {
      if (!response) {
        return;
      }
      this.empleadoService.habilitar(data.id).subscribe({
        next: () => {
          this.notificacionService.successStandar(
            `Registro ${
              texto === "habilitar" ? "habilitado" : "inhabilitado"
            } exitosamente`
          );
          this.tabla.obtenerDatos();
        },
        error: (error: ErrorResponseStandard) => {
          this.notificacionService.alertError(error);
        },
      });
    });
  };

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (!this.formEmpleado?.valid) {
      this.isStatusSubmit = false;
      return;
    }
    const dataImg = await this.screenshotService?.takeScreenshot(
      "form-create-employe"
    );

    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) this.guardar();
    });
  };

  cerrarModal = (): void => {
    this.modalService.hide();
    this.formEmpleado.reset();
    this.tabla.obtenerDatos();
  };

  guardar() {
    if (this.empleado) {
      this.empleadoService.update(this.formEmpleado?.value).subscribe({
        next: () => {
          this.notificacionService.successStandar();
          this.cerrarModal();
          this.isStatusSubmit = false;
        },
        error: (error: ErrorResponseStandard) => {
          this.notificacionService?.alertError(error);
        },
      });
    } else {
      this.empleadoService.register(this.formEmpleado.value).subscribe({
        next: () => {
          this.notificacionService.successStandar();
          this.isStatusSubmit = false;
          this.cerrarModal();
        },
        error: (error: ErrorResponseStandard) => {
          this.notificacionService?.alertError(error);
        },
      });
    }
  }
}
