import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ArchivosService } from "src/app/core/services/archivos.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { ResponseDataStandard } from './../../interface/common-list-interface';
import { ErrorResponseStandard, ApiResponseStandard } from './../../interface/common-api-response';
import { ItemOptionInterface, FileTypeEnum, ActionTypeEnum } from './../../../core/models/details.model';


@Component({
  selector: "app-tabla-new",
  templateUrl: "./tabla-new.component.html",
  styleUrls: ["./tabla-new.component.scss"],
})
export class TablaNewComponent implements OnChanges {
  @Input() textoBuscar: string = "Criterio de búsqueda...";
  @Input() templateFiltrar: any;
  @Input() botonNuevo = true;
  @Input() formato: any;
  @Input() paginate = true;
  @Input() smallTable = false;
  @Input() conOpciones: boolean = true;
  @Input() templateTbody: any;
  @Input() softDelete = false;
  @Input() templateFila: TemplateRef<any>;
  @Input() templateOptions: any;
  @Input() campoEstado: any = "estado";
  @Input() valueEstado: any = "habilitado";
  @Input() filtros: any;
  @Input() idRuta: any;
  @Input() datosService: any;
  @Input() getAll: any;
  @Input() templateTfooter: any;
  @Input() filtrosNoRefresh = [];
  @Input() tabsEstado: any;
  @Input() labelNuevo: string = "Nuevo";
  @Input() opcionesPage: any = [];


  @Output() alCrear: EventEmitter<any> = new EventEmitter();
  @Output() alEditar: EventEmitter<any> = new EventEmitter();
  @Output() alDeshabilitar: EventEmitter<any> = new EventEmitter();
  @Output() alHabilitar: EventEmitter<any> = new EventEmitter();
  @Output() alEliminar: EventEmitter<any> = new EventEmitter();
  @Output() alCargar: EventEmitter<any> = new EventEmitter();
  @Output() alRefrescar: EventEmitter<any> = new EventEmitter();
  @Output() alImportar: EventEmitter<any> = new EventEmitter();

  @Output() onKeywordChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onHeadersChange: EventEmitter<any> = new EventEmitter<any>();


  inputBuscar: string = "";
  cabeceras: any;
  datos: any;
  estaCargando = true;
  flagEncontrado;
  verBusquedaAvanzada = false;
  viewTools: boolean=false;
  objectKeys = Object.keys;

  public pagination = {
    size: 10,
    page: 0,
    sortBy: "id",
    descending: false,
    rowsNumber: 0,
    pages: 0,
    limit:0
  };
  constructor(
    private responseHandlerService: ResponseHandlerService,
    public notificacionService: NotificacionService,
    public archivosService: ArchivosService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filtros) {
      this.onFilterChange.emit(changes?.filtros?.currentValue);
    }

