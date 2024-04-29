
import { filter } from 'rxjs/operators';

import { Component, Input, OnInit, Output, TemplateRef, EventEmitter, enableProdMode, ViewChild, ElementRef } from '@angular/core';

import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ArchivosService } from 'src/app/core/services/archivos.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApiServicio } from 'src/app/core/services/apiservicio';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { bU } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'tabla-normal',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})

export class TablaComponent implements OnInit {
  modalRef?: BsModalRef;

  @Input() datosService: any;
  @Input() titulo: string = '';
  @Input() encabezados: any;
  @Input() formato: any;
  @Input() botonNuevo = true;
  @Input() botonImportar = false;
  @Input() botonExportar = false;
  @Input() botonPlantilla = false;
  @Input() soloLectura = false;
  @Input() buscador = true;
  @Input() campoEstado: any = 'estado';
  @Input() valueEstado: any = 'habilitado';
  @Input() textoBuscar: string = 'Ingrese criterio de búsqueda';
  @Input() filtros: any;
  @Input() filtrosNoRefresh = [];
  @Input() idRuta: any;
  @Output() alCargar: EventEmitter<any> = new EventEmitter();
  @Output() alRefrescar: EventEmitter<any> = new EventEmitter();
  @Output() alCrear: EventEmitter<any> = new EventEmitter();
  @Output() alFiltrar: EventEmitter<any> = new EventEmitter();
  @Output() alEditar: EventEmitter<any> = new EventEmitter();
  @Output() alDeshabilitar: EventEmitter<any> = new EventEmitter();
  @Output() alHabilitar: EventEmitter<any> = new EventEmitter();
  @Output() alEliminar: EventEmitter<any> = new EventEmitter();
  @Output() alImportar: EventEmitter<any> = new EventEmitter();
  @Output() alExportar: EventEmitter<any> = new EventEmitter();
  @Output() alExportarPlantilla: EventEmitter<any> = new EventEmitter();

  @Input() getAll: any;
  @Input() exportReport: any = 'exportReport';

  @Input() templateFila: TemplateRef<any>;
  @Input() templateTbody: any;
  @Input() templateTfooter: any;
  @Input() templateOptions: any;
  @Input() templateFiltrar: any;
  @Input() conOpciones: boolean = true;
  @Input() softDelete = false;
  @Input() smallTable = false;
  @Input() paginate = true;
  estaCargando = true;
  filtrosNuevo = {};

  public pagination = {
    size: 10,
    page: 1,
    sortBy: 'id',
    descending: false,
    rowsNumber: 0,
    pages: 0
  }

  cabeceras: any;
  datosTabla: any = [];
  datos: any;

  inputBuscar: string = '';
  buscar = false;
  objectKeys = Object.keys;

  classTable: string = 'table mb-0 table-hover align-middle nowrap data-table table-condensed';

  config_autoclose: any = false;
  mostrarTodas() {
    this.cabeceras.forEach(key => {
      let campo = this.formato.cabeceras[key];
      if (campo.buscable && campo.buscableCheck && campo.visible) {
        campo.visibleCheck = true;
      }
    });
  }

  ampliar() {
    this.smallTable = !this.smallTable;
  }

  constructor(
    public notificacionService: NotificacionService,
    public archivosService: ArchivosService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    //if(this.idRuta) console.log(this.idRuta)
    /*  if (buscar.keyCode!==undefined)
       if (buscar.keyCode == 13){
         this.buscar = true;
         this.obtenerDatos();
         return;
       }
       if (buscar.keyCode == 27){
         this.buscar = false;
         this.obtenerDatos();
         return;
       } */
  }

  ngOnChanges() {
    this.filtros;
    if (this.filtros) {
      if (this.inputBuscar || this.inputBuscar != '') this.filtros.keyword = this.inputBuscar;
    }
    this.cabeceras = this.objectKeys(this.formato.cabeceras);
    this.obtenerDatos();
  }

  buscarKeyDown(buscar) {
    if (!this.inputBuscar || this.inputBuscar == '' || buscar) {
      this.buscar = true;
      if (this.filtros) this.inputBuscar || this.inputBuscar != '' ? this.filtros.keyword = this.inputBuscar : delete this.filtros.keyword;
      this.obtenerDatos();
    }
  }

