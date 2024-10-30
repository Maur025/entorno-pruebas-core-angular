import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { AnticipoService } from 'src/app/tesorery/services/tesoreria/anticipo.service'
import { CentrocostoService } from 'src/app/tesorery/services/tesoreria/centrocosto.service'
import { FormularioComponent } from '../formulario/formulario.component'
import { AplicacionAnticipoService } from 'src/app/tesorery/services/tesoreria/aplicacion-anticipo.service'
import { UntypedFormGroup } from '@angular/forms'
import { TablaComponent } from 'src/app/core/herramientas/tabla/tabla.component'
import { EstadoAnticipoService } from 'src/app/tesorery/services/tesoreria/estadoanticipo.service'
import { Location } from '@angular/common'
import { FuncionesComponent } from 'src/app/tesorery/funciones.component'

@Component({
  selector: 'app-aplicacion-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent extends FuncionesComponent implements OnInit {
  breadCrumbTitle: string = 'Aplicación de Anticipos'
  titulo: string = 'Lista de Movimientos de Anticipo'
  @ViewChild('appFormAplicacion') appFormAplicacion: FormularioComponent

  @Input() id
  @Input() rel_prefix: any
  @Input() rel_field: any
  @Input() rel_id: any
  @ViewChild('tabla') tabla: TablaComponent
  anticipo: any
  anticipoData: any
  titleModal: any

  public estructura
  breadCrumbItems: Array<{}>
  cargandoContenido = false
  cargandoDatos = false
  datos: any
  listaEstados: any
  modalRef?: BsModalRef
  buscar = false
  textoBuscar = 'Ingrese criterio de búsqueda: movimiento y nro de referencia.'
  inputBuscar = ''
  value: any
  tabId: any
  pregrabadosId: any
  contabilizadosId: any
  formato: any
  filtrosData: any
  comprobante: any
  pagination = {
    size: 10,
    page: 1,
    sortBy: 'id',
    descending: false,
    rowsNumber: 0,
    pages: 0,
  }
  filtroFecha: any
  filtroEstadoAnticipo: any
  filtroMonto: any
  filtroTipoTransaccion: any
  filtroNumero: any
  filtroOperador: any
  filtroDebeHaber: any
  listaEstadoAnticipo: any
  listaTipoTransacciones: any
  operadores = [
    { id: '=', nombre: 'Igual' },
    { id: '>=', nombre: 'Mayor Igual' },
    { id: '<=', nombre: 'Menor Igual' },
  ]
  tipos = [
    { id: null, nombre: 'Todos' },
    { id: 'saldo', nombre: 'Saldo' },
    { id: 'monto', nombre: 'Monto' },
  ]
  submittedRevision = false
  submittedEliminar = false
  formReversion: UntypedFormGroup
  formEliminar: UntypedFormGroup

  constructor(
    public anticipoService: AnticipoService,
    private modalService: BsModalService,
    private NotificacionService: NotificacionService,
    private route: ActivatedRoute,
    private router: Router,
    public AplicacionAnticipoService: AplicacionAnticipoService,
    public centroCostoService: CentrocostoService,
    public estadoAnticipoService: EstadoAnticipoService,
    private location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAnticipo(this.route.snapshot.paramMap.get('id'))
    //this.id = this.route.snapshot.paramMap.get('id');
    this.actualizarFiltros();
    this.getEstadoAnticipo();
    this.formato = this.getCabeceras();
    if (this.rel_prefix && this.rel_field) {
      this.formato.cabeceras[this.rel_field].visible = false
      this.formato.cabeceras[this.rel_field].visibleCheck = false
    }
  }

  getCabeceras() {
    return {
      cabeceras: {
        "id": this.getOpcionesCabecera('id', 12, 'number', false),
        "nroReferencia": this.getOpcionesCabecera('Nro Referencia', 12),
        "createdAt": this.getOpcionesCabecera('Fecha Registro', 12),
        "fecha": this.getOpcionesCabecera('Fecha', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "estado": this.getOpcionesCabecera('Estado', 6),
        "estadoContabilidad": this.getOpcionesCabecera('Estado Contabilidad', 12),
      }
    };
  }

  crear(template: any) {
    this.modalRef = this.modalService.show(template, {
      class: `modal-lg modal-scrollable`,
    })
  }
  editar(data: any, template: any) {
    this.anticipo = data
    this.modalRef = this.modalService.show(template, {
      class: `modal-lg modal-scrollable`,
    })
  }

  actualizarFiltros() {
    const filtro = {}
    filtro['anticipoId'] = this.route.snapshot.paramMap.get('id')

    if (this.filtroFecha != undefined) {
      filtro['fechaDesde'] = this.filtroFecha[0]
      filtro['fechaHasta'] = this.filtroFecha[1]
    }
    if (this.filtroEstadoAnticipo != undefined)
      filtro['estadoAnticipoId'] = this.filtroEstadoAnticipo
    if (this.filtroOperador != undefined)
      filtro['operador'] = this.filtroOperador
    if (this.filtroDebeHaber != undefined)
      filtro['montoSaldo'] = this.filtroDebeHaber
    if (this.filtroTipoTransaccion != undefined)
      filtro['tipoTransaccionId'] = this.filtroTipoTransaccion
    this.filtroMonto != undefined && this.filtroMonto > 0
      ? (filtro['monto'] = Number(this.filtroMonto))
      : delete filtro['monto']
    this.filtroNumero != undefined && this.filtroNumero > 0
      ? (filtro['numero'] = Number(this.filtroNumero))
      : delete filtro['numero']
    this.filtrosData = filtro
  }

  cambioFecha(e) {
    this.filtroFecha = e
    this.actualizarFiltros()
  }

  getEstadoAnticipo() {
    this.estadoAnticipoService.habilitados().subscribe(
      data => {
        this.listaEstadoAnticipo = data['content']
      },
      error => this.NotificacionService.alertError(error)
    )
  }

  regresar() {
    this.location.back()
  }
  cerrarModal() {
    this.modalService.hide()
  }

  eliminar(data: any, component, texto) {
    this.NotificacionService.inhabilitarAlerta(texto, (response: any) => {
      if (response) {
        this.AplicacionAnticipoService.deleteUpdate(data.id).subscribe(
          data => {
            component.obtenerDatos()
            this.NotificacionService.successStandar(
              'Registro ' + texto + ' exitosamente.'
            )
          },
          error => {
            this.NotificacionService.alertError(error)
          }
        )
      }
    })
  }

  getAnticipo(id: string) {
  /*   this.anticipoService.find(id).subscribe(data => {
      this.anticipoData = data.content
    }) */
  }

  refrescar() {
    this.getAnticipo(this.route.snapshot.paramMap.get('id'))
  }
}
