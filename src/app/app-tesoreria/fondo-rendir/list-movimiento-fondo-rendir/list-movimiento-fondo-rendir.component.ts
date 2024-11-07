import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { FondoRendirService } from 'src/app/core/services/tesoreria/fondo-rendir.service';


@Component({
  selector: 'list-movimiento-fondo-rendir',
  templateUrl: './list-movimiento-fondo-rendir.component.html',
  styleUrls: ['./list-movimiento-fondo-rendir.component.scss']
})
export class ListMovimientoFondoRendirComponent {
  @Input() fondoRendirData: any;
  @Output() cerrarModal = new EventEmitter<void>();
  movimientosList: any[] = [];
  filtrosView :boolean = false;
  rangoFechas: boolean = false;
  bodyFilters={};
  filtroFecha:any;
  fechaSelect:any;
  descripcion:string="";
  public pagination = {
    size: 10,
    page: 0,
    sortBy: "id",
    descending: false,
    pages: 0,
    limit: 0,
  };

  constructor(
		public fondoRendirService: FondoRendirService,
    private notificacionService: NotificacionService,

  ){}

  ngOnInit(){
    this.movimientoFondoRendir();
  }

  movimientoFondoRendir(){
    this.fondoRendirService.getFondoRendirMovimiento(
      this.pagination.size,
      this.pagination.page,
      this.pagination.descending,
      this.fondoRendirData['id'],
      this.bodyFilters).subscribe(
      data=>{
        this.movimientosList = data['data'];
        this.pagination.limit = data['pagination']['count'];
        this.pagination.pages = data['pagination']['pages'];
        this.pagination.pages = data['pagination']['pages'];
      }, error=>this.notificacionService.alertError(error));
  }
  verFiltros(){
    this.filtrosView = !this.filtrosView;
  }
  getFechas(fecha){
    this.fechaSelect=fecha;
  }
  filtrar(){
    let filtros = {};
    if(this.fechaSelect && !this.rangoFechas ){
      filtros['fecha']= this.fechaSelect
    }
    if(this.fechaSelect && this.rangoFechas ){
      filtros['fechaDesde']=this.fechaSelect[0];
      filtros['fechaHasta']=this.fechaSelect[1];
    }
    if(this.descripcion)
      filtros['descripcion']=this.descripcion

    this.bodyFilters = filtros;
    this.movimientoFondoRendir();
  }
  recibirParametrosPage(paramPage){
    this.pagination.page = paramPage.page;
    this.pagination.size = paramPage.size;
    this.movimientoFondoRendir();

  }
}
