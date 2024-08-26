import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { FondoRendirService } from 'src/app/core/services/tesoreria/fondo-rendir.service';
import { UtilityService } from 'src/app/shared/services/utilityService.service';

@Component({
  selector: 'list-pendientes',
  templateUrl: './list-pendientes.component.html',
  styleUrls: ['./list-pendientes.component.scss']
})
export class ListPendientesComponent {
  @Input() empleadoId;
  @Output() alSelectPendiente: EventEmitter<any> = new EventEmitter();
  listaReembolsos: any[];
  fondoRendirId:string;
  totalARemmbolsar:number=0;


  constructor(
    private fondoRendirService: FondoRendirService,
    private notificacionService: NotificacionService,
    protected utilityService: UtilityService,
  ){}

  ngOnInit(){
    this.listPendientesReembolso();
  }

  listPendientesReembolso(){
    this.fondoRendirService.reembolsosPendientes(this.empleadoId).subscribe(
      data=>{
        this.listaReembolsos = data['data'];
      },error=>this.notificacionService.alertError(error)
    );
  }

  selectPendiente(data,i){
    const inputs = document.querySelectorAll('input[name="inputsPendiente"]');
    let id = "input_pagar_"+i;
    var inputPagar = document.getElementById(id);
    if(inputPagar)inputPagar.removeAttribute("disabled");
    inputs.forEach(input => {
      if(input['id'] !== inputPagar['id'])
        input.setAttribute("disabled", "true");
    });
  }


  changeInputPagar(monto, i, data){
    if( data['fondoRendirId']!== data['montoExcedente'])console.error("validar")
     let reembolsoPendiente = {
      fondoRendirId: data['fondoRendirId'],
      montoPagar: monto
    }

    this.alSelectPendiente.emit(reembolsoPendiente);
  }

}
