import { CentroCostosService } from './../../../tesorery/services/config/centrocosto.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { EstadoFondoOperativoService } from 'src/app/core/services/tesoreria/estado-fondo-operativo.service';
import { FondoOperativoService } from 'src/app/core/services/tesoreria/fondo-operativo.service';
import { tap, catchError } from 'rxjs/operators';
import { ArchivosService } from 'src/app/core/services/archivos.service'
import { of } from 'rxjs';

@Component({
  selector: 'list-movimiento-fondo-operativo',
  templateUrl: './list-movimiento-fondo-operativo.component.html',
  styleUrls: ['./list-movimiento-fondo-operativo.component.scss']
})
export class ListMovimientoFondoOperativoComponent implements OnInit{

  @Input() dataFondo;
  @Output() cerrarModal = new EventEmitter<void>();
  bodyFilters={};
  movimientosList: any[]=[];
  listaCentroCostos: any[]=[];
  filtrosView:boolean=false;
  rangoFechas:boolean=false;
  filtroFecha:any;
  fechaSelect:any;
  centroCostoSelect: any;
  estadoFondoSelect: any;
  listaEstadosFondo: any[]=[];

  constructor(private fondoOperativoService:FondoOperativoService,
    private notificacionService: NotificacionService,
    private centroCostoService: CentroCostosService,
		public archivosService: ArchivosService,
    private estadoFondoOperativoService: EstadoFondoOperativoService
  ){}

  ngOnInit(){
    this.movimientoFondo();
    this.getCentroCostos();
    this.getEstadosFondo();
  }

  movimientoFondo(){
    this.fondoOperativoService.movimientoFondoRendir(this.dataFondo['id'], this.bodyFilters).subscribe(
      data=>{
        this.movimientosList = data['data'];
      }, error=>this.notificacionService.alertError(error));
  }

  getCentroCostos = () => {
		this.centroCostoService.habilitados().subscribe(data=>
				this.listaCentroCostos = data['data']
    ),error =>this.notificacionService.alertError(error);
	}

  getEstadosFondo = () => {
		this.estadoFondoOperativoService.listarEstadoFondo().subscribe(data=>
				this.listaEstadosFondo = data['data']
    ),error =>this.notificacionService.alertError(error);
	}

  getFechas(fecha){
    this.fechaSelect=fecha;
  }

  verFiltros(){
    this.filtrosView = !this.filtrosView;
  }
  filtrar(){
    let filtros = {};
    if(this.fechaSelect && !this.rangoFechas ){
      filtros['fecha']=this.fechaSelect;
    }
    if(this.fechaSelect && this.rangoFechas ){
      filtros['fechaDesde']=this.fechaSelect[0];
      filtros['fechaHasta']=this.fechaSelect[1];
    }
    if(this.centroCostoSelect)
      filtros['centroCostoId']=this.centroCostoSelect;
    if(this.estadoFondoSelect)
      filtros['estadoFondoId']=this.estadoFondoSelect


    this.bodyFilters = filtros;
    this.movimientoFondo();
  }

	descargarComprobante(id) {
    this.fondoOperativoService.exportComprobante(id).pipe(
      tap((data) => {
        this.archivosService.generar64aPDF(data['data'].content, 'comprobante_fondo_operativo.pdf');
      }),
      catchError((error) => {
        this.notificacionService.alertError(error);
        return of(null);
      })
    ).subscribe();
	}

}
