import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { CobroService } from 'src/app/core/services/tesoreria/cobro.service';

@Component({
  selector: 'detalle-cobro-cliente',
  templateUrl: './detalle-cobro-cliente.component.html',
  styleUrls: ['./detalle-cobro-cliente.component.scss']
})
export class DetalleCobroClienteComponent {
  @Input() dataCliente;
  @Output() cerrarModal = new EventEmitter<void>();
  listVentas:any;
  detalleVenta: any ={};
  verDetalle: boolean=false;

  public pagination = {
    size: 10,
    page: 0,
    sortBy: "fecha",
    descending: true,
    pages: 0,
    limit: 0,
  };

  constructor(
    private cobroService:CobroService,
    private notificacionService:NotificacionService
  ){}

  ngOnInit(): void {
    this.ventasDelCliente();
  }

  ventasDelCliente(){
    this.cobroService.getSalesPendingByClientId(
      this.dataCliente['id'],
      this.pagination.page,
      this.pagination.size,
      this.pagination.sortBy,
      this.pagination.descending,
      ).subscribe(data=>{
         data['data'].forEach(element => {
          element['showForm'] = false;
        });
      this.listVentas = data['data'];
      this.pagination.limit = data['pagination']['count'];
      this.pagination.pages = data['pagination']['pages'];
      this.pagination.pages = data['pagination']['pages'];
    }, error=>this.notificacionService.alertError(error));
  }

  verMas= (pagoData): void => {
    pagoData.showForm = !pagoData.showForm;
    this.detalleVenta = pagoData;
    this.verDetalle = !this.verDetalle;
  }

  recibirParametrosPage(paramPage){
    this.pagination.page = paramPage.page;
    this.pagination.size = paramPage.size;
    this.ventasDelCliente();

  }
}
