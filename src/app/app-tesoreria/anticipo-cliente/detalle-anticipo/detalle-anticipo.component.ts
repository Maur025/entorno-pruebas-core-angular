import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnticipoClienteService } from 'src/app/core/services/tesoreria/anticipo-cliente.service';

@Component({
  selector: 'detalle-anticipo',
  templateUrl: './detalle-anticipo.component.html',
  styleUrls: ['./detalle-anticipo.component.scss']
})
export class DetalleAnticipoComponent {
  @Input() dataAnticipoCliente;
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

  constructor(private anticipoClienteService: AnticipoClienteService){}

  ngOnInit(): void {
      this.getDetalleDevengado();
  }

  getDetalleDevengado(){
    this.anticipoClienteService.detalleAnticipoCliente(
      this.pagination.size,
      this.pagination.page,
      this.pagination.descending,
      this.dataAnticipoCliente['id']).subscribe(data=>{
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