    if (this.filtros) {
      this.cabeceras = this.objectKeys(this.formato.cabeceras);
      if (this.inputBuscar || this.inputBuscar != "")
        this.filtros.keyword = this.inputBuscar;
      this.obtenerDatos();
    } else {
      this.cabeceras = this.objectKeys(this.formato.cabeceras);
      this.obtenerDatos();
    }
  }

  buscarKeyDown(event: KeyboardEvent) {
    if (!this.filtros) {
      this.obtenerDatos();
      return;
    }

    if (this.inputBuscar) {
      this.filtros.keyword = this.inputBuscar;
    } else {
      delete this.filtros?.keyword;
    }

    if (event.key === "Enter") {
      this.flagEncontrado = true;
    } else if (this.inputBuscar?.length < 3) {
      this.flagEncontrado = false;
    } else {
      this.flagEncontrado = true;
    }

    this.obtenerDatos();
  }

  refrescar() {
    if (this.filtros) {
      Object.entries(this.filtros).forEach(([key, value]) => {
        if (!this.filtrosNoRefresh.includes(key)) delete this.filtros[key];
      });
    }
    this.inputBuscar = "";
    this.resetButtonsCabecera();
    this.refreshPaginate();
    this.alRefrescar.emit(this.datos);
    this.obtenerDatos();
  }

  resetButtonsCabecera() {
    const tableButtons: any = document.getElementsByClassName("colCabecera");
    [...tableButtons].map((button) => {
      button.removeAttribute("data-dir");
    });
  }

  refreshPaginate() {
    this.pagination = {
      size: 10,
      page: 0,
      sortBy: "id",
      descending: false,
      rowsNumber: 0,
      pages: 0,
      limit:0
    };
  }



  pageChanged(event: PageChangedEvent) {
    this.pagination.page = event.page;
    this.obtenerDatos();
  }

  verOpcionesPagina() {
    this.viewTools = !this.viewTools;
  }
  /* verOpcionesPagina() {
    const opcionesGroup = document.getElementById("opciones_page");

    const verData = document
      .getElementById("btn_verOpciones")
      .getAttribute("data-content");
    if (verData == "0") {
      document
        .getElementById("btn_verOpciones")
        .setAttribute("data-content", "1");
      opcionesGroup.removeAttribute("hidden");
    } else {
      document
        .getElementById("btn_verOpciones")
        .setAttribute("data-content", "0");
      opcionesGroup.setAttribute("hidden", "true");
    }
  }
 */
  verSeccionBusqueda(){
    this.verBusquedaAvanzada = !this.verBusquedaAvanzada;
  }

  /* verSeccionBusqueda2() {
    const seccion = document.getElementById("seccionBuscar");
    const valueBtn = document
      .getElementById("btnBusquedaAvanzada")
      .getAttribute("data-content");
    if (valueBtn == "0") {
      document
        .getElementById("btnBusquedaAvanzada")
        .setAttribute("data-content", "1");
      this.verBusquedaAvanzada = true;
    } else {
      document
        .getElementById("btnBusquedaAvanzada")
        .setAttribute("data-content", "0");
      this.verBusquedaAvanzada = false;
    }
  } */

  mostrarTodas() {
    this.cabeceras.forEach((key) => {
      const campo = this.formato.cabeceras[key];
      if (campo.buscable && campo.buscableCheck && campo.visible) {
        campo.visibleCheck = true;
      }
    });
  }

  mascara(valor, data, campo) {
    if (campo.mascara === undefined) return valor;
    else if (Array.isArray(data[campo.mascara.campo])) {
      const arrValues = [];
      data[campo.mascara.campo].forEach((element) =>
        arrValues.push(element[campo.mascara.valor])
      );
      return arrValues.join(" ");
    } else if (data[campo.mascara.campo] != null)
      return data[campo.mascara.campo][campo.mascara.valor];
    else return "";
  }

  public obtenerDatos() {
    if (this.paginate) {
      if (!this.filtros) {
        if (this.idRuta) {
          this.datosService[this.getAll](
            this.pagination.size,
            this.pagination.page,
            this.pagination.sortBy,
            this.pagination.descending,
            this.inputBuscar,
            this.idRuta
          ).subscribe(
            (result: any) => {
							const contenido = result.data ? result.data : result.content
							this.datos = contenido;
							this.pagination.limit = result.pagination.limit;
							this.pagination.pages = result.pagination.pages;
							this.estaCargando = false
							this.alCargar.emit(this.datos)
            },
            (error) => {
              this.notificacionService.alertError(error);
            }
          );
        } else {

          this.datosService[this.getAll](
            this.pagination.size,
            this.pagination.page,
            this.pagination.sortBy,
            this.pagination.descending,
            this.inputBuscar
          ).subscribe(
            (result: any) => {

              const contenido = result.data ? result.data : result.content;

							this.datos = contenido;
							this.pagination.limit = result.pagination ? result.pagination.limit : contenido.length;
              this.pagination.pages = result.pagination ? result.pagination.pages : 0;
							this.estaCargando = false;
							this.alCargar.emit(this.datos)
            },
            (error) => {
              this.notificacionService.alertError(error);
            }
          );
        }
      } else {
        if (!this.flagEncontrado) {
          this.filtros.keyword = "";
        }
        this.datosService[this.getAll](
          this.pagination.size,
          this.pagination.page,
          this.pagination.sortBy,
          this.pagination.descending,
          this.inputBuscar,
          this.filtros
        ).subscribe(
          (result: any) => {
            const contenido = result.data ? result.data : result.content;
            this.datos = contenido;
            this.pagination.limit = result.pagination? result.pagination.limit : contenido.length;
            this.pagination.pages = result.pagination ? result.pagination.pages : 0;
            this.estaCargando = false;
            this.alCargar.emit(this.datos)
          },error => this.notificacionService.alertError(error));
      }
    } else {
      this.datosService[this.getAll](this.inputBuscar, this.filtros).subscribe(
        (result: any) => {
          const contenido = result.data ? result.data : result.content;
          this.datos = contenido;
          this.pagination.limit = result.pagination ? result.pagination.limit : contenido.length;
          this.pagination.pages = result.pagination ? result.pagination.pages: 0;
          this.estaCargando = false;
          this.alCargar.emit(this.datos)
        },error => this.notificacionService.alertError(error));
    }
  }

  accionPage = (event: Event, itemOption: ItemOptionInterface): void => {
    switch (itemOption.accion) {
      case ActionTypeEnum.exportar: {
        const urlService: string = itemOption.endPoint;
        const params: object = itemOption.paramsEndPoint;

        this.datosService[urlService](params).subscribe({
          next: (response: ApiResponseStandard) => {
            const extractedResponseData: ResponseDataStandard =
              this.responseHandlerService.handleResponseAsObject(response);

            if (itemOption.archivo === FileTypeEnum.xlsx) {
              this.archivosService.generar64aExcel(
                extractedResponseData?.content || null,
                extractedResponseData?.name || null
              );
            }
            if (itemOption.archivo === FileTypeEnum.pdf) {
              this.archivosService?.generar64aPDF(
                extractedResponseData?.content || null,
                extractedResponseData?.name || null
              );
            }
          },
          error: (error: ErrorResponseStandard) =>
            this.notificacionService.alertError(error),
        });

        break;
      }
      case ActionTypeEnum.importar: {
        this.alImportar.emit({
          event: event,
          search: this.inputBuscar,
          columnas: this.cabeceras,
        });
        break;
      }
      default:
        console.error("No se encontro la accion " + itemOption.accion);
    }
  };

  onInputSearchKeyword = (event: Event): void => {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.onKeywordChange.emit(inputElement.value);
  };

  onChangeCheckboxHeaderModel = (): void => {
    this.onHeadersChange.emit(this.formato);
  };
}
