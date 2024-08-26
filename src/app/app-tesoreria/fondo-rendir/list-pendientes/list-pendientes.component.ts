import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';

@Component({
  selector: 'list-pendientes',
  templateUrl: './list-pendientes.component.html',
  styleUrls: ['./list-pendientes.component.scss']
})
export class ListPendientesComponent {
  @Input() empleadoId;
  @Output() alSelectAnticipo: EventEmitter<any> = new EventEmitter();
  listaReembolsos: any[];
  anticipoId:string;
  

  constructor(

    private notificacionService: NotificacionService
  ){}

  ngOnInit(){
    this.listPendientesReembolso();
  }

  listPendientesReembolso(){
    /*this.anticipoProveedorService.findAnticipoProveedor(this.empleadoId).subscribe(
      data=>{
        this.listaReembolso = data['data'];
      },error=>this.notificacionService.alertError(error)
    );*/
  }

  selectAnticipo(data){
    let anticipo = {
      id: data['id'],
      saldo: data['saldo']
    }

    this.alSelectAnticipo.emit(anticipo);
  }
}
