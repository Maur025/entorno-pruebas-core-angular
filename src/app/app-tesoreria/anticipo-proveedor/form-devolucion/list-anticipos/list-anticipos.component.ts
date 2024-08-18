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
  listaAnticipos: any[];
  anticipoId:string;
  

  constructor(
    private anticipoProveedorService: AnticipoProveedorService,
    private notificacionService: NotificacionService
  ){}

  ngOnInit(){
    console.log("list", this.proveedorId);
    this.listAnticipos();
  }

  listAnticipos(){
    this.anticipoProveedorService.findAnticipoProveedor(this.proveedorId).subscribe(
      data=>{
        console.log(data);
        this.listaAnticipos = data['data'];
      }
    );
  }

  selectAnticipo(data){

    let anticipo = {
      id: data['id'],
      saldo: data['saldo']
    }

    this.alSelectAnticipo.emit(anticipo);
  }

}
