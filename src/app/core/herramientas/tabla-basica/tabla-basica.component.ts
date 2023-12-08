import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ApiServicio } from 'src/app/core/services/apiservicio';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NotificacionService } from 'src/app/core/services/notificacion.service';

@Component({
  selector: 'tabla-basica',
  templateUrl: './tabla-basica.component.html',
  styleUrls: ['./tabla-basica.component.scss']
})
export class TablaBasicaComponent implements OnInit {
  @Input() datosService: ApiServicio;
  @Input() titulo: string = '';
  @Input() cabecera = true;
  @Input() encabezados: any;
  @Input() botonNuevo = true;
  @Input() templateFila: TemplateRef<any>;
  @Input() templateForm: TemplateRef<any>;
  @Input() textoBuscar: string = 'Ingrese criterio de busqueda';
  @Output() crearNuevo: EventEmitter<any> = new EventEmitter();
  @Output() alFiltrar: EventEmitter<any> = new EventEmitter();
  @Output() alBuscar: EventEmitter<any> = new EventEmitter();
  @Output() getDatos: EventEmitter<any> = new EventEmitter();
  @Input() templateDescargas: TemplateRef<any>;
  @Input() templateTop: TemplateRef<any>;

  cabeceras: any;
  datosTabla: any = [];
  datos: any;
  porPagina = 10;
  pagActual = 1;
  total = 0;
  inputBuscar: string = '';
  buscar = false;
  filtra = false;
  filtros: any;

  pagination = {
    size: 10,
    page: 1,
    sortBy: 'id',
    descending: false,
    rowsNumber: 0,
    pages: 0
  }


  objectKeys = Object.keys;

  constructor(public notif: NotificacionService) { }

  ngOnInit(): void {
    this.cabeceras = this.objectKeys(this.encabezados.cabeceras);
    this.obtenerDatos();
  }

  irNuevo() {
    this.crearNuevo.emit();
  }
  buscarKeyDown(buscar) {
    if (!this.inputBuscar || this.inputBuscar == '' || buscar) {
      this.buscar = true;
      this.filtra = false;
      this.obtenerDatos();
    }
  }

  filtrar(filtros: any) {
    if (!this.inputBuscar || this.inputBuscar == '' || filtros) {
      this.filtra = true;
      this.buscar = false;
      this.filtros = filtros;
      this.obtenerDatos();
    }
  }

  public obtenerDatos() {
    if (this.buscar) {
      this.datosService.search(this.pagination.size, this.pagination.page, this.inputBuscar).subscribe(
        (data) => {
          this.datos = data['content'];
          this.pagination.rowsNumber = data.pagination.rowsNumber;
          this.pagination.pages = data.pagination.pages;
          this.getDatos.emit(this.datos);
        }, error => {
          this.notif.alertError(error);
        });
    } else if (this.filtra) {
      this.datosService.filter(this.pagination.size, this.pagination.page, this.filtros).subscribe(
        (data) => {
          this.datos = data['content'];
          this.pagination.rowsNumber = data.pagination.rowsNumber;
          this.pagination.pages = data.pagination.pages;
          this.getDatos.emit(this.datos);
        }, error => {
          this.notif.alertError(error);
        });
      this.inputBuscar = null;
    } else {
      this.datosService.getAll(this.pagination.size, this.pagination.page).subscribe((data) => {
        this.datos = data['content'];
        this.pagination.rowsNumber = data.pagination.rowsNumber;
        this.pagination.pages = data.pagination.pages;
        this.getDatos.emit(this.datos);
      }, error => {
        this.notif.alertError(error);
      });
    }
  }

  pageChanged(event: PageChangedEvent) {
    this.pagination.page = event.page;
    this.obtenerDatos();
  }
}
