import { filter } from 'rxjs/operators';

import { Component, Input, OnInit, Output, TemplateRef, EventEmitter, enableProdMode, ViewChild, ElementRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { formatDate } from "@angular/common";
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { Apiservicio } from 'src/app/core/services/compras/apiservicio';
import { ArchivosService } from 'src/app/core/services/archivos.service';

@Component({
  selector: 'krn-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @ViewChild('cab') input: ElementRef<HTMLInputElement>;

  @Input() titulo: string = 'Nombre de Tabla';
  @Input() datosService: Apiservicio;
  @Input() linkNuevo = '';
  @Input() busquedaAvanzada = false;
  @Input() templateFila: TemplateRef<any>;
  @Input() templateTbody: TemplateRef<any>;
  @Input() templateTop: TemplateRef<any>;
  @Input() templateDescargas: TemplateRef<any>;
  @Input() mostrarFormBusqueda = true;
  @Input() modoCustom = false;
  @Input() botonNuevo = true;
  @Input() plantilla = true;
  @Input() textoBuscar: string = 'Buscar ...';


  @Output() crearNuevo: EventEmitter<any> = new EventEmitter();
  @Output() alActualizar: EventEmitter<any> = new EventEmitter();
  @Output() alBuscar: EventEmitter<any> = new EventEmitter();
  @Output() alFiltrar: EventEmitter<any> = new EventEmitter();
  @Output() alOrdenar: EventEmitter<any> = new EventEmitter();
  @Output() alRecargar: EventEmitter<any> = new EventEmitter();

  @Input() estructuraDatos: any;

  inputBuscar: string = '';
  datos: any;
  datosBuscados: any;
  datosFiltrados: any = [];
  total = 0;
  paginaActual = 1;
  porPagina = 10;
  ordenColumna = '';
  orden = 'desc';
  modalRef?: BsModalRef;
  daterange_hidden = false;

  objectKeys = Object.keys;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  usuarioForm!: UntypedFormGroup;
  submitted = false;
  esBusquedaAvanzada = false;
  modoPaginado = true;
  cabeceras: any;
  cabecerasFiltrables: any;
  estaFiltrado = false;
  filtro: Array<any>;

  estaCargando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    public notificacionService: NotificacionService,
    private _localeService: BsLocaleService,
    private archivosService:ArchivosService,
    private formBuilder: UntypedFormBuilder) {
      this._localeService.use('es');
    // this.obtenerDatos();
  }
  ngOnInit(): void {
    //this.estructuraDatos = this.datosService.obtenerEstructura(this.porPagina, this.paginaActual, () => {    });
    this.cabeceras = this.objectKeys(this.estructuraDatos.cabeceras).filter(c => this.estructuraDatos.cabeceras[c].visible);
    this.cabecerasFiltrables = this.objectKeys(this.estructuraDatos.cabeceras).filter(c => this.estructuraDatos.cabeceras[c].filtrable);

    this.obtenerDatos();

  }
  get form() {
    return this.usuarioForm.controls;
  }
  irNuevo() {
    this.crearNuevo.emit();
  }
  filtrar() {
    this.inputBuscar='';
    this.estaFiltrado = true;
    this.estaCargando = true;
    this.filtro = [];
    this.paginaActual = 1;
    this.cabecerasFiltrables.forEach((e, k) => {
      let valores;
      let valoresArray = [];
      switch (this.estructuraDatos.cabeceras[e].filtrotipo) {
        case 'rango':
          valores = (this.estructuraDatos.cabeceras[e].valormin || 0) + '|' + (this.estructuraDatos.cabeceras[e].valormax || 0);
          break;
        case 'boolean':
          valores = (this.estructuraDatos.cabeceras[e].valor ? '1' : '0');
          break;
        case 'select':
          if(this.estructuraDatos.cabeceras[e]['texto']=='Estado'){
            valores = this.estructuraDatos.cabeceras[e].valor;
          }else{
            valores = (this.estructuraDatos.cabeceras[e].valor || 0);
          }
          break;
        case 'selectmultiple':
          if (this.estructuraDatos.cabeceras[e].valor === undefined) valores = "";
          else valores = this.estructuraDatos.cabeceras[e].valor.join("|");
          break;
        case 'checkbox':
          let datos = [];
          this.estructuraDatos.cabeceras[e].datos.forEach((e1, i1) => {
            if (e1.valor == true)
              datos.push(e1.id);
          });
          valores = datos.join("|");
          break;
        case 'rango_fechas':
          if(this.estructuraDatos.cabeceras[e].valor){
            valoresArray[0] = formatDate(this.estructuraDatos.cabeceras[e].valor[0], 'yyyy-MM-dd', 'en-US');
            valoresArray[1] = formatDate(this.estructuraDatos.cabeceras[e].valor[1], 'yyyy-MM-dd', 'en-US');
          }
          break;
        default:
          valores = this.estructuraDatos.cabeceras[e].valor || ''
          break;
      }
      if ((!(valores == '') && (valores!=undefined)) || (valores===false)){
        this.filtro.push(
          {
            campo: e,
            filtrotipo: this.estructuraDatos.cabeceras[e].filtrotipo || 'texto',
            valor: valores
          }
        );
      }else{
        if (valoresArray && valoresArray.length>0){
          this.filtro.push(
            {
              campo: e,
              filtrotipo: this.estructuraDatos.cabeceras[e].filtrotipo || 'texto',
              valor: valoresArray
            }
          );
        }
      }
    });

    this.datosService.filter(this.filtro, this.porPagina, this.paginaActual, this.ordenColumna, this.orden).subscribe((result: any) => {
      this.datos = result.content;
      this.datosBuscados = this.datos;
      this.datosFiltrados = this.datosBuscados;
      this.paginaActual = result['pagination']['page'];
      this.total = result['pagination']['rowsNumber'];
      this.porPagina = result['pagination']['perPage'];
      this.estaCargando = false;
    });
    this.alFiltrar.emit(this.filtro);
  }

  buscarKeydown(buscar) {
    if (!this.inputBuscar || this.inputBuscar == '' || buscar) {
      this.paginaActual = 1;
      this.estaFiltrado = false;
      this.cabecerasFiltrables.forEach(element => {
        this.estructuraDatos.cabeceras[element].valor = '';
      });
      this.obtenerDatos();
    }
  }

  public customObtenerDatos(result:any){
    this.datos = result.content;
    this.datosBuscados = this.datos;
    this.datosFiltrados = this.datosBuscados;
    this.paginaActual = result['pagination']['page'];
    this.total = result['pagination']['rowsNumber'];
    this.porPagina = result['pagination']['perPage'];
    this.estaCargando = false;
  }

  public obtenerDatos() {

    if (this.modoCustom){

      this.estaCargando = true;
        this.alRecargar.emit({filtro:this.filtro, porPagina:this.porPagina,paginaActual: this.paginaActual,ordenColumna: this.ordenColumna, orden: this.orden, search:  this.inputBuscar})
      return;
    }

    this.estaCargando = true;
    if (this.modoPaginado) {
      if (this.estaFiltrado) {
        this.datosService.filter(this.filtro, this.porPagina, this.paginaActual, this.ordenColumna, this.orden).subscribe((result: any) => {

          this.datos = result.content;
          this.datosBuscados = this.datos;
          this.datosFiltrados = this.datosBuscados;
         // this.paginaActual = result['pagination']['page'];
          this.total = result['pagination']['rowsNumber'];
          //this.porPagina = result['pagination']['perPage'];
          this.estaCargando = false;
        },
          error => {
            this.notificacionService.alertError(error);
          });
      } else {

        this.datosService.search(this.porPagina, this.paginaActual, this.inputBuscar, this.ordenColumna, this.orden).pipe().subscribe((result: any) => {

          this.datos = result.content;
          this.datosBuscados = this.datos;
          this.datosFiltrados = this.datosBuscados;
         // this.paginaActual = result['pagination']['page'];
          this.total = result['pagination']['rowsNumber'];
          //this.porPagina = result['pagination']['perPage'];
          this.estaCargando = false;
        },
          error => {
            this.notificacionService.alertError(error);
          });
      }
    } else {
      if (this.inputBuscar.length > 1) {
        this.datosBuscados = this.datos.filter(x => {
          this.estaCargando = false;
          var encontrado = false;
          this.cabecerasFiltrables.forEach(e => {
            if ((x[e] + '').toUpperCase().includes(this.inputBuscar.toUpperCase())) {
              return encontrado = true;
            }
          });
          return encontrado;
        });
      }
      //this.datosFiltrados = this.datosBuscados;
      const startItem = 0;
      const endItem = 1 * this.porPagina;
      this.total = this.datosBuscados.length;
      this.datosFiltrados = this.datosBuscados.slice(startItem, endItem);
    }
  }

  pageChanged(event: PageChangedEvent) {
    this.paginaActual = event.page;
    this.obtenerDatos();
    console.log()
  }

  resetButtons = (event) => {
    let tableButtons: any = document.getElementsByClassName("colCabecera");;
    [...tableButtons].map((button) => {
      if (button !== event.target) {
        button.removeAttribute("data-dir");
      }
    });

  };

  ordenar(e) {
    this.resetButtons(e);
    if (e.target.getAttribute("data-dir") == "desc") {
      //sortData(response.pokedata, e.target.id, "desc");
      this.ordenColumna = e.target.id;
      this.orden = 'asc';

      e.target.setAttribute("data-dir", "asc");
    } else {
      //sortData(response.pokedata, e.target.id, "asc");
      e.target.setAttribute("data-dir", "desc");
      this.ordenColumna = e.target.id;
      this.orden = 'desc';
    }
    this.obtenerDatos();
  }

  nuevoAlmacen(content: any) {
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  toggleBusqueda() {

    document.getElementById('busquedaAvanzada').classList.toggle('show');
  }
  filtrarColumnasVisibles(arr: string[]) {
    let arrr = this.estructuraDatos.cabeceras.filter((x, i) => {
      return x.visible
    })
    return arrr;
  }

  descargarArchivo(tipo){
    //let params = this.datosBusqueda();
    //this.inputBuscar == ''
    let params ={
      buscarInput: this.inputBuscar,
      filtros: this.filtro
    }
    this.datosService.exportRegister(tipo,params)
    .subscribe(
      data => {
        if(tipo == 'excel'){
          this.archivosService.generarExcel(data, "Registros.xlsx");
        }
        else{
          if(tipo == 'pdf'){
            this.archivosService.generarPDF(data, "Registros.pdf");
          }
        }
      },
      error => {
        this.notificacionService.alertError(error);
      }
    );
  }

  refrescar(){
    this.filtro = [];
    this.inputBuscar='';
    this.paginaActual = 1;
    this.estaFiltrado = false;
    this.cabecerasFiltrables.forEach(element => {
      this.estructuraDatos.cabeceras[element].valor = '';
    });
    this.obtenerDatos();
  }
}
