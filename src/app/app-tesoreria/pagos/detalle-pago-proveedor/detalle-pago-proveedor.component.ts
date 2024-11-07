import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { PagosService } from 'src/app/core/services/tesoreria/pagos.service';

@Component({
  selector: 'detalle-pago-proveedor',
  templateUrl: './detalle-pago-proveedor.component.html',
  styleUrls: ['./detalle-pago-proveedor.component.scss']
})
export class DetallePagoProveedorComponent implements OnInit {
  @Input() dataProveedor: any;
  @Output() cerrarModal = new EventEmitter<void>();
  listCompras: any[]=[];
  detalleCompra: any ={};
  verDetalle: boolean=false;
  public pagination = {
    size: 10,
    page: 0,
    sortBy: "id",
    descending: true,
    pages: 0,
    limit: 0,
  };


  constructor(
    private pagosService:PagosService,
    private notificacionService:NotificacionService
  ){}

  ngOnInit(): void {
    this.comprasDelProveedor();
  }

  comprasDelProveedor(){
    this.pagosService.comprasPorProveedor(
      this.pagination.size,
      this.pagination.page,
      this.pagination.descending,
      this.dataProveedor['id']).subscribe(data=>{
         data['data'].forEach(element => {
          element['showForm'] = false;
        });
        this.listCompras = data['data'];
      this.pagination.limit = data['pagination']['count'];
      this.pagination.pages = data['pagination']['pages'];
      this.pagination.pages = data['pagination']['pages'];
    }, error=>this.notificacionService.alertError(error));
  }
  verMas= (pagoData): void => {
    pagoData.showForm = !pagoData.showForm;
    this.detalleCompra = pagoData;
    this.verDetalle = !this.verDetalle;
  }

  recibirParametrosPage(paramPage){
    this.pagination.page = paramPage.page;
    this.pagination.size = paramPage.size;
    this.comprasDelProveedor();

  }
}
