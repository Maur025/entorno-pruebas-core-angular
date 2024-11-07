import { Component, inject, OnInit } from "@angular/core";
import { FuncionesComponent } from "../../funciones.component";
import { CompensacionService } from "src/app/core/services/tesoreria/compensaciones.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { tap, catchError } from 'rxjs/operators';
import { ArchivosService } from 'src/app/core/services/archivos.service'
import { of } from 'rxjs';
import { NotificacionService } from "src/app/core/services/notificacion.service";

@Component({
  selector: "app-compensation-list",
  templateUrl: "./compensation-list.component.html",
  styleUrls: ["./compensation-list.component.scss"],
})
export class CompensationListComponent
  extends FuncionesComponent
  implements OnInit
{
  titulo = "Compensaciones"
  tituloLista = "Lista de compensaciones"
  public compensacionService = inject(CompensacionService);
  private router = inject(Router);
  breadCrumbItems: object[];
  formato: any;
  titleCustom: string = "";
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private archivosService: ArchivosService,
    private notificacionService: NotificacionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: this.titulo },
			{ label: this.tituloLista, active: true },
		]
    this.formato = this.getCabeceras();
  }

  getCabeceras = () => {
    return {
      cabeceras: {
        acciones: this.getOpcionesCabecera("Acciones", 12, "text", true, false),
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

  descargarComprobante(id) {
    this.compensacionService.generarComprobante(id).pipe(
      tap((data) => {
        this.archivosService.generar64aPDF(data['data'].content, data['data'].name);
      }),
      catchError((error) => {
        this.notificacionService.alertError(error);
        return of(null);
      })
    ).subscribe();
	}
}
