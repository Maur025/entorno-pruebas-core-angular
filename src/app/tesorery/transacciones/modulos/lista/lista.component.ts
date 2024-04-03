import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ModulosService } from 'src/app/tesorery/services/tesoreria/modulos.service';
import { EstadosService } from 'src/app/tesorery/services/tesoreria/estados.service';
import { EsquemaService } from 'src/app/tesorery/services/tesoreria/esquema.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { FuncionesComponent } from 'src/app/tesorery/funciones.component';
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormularioOperativoComponent } from 'src/app/tesorery/fondo/fondos-operativos/formulario/formulario.component';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit {

  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  breadCrumbItems: Array<{}>;
  titulo: string = 'Lista de Transacciones Kafka';
  textoBuscar: string = 'Ingrese criterio de búsqueda: código proceso y descripción';
  moduloId: any;
  listaEstadosIntegracion: any;
  tabId: any;
  estadoIntegracionId: any;
  formato: any;
  filtrosData: any;
  filtrosNoRefresh = ['moduloId', 'estadoIntegracionId'];
  filtroFecha: any;
  modulo: any;
  tituloMovimientos = '';
  modalRef?: BsModalRef;
  procesar: boolean;
  modalTitle: string = '';
  esquema: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estadosService: EstadosService,
    private modulosService: ModulosService,
    public esquemasService: EsquemaService,
    private notificacion: NotificacionService,
    private _localeService: BsLocaleService,
    private modalService: BsModalService,
  ) {
    super();
    this._localeService.use('es');
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Transacciones' }];
    this.moduloId = this.route.snapshot.paramMap.get("modulo_id");
    this.getEstadosIntegracion();
    this.getModulo();
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }
  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "codigoProceso": this.getOpcionesCabecera('Código Proceso', 12),
        "descripcion": this.getOpcionesCabecera('Descripción', 12),
        "fechaEnvio": this.getOpcionesCabecera('Fecha Envio', 12),
        "datos": this.getOpcionesCabecera('Datos', 12),
        "procesado": this.getOpcionesCabecera('Procesado', 12),
        "estado": this.getOpcionesCabecera('Estado Integración', 12),
        "observacion": this.getOpcionesCabecera('Observacion', 12, 'text', true),
        "deleted": this.getOpcionesCabecera('Estado', 6),
      }
    };
  }

  getEstadosIntegracion() {
    this.estadosService.habilitadosIntegracion().subscribe(data => {
      this.listaEstadosIntegracion = data.content;
      this.tabId = this.listaEstadosIntegracion[0].codigo;
      this.estadoIntegracionId = this.listaEstadosIntegracion[0].id;
      this.actualizarFiltros();
    }, error => this.notificacion.alertError(error));
  }

  getModulo() {
    this.modulosService.find(this.moduloId).subscribe(data => {
      this.modulo = data.content;
      this.titulo += ' ' + this.capitalizar(this.modulo.nombre);
      this.tituloMovimientos = 'Listado de Movimientos ' + this.capitalizar(this.modulo.nombre);
      this.breadCrumbItems.push({ label: this.capitalizar(this.modulo.nombre), active: true })
    }, error => this.notificacion.alertError(error));
  }

  modalProcesarTransaccionKafka(template, data): void {
    this.modalTitle = 'Procesar Transacción Movimiento';
    this.esquema = data;
    this.procesar = true;
    let sizeModal;
    this.esquema.codigoProceso == 'RENDFO' ? sizeModal = 'lg' : sizeModal = 'xl';
    this.modalRef = this.modalService.show(template, { class: 'modal-' + sizeModal + ' modal-dialog-scrollable', backdrop: 'static' });
    //this.router.navigate(['transacciones/modulo/'+this.moduloId+'/formulario/'+this.esquema.transaccionKafkaId+'/tipo/'+this.esquema.codigoProceso+'/'+this.esquema.id]);
  }

  verDatos(template, data) {
    this.modalTitle = 'Datos de la Transacción';
    this.esquema = data;
    this.procesar = false;
    this.modalRef = this.modalService.show(template, { class: `modal-md modal-dialog-scrollable` });
  }

  onSelect(data: TabDirective): void {
    this.tabId = data.id;
    this.formato = this.getCabeceras();
    this.estadoIntegracionId = this.listaEstadosIntegracion.find(x => x.codigo == this.tabId).id;
    this.actualizarFiltros();
  }

  cambioFecha(e) {
    this.filtroFecha = e;
    this.actualizarFiltros();
  }
  convertirFecha(fecha, tipo) {
    let fechaOriginal = new Date(fecha);
    let año = fechaOriginal.getFullYear();
    let mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
    let dia = fechaOriginal.getDate().toString().padStart(2, '0');
    if (tipo == 'desde') {
      return (`${año}-${mes}-${dia}T00:00:00.000Z`);
    } else {
      return (`${año}-${mes}-${dia}T23:59:59.999Z`);
    }
  }

  actualizarFiltros() {
    let filtro = {};
    filtro['moduloId'] = this.moduloId;
    filtro['estadoIntegracionId'] = this.estadoIntegracionId;
    if (this.filtroFecha != undefined) {
      filtro['fechaDesde'] = this.convertirFecha(this.filtroFecha[0], 'desde');
      filtro['fechaHasta'] = this.convertirFecha(this.filtroFecha[1], 'hasta');
    }
    this.filtrosData = filtro;
  }

  capitalizar(txt) {
    return txt[0].toUpperCase() + txt.toLowerCase().slice(1);
  }

  rendirFormulario(appFormModulo) {
    this.notificacion.alertaSimpleConfirmacionBoton('¿Está seguro de realizar el proceso de rendición?', 'Si, procesar', (response: any) => {
      if (response) appFormModulo.appFormAsiento.guardar();
    });
  }

  cerrarModal() {
    this.modalService.hide();
  };
}
