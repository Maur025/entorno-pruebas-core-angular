import { Component, inject, OnInit } from "@angular/core";
import { FuncionesComponent } from "../../funciones.component";
import { CompensacionService } from "src/app/core/services/tesoreria/compensaciones.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";

@Component({
  selector: "app-compensation-list",
  templateUrl: "./compensation-list.component.html",
  styleUrls: ["./compensation-list.component.scss"],
})
export class CompensationListComponent
  extends FuncionesComponent
  implements OnInit
{
  public compensacionService = inject(CompensacionService);
  private router = inject(Router);
  breadCrumbItems: object[];
  formato: any;
  titleCustom: string = "";
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Compensaciones" },
      { label: "Gestión de compensaciones", active: true },
    ];
    this.formato = this.getCabeceras();
  }

  getCabeceras = () => {
    return {
      cabeceras: {
        //acciones: this.getOpcionesCabecera("Acciones", 12, "text", true, false),
        centroCosto: this.getOpcionesCabecera(
          "Centro Costo",
          12,
          "text",
          true,
          true
        ),
        fechaCompensacion: this.getOpcionesCabecera(
          "Fecha Compensación",
          12,
          "text",
          true,
          true,
          "text-start"
        ),
        /*         personaOrigen: this.getOpcionesCabecera(
          "Persona Origen",
          12,
          "text",
          true,
          true,
          "text-start"
        ), */
        tipoPersonaOrigen: this.getOpcionesCabecera(
          "Tipo Persona Origen",
          12,
          "text",
          true,
          true,
          "text-start"
        ),
        /*   personaContraparte: this.getOpcionesCabecera(
          "Persona Contraparte",
          12,
          "text",
          true,
          true,
          "text-start"
        ), */
        tipoPersonaContraparte: this.getOpcionesCabecera(
          "Tipo Persona Contraparte",
          12,
          "text",
          true,
          true,
          "text-start"
        ),
        montoCompensacion: this.getOpcionesCabecera(
          "Monto",
          12,
          "text",
          true,
          true,
          "text-end"
        ),
        descripcion: this.getOpcionesCabecera(
          "Descripción",
          12,
          "text",
          true,
          true,
          "text-start"
        ),
        estadoContabilidad: this.getOpcionesCabecera(
          "Estado",
          12,
          "text",
          true,
          true,
          "text-end"
        ),
      },
    };
  };

  crearCompensacion = () => {
    this.router.navigateByUrl("/compensacion/registro");
  };
}
