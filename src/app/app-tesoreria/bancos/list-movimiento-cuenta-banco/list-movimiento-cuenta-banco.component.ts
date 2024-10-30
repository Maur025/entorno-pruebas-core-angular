import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { BancoService } from 'src/app/core/services/tesoreria/banco.service';
import { MedioTransferenciaService } from 'src/app/core/services/tesoreria/medio-transferencia.service';
import { tap, catchError } from 'rxjs/operators';
import { ArchivosService } from 'src/app/core/services/archivos.service'
import { of } from 'rxjs';
import { CuentaBancoService } from "src/app/core/services/tesoreria/cuenta-banco.service";

@Component({
  selector: 'list-movimiento-cuenta-banco',
  templateUrl: './list-movimiento-cuenta-banco.component.html',
  styleUrls: ['./list-movimiento-cuenta-banco.component.scss']
})
export class ListMovimientoCuentaBancoComponent implements OnInit{

  @Input() cuentaBanco: any;
  movimientosList: any[] = [];
  @Output() cerrarModal = new EventEmitter<void>();
  filtrosView :boolean = false;
  medioTransferenciaList: any[]=[];
  movimientosTipoList: any[] = [{label: 'Todos', value: 'all'}, {label: 'Ingreso', value: 'true'}, {label: 'Egreso', value: 'false'}];
  rangoFechas: boolean=false;
  filtroFecha:any;

  descripcion:string = "";
  fechaSelect: any;
  medioTransferenciaSelect: any;
  tipoMovimiento: any;
  bodyFilters={};

  constructor(
		public bancoService: BancoService,
    private notificacionService: NotificacionService,
    private medioTransferenciaService: MedioTransferenciaService,
    private cuentaBancoService: CuentaBancoService,
		public archivosService: ArchivosService
  ){}

  ngOnInit(){
    this.movimientoCuenta();
    this.getMediosTransferencia();
  }

  movimientoCuenta(){
    this.bancoService.movimientoCuentaBanco(this.cuentaBanco['id'], this.bodyFilters).subscribe(
      data=>{
        this.movimientosList = data['data'];
      }, error=>this.notificacionService.alertError(error));
  }
  verFiltros(){
    this.filtrosView = !this.filtrosView;
  }
  getFechas(fecha){
    this.fechaSelect=fecha;
  }

  getMediosTransferencia(){
		this.medioTransferenciaService?.habilitados()?.subscribe(
			data => {
				this.medioTransferenciaList = data['data'];
			},error => {this.notificacionService?.alertError(error)}
		)
	}

  filtrar(){
    let filtros = {};
    if(this.fechaSelect && !this.rangoFechas ){
      filtros['fechaFija']=this.fechaSelect;
    }
    if(this.fechaSelect && this.rangoFechas ){
      filtros['fechaDesde']=this.fechaSelect[0];
      filtros['fechaHasta']=this.fechaSelect[1];
    }
    if(this.tipoMovimiento)
      filtros['ingresoEgreso']=this.tipoMovimiento!= "all" ? this.tipoMovimiento:null
    if(this.medioTransferenciaSelect)
      filtros['medioTransferenciaId']=this.medioTransferenciaSelect
    if(this.descripcion)
      filtros['descripcion']=this.descripcion

    this.bodyFilters = filtros;
    this.movimientoCuenta();
  }

  descargarComprobante(id) {
    this.cuentaBancoService.generarComprobanteMovimiento(id).pipe(
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
