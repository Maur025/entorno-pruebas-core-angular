import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { AnticipoProveedorService } from 'src/app/core/services/tesoreria/anticipo-proveedor.service';

@Component({
  selector: 'list-anticipos',
  templateUrl: './list-anticipos.component.html',
  styleUrls: ['./list-anticipos.component.scss']
})
export class ListAnticiposComponent {

  @Input() proveedorId;
  @Output() alSelectAnticipo: EventEmitter<any> = new EventEmitter();
  listaAnticipos: any[]=[];
  anticipoId:string;
  public pagination = {
    size: 5,
    page: 0,
    sortBy: "fecha",
    descending: true,
    pages: 0,
    limit: 0,
  };

  constructor(
    private anticipoProveedorService: AnticipoProveedorService,
    private notificacionService: NotificacionService
  ){}

  ngOnInit(){
    this.listAnticipos();
  }

  listAnticipos(){
    this.anticipoProveedorService.findAnticipoProveedor(
      this.pagination.size,
      this.pagination.page,
      this.pagination.sortBy,
      this.pagination.descending,
      '',this.proveedorId).subscribe(
      data=>{
        this.listaAnticipos = data['data'];
        this.pagination.limit = data['pagination']['count'];
        this.pagination.pages = data['pagination']['pages'];
        this.pagination.pages = data['pagination']['pages'];
      },error=>this.notificacionService.alertError(error)
    );
  }

  selectAnticipo(data){
    let anticipo = {
      id: data['id'],
      saldo: data['saldo']
    }

    this.alSelectAnticipo.emit(anticipo);
  }

  recibirParametrosPage(paramPage){
    this.pagination.page = paramPage.page;
    this.pagination.size = paramPage.size;
    this.listAnticipos();

  }

}
