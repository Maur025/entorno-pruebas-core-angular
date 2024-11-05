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

  public pagination = {
    size: 10,
    page: 0,
    sortBy: "id",
    descending: true,
    pages: 0,
    limit: 0,
  };

  constructor(private anticipoProveedorService: AnticipoProveedorService){}

  ngOnInit(): void {
      this.getDetalleDevengado();
  }

  getDetalleDevengado(){
    this.anticipoProveedorService.detalleAnticipoProveedor(
      this.pagination.size,
      this.pagination.page,
      this.pagination.descending,
      this.dataAnticipoProveedor['id']).subscribe(data=>{
      this.detalleList = data['data'];
      this.pagination.limit = data['pagination']['count'];
      this.pagination.pages = data['pagination']['pages'];
      this.pagination.pages = data['pagination']['pages'];
    }, error=>console.error("Ha ocurrido un error al llamar el servicio", error));
  }

  recibirParametrosPage(paramPage){
    this.pagination.page = paramPage.page;
    this.pagination.size = paramPage.size;
    this.getDetalleDevengado();

  }
}
