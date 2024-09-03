import { AnticipoProveedorService } from 'src/app/core/services/tesoreria/anticipo-proveedor.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'detalle-anticipo',
  templateUrl: './detalle-anticipo.component.html',
  styleUrls: ['./detalle-anticipo.component.scss']
})
export class DetalleAnticipoComponent {
  @Input() dataAnticipoProveedor;
  @Output() cerrarModal = new EventEmitter<void>();
  detalleList: any[]=[];

  constructor(private anticipoProveedorService: AnticipoProveedorService){}

  ngOnInit(): void {
      this.getDetalleDevengado();
  }

  getDetalleDevengado(){
    this.anticipoProveedorService.detalleAnticipoProveedor(this.dataAnticipoProveedor['id']).subscribe(data=>{
      this.detalleList = data['data'];
    }, error=>console.error("Ha ocurrido un error al llamar el servicio", error));
  }
}
