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
    this.listAnticipos();
  }

  listAnticipos(){
    this.anticipoProveedorService.findAnticipoProveedor(this.proveedorId).subscribe(
      data=>{
        this.listaAnticipos = data['data'];
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

}
