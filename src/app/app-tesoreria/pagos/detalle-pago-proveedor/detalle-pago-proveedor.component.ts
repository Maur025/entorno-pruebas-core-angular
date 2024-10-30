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
  detalleCompra: any;
  verDetalle: boolean=false;
  constructor(
    private pagosService:PagosService,
    private notificacionService:NotificacionService
  ){}

  ngOnInit(): void {
    this.comprasDelProveedor();
  }

  comprasDelProveedor(){
    this.pagosService.comprasPorProveedor(this.dataProveedor['id']).subscribe(data=>{
      this.listCompras = data['data'];
    }, error=>this.notificacionService.alertError(error));
  }
  verMas= (pagoData): void => {
    this.detalleCompra = pagoData;
    pagoData.showForm = !pagoData.showForm;
    this.verDetalle = !this.verDetalle;
  }
}
