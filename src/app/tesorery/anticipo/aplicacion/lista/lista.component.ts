import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { AnticipoService } from 'src/app/tesorery/services/tesoreria/anticipo.service';
import { CentrocostoService } from 'src/app/tesorery/services/tesoreria/centrocosto.service';
import { FormularioComponent } from '../formulario/formulario.component'
import { AplicacionAnticipoService } from 'src/app/tesorery/services/aplicacion-anticipo.service';
import { UntypedFormGroup } from '@angular/forms';
import { TablaComponent } from 'src/app/core/herramientas/tabla/tabla.component';
import { EstadoAnticipoService } from 'src/app/tesorery/services/tesoreria/estadoanticipo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aplicacion-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {


  breadCrumbTitle: string = 'Aplicación de Anticipos';
  titulo: string = 'Detalle de movimientos'
  @ViewChild('appFormAplicacion') appFormAplicacion: FormularioComponent;

  @Input() id;
  @Input() rel_prefix: any;
  @Input() rel_field: any;
  @Input() rel_id: any;
  @ViewChild('tabla') tabla: TablaComponent;
  anticipo: any;
  public estructura;
  breadCrumbItems: Array<{}>;
  cargandoContenido = false;
  cargandoDatos = false;
  datos: any;
  listaEstados: any;
  modalRef?: BsModalRef;
  buscar = false;
  textoBuscar = 'Ingrese criterio de búsqueda: movimiento y nro de referencia.'
  inputBuscar = '';
  value: any;
  tabId: any;
  pregrabadosId: any;
  contabilizadosId: any;
  formato: any;
  filtrosData: any;
  comprobante: any;
  pagination = {
    size: 10,
    page: 1,
    sortBy: 'id',
    descending: false,
    rowsNumber: 0,
    pages: 0
  };
  filtroFecha: any;
  filtroEstadoAnticipo: any;
  filtroMonto: any;
  filtroTipoTransaccion: any;
  filtroNumero: any;
  filtroOperador: any;
  filtroDebeHaber: any;
  listaEstadoAnticipo: any;
  listaTipoTransacciones: any;
  operadores = [
    { id: "=", nombre: "Igual" },
    { id: ">=", nombre: "Mayor Igual" },
    { id: "<=", nombre: "Menor Igual" },
  ];
  tipos = [
    { id: null, nombre: "Todos" },
    { id: "saldo", nombre: "Saldo" },
    { id: "monto", nombre: "Monto" },
  ];
  submittedRevision = false;
  submittedEliminar = false;
  formReversion: UntypedFormGroup;
  formEliminar: UntypedFormGroup;


  constructor(
    public AnticipoService: AnticipoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router,
    public AplicacionAnticipoService: AplicacionAnticipoService,
    public centroCostoService: CentrocostoService,
    public estadoAnticipoService: EstadoAnticipoService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.actualizarFiltros();
    //this.breadCrumbItems = [{ label: 'Reportes'}, {label: 'Libro Diario', active:true}]
    this.getEstadoAnticipo();
    this.formato = {
      cabeceras: {
        "acciones": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Acciones", "colsize": "12", "filtrotipo": "number" },
        "id": { "visible": false, "buscable": true, "buscableCheck": true, "visibleCheck": false, "sortable": true, "filtrable": true, "texto": "ID", "colsize": "12", "filtrotipo": "text" },
        "fecha": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Fecha", "colsize": "12", "filtrotipo": "number" },
        "movimiento": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Movimiento", "colsize": "12", "filtrotipo": "number" },
        "nroReferencia": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Nro Referncia", "colsize": "12", "filtrotipo": "text" },
        "monto": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Monto", "colsize": "12", "filtrotipo": "text" },
        "saldo": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Saldo", "colsize": "12", "filtrotipo": "number" },
        "estado": { "visible": true, "buscable": true, "buscableCheck": true, "visibleCheck": true, "sortable": true, "filtrable": true, "texto": "Estado", "colsize": "12", "filtrotipo": "number" },
      }
    };
    if (this.rel_prefix && this.rel_field) { this.formato.cabeceras[this.rel_field].visible = false; this.formato.cabeceras[this.rel_field].visibleCheck = false }

  }

  crear(template: any) {
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }
  editar(data: any, template: any) {

    console.log(data);
    this.anticipo = data;
    this.modalRef = this.modalService.show(template, { class: `modal-lg modal-scrollable` });
  }

  actualizarFiltros() {
    let filtro = {};
    filtro['anticipoId'] = this.route.snapshot.paramMap.get('id');

    if (this.filtroFecha != undefined) {
      filtro['fechaDesde'] = this.filtroFecha[0];
      filtro['fechaHasta'] = this.filtroFecha[1];
    }
    if (this.filtroEstadoAnticipo != undefined) filtro['estadoAnticipoId'] = this.filtroEstadoAnticipo;
    if (this.filtroOperador != undefined) filtro['operador'] = this.filtroOperador;
    if (this.filtroDebeHaber != undefined) filtro['montoSaldo'] = this.filtroDebeHaber;
    if (this.filtroTipoTransaccion != undefined) filtro['tipoTransaccionId'] = this.filtroTipoTransaccion;
    (this.filtroMonto != undefined && this.filtroMonto > 0) ? filtro['monto'] = Number(this.filtroMonto) : delete filtro['monto'];
    (this.filtroNumero != undefined && this.filtroNumero > 0) ? filtro['numero'] = Number(this.filtroNumero) : delete filtro['numero'];
    this.filtrosData = filtro;
  }

  cambioFecha(e) {
    this.filtroFecha = e;
    this.actualizarFiltros();
  }

  getEstadoAnticipo() {
    this.estadoAnticipoService.habilitados().subscribe(data => {
      this.listaEstadoAnticipo = data['content'];
    }, error => this.NotificacionService.alertError(error));
  }

  regresar() {
    this.location.back();
  }
  cerrarModal() {
    this.modalService.hide();
  }


  eliminar(data: any, component, texto) {
    console.log();
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.AplicacionAnticipoService.deleteUpdate(data.id).subscribe(
          (data) => {
            component.obtenerDatos();
            this.NotificacionService.successStandar('Registro ' + texto + ' exitosamente.');
          },
          (error) => {
            this.NotificacionService.alertError(error);
          }
        );
      }
    });
  }

}