  public obtenerDatos() {
    if (this.paginate) {
      if (!this.filtros) {
        if (this.idRuta) {
          this.datosService[this.getAll](this.pagination.size, this.pagination.page, this.pagination.sortBy, this.pagination.descending, this.inputBuscar, this.idRuta).subscribe((result: any) => {
            this.datos = result.content;
            this.pagination.rowsNumber = result.pagination.rowsNumber;
            this.pagination.pages = result.pagination.pages;
            this.estaCargando = false;
            this.alCargar.emit(this.datos);
          }, error => {
            this.notificacionService.alertError(error);
          });
        } else {
          this.datosService[this.getAll](this.pagination.size, this.pagination.page, this.pagination.sortBy, this.pagination.descending, this.inputBuscar).subscribe((result: any) => {
            this.datos = result.content;
            this.pagination.rowsNumber = result.pagination ? result.pagination.rowsNumber : result.content.length;
            this.pagination.pages = result.pagination ? result.pagination.pages : 1;
            this.estaCargando = false;
            this.alCargar.emit(this.datos);
          }, error => {
            this.notificacionService.alertError(error);
          });
        }
      } else {
        this.datosService[this.getAll](this.pagination.size, this.pagination.page, this.pagination.sortBy, this.pagination.descending, this.inputBuscar, this.filtros).subscribe((result: any) => {
          this.datos = result.content;
          this.pagination.rowsNumber = result.pagination ? result.pagination.rowsNumber : result.content.length;
          this.pagination.pages = result.pagination ? result.pagination.pages : 1;
          this.estaCargando = false;
          this.alCargar.emit(this.datos);
        }, error => {
          this.notificacionService.alertError(error);
        });
      }
    } else {
      this.datosService[this.getAll](this.inputBuscar, this.filtros).subscribe((result: any) => {
        this.datos = result.content;
        this.pagination.rowsNumber = result.pagination ? result.pagination.rowsNumber : result.content.length;
        this.pagination.pages = result.pagination ? result.pagination.pages : 1;
        this.estaCargando = false;
        this.alCargar.emit(this.datos);
      }, error => {
        this.notificacionService.alertError(error);
      });
    }
  }

  resetButtons = (event) => {
    let tableButtons: any = document.getElementsByClassName("colCabecera");
    [...tableButtons].map((button) => {
      if (button !== event.target) {
        button.removeAttribute("data-dir");
      }
    });
  };

  ordenar(e) {
    this.resetButtons(e);
    if (e.target.getAttribute("data-dir") == "desc") {
      this.pagination.sortBy = e.target.id;
      this.pagination.descending = false;
      e.target.setAttribute("data-dir", "asc");
    } else {
      e.target.setAttribute("data-dir", "desc");
      this.pagination.sortBy = e.target.id;
      this.pagination.descending = true;
    }
    this.obtenerDatos();
  }

  pageChanged(event: PageChangedEvent) {
    this.pagination.page = event.page;
    this.obtenerDatos();
  }

  mascara(valor, data, campo) {
    if (campo.mascara === undefined) return valor;
    else
      if (Array.isArray(data[campo.mascara.campo])) {
        let arrValues = [];
        data[campo.mascara.campo].forEach(element => arrValues.push(element[campo.mascara.valor]));
        return arrValues.join(" ");
      } else
        if (data[campo.mascara.campo] != null)
          return data[campo.mascara.campo][campo.mascara.valor];
        else
          return "";
  }

  exportar(tipo) {
    this.datosService[this.exportReport](tipo, this.filtros).subscribe(response => {
      if (tipo == 'XLSX') this.archivosService.generar64aExcel(response['content'].content, response['content'].name);
      if (tipo == 'PDF') this.archivosService.generar64aPDF(response['content'].content, response['content'].name);
    }, error => {
      this.notificacionService.alertError(error);
    });
  }

  resetButtonsCabecera() {
    let tableButtons: any = document.getElementsByClassName("colCabecera");
    [...tableButtons].map((button) => {
      button.removeAttribute("data-dir");
    });
  };

  refrescar() {
    if (this.filtros) {
      Object.entries(this.filtros).forEach(([key, value]) => {
        if (!this.filtrosNoRefresh.includes(key)) delete this.filtros[key];
      });
    }
    this.inputBuscar = '';
    this.resetButtonsCabecera();
    this.refreshPaginate();
      this.alRefrescar.emit(this.datos);
    this.obtenerDatos();
  }

  refreshPaginate() {
    this.pagination = {size: 10, page: 1, sortBy: 'id',descending: false, rowsNumber: 0, pages: 0 }
  }

  exportarPlantilla() {
    this.datosService.exportarPlantilla().subscribe(response => {
      this.archivosService.generar64aExcel(response['content'].content, response['content'].name);
    }, error => this.notificacionService.alertError(error));
  }
}
