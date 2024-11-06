import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { AnticipoClienteService } from 'src/app/core/services/tesoreria/anticipo-cliente.service';
import { ClienteService } from 'src/app/core/services/ventas/clientes.service';
import { FuncionesComponent } from '../../funciones.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-anticipos-cliente',
  templateUrl: './lista-anticipos-cliente.component.html',
  styleUrls: ['./lista-anticipos-cliente.component.scss']
})
export class ListaAnticiposClienteComponent extends FuncionesComponent implements OnInit {
  breadCrumbItems: object[];
  clienteLabel: string="";
  clienteId: any;
  formato: any;
  modalRef?: BsModalRef;
  dataAnticipo: any;

  private modalConfig: {
		ignoreBackdropClick: boolean
		keyboard: boolean
		class: string
	} = {
		ignoreBackdropClick: true,
		keyboard: false,
		class: 'modal-xl modal-scrollable',
	}

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private notificacion:NotificacionService,
    public location: Location,
    public anticipoClienteService : AnticipoClienteService,
    private modalService: BsModalService,

  ){
    super();
    this.clienteId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDataCliente(this.clienteId);
    this.formato = this.getCabeceras();
  }
  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('', 12),
        "centroCosto": this.getOpcionesCabecera('Centro de costos', 12),
        "fecha": this.getOpcionesCabecera('Fecha anticipo', 12),
        "referencia": this.getOpcionesCabecera('Referencia', 12),
        "montoAnticipo": this.getOpcionesCabecera('Total Anticipo', 12),
        "montoAplicado": this.getOpcionesCabecera('Anticipo aplicado', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "estadoContable": this.getOpcionesCabecera('Estado Contable', 12),
      }
    };
  }


  getDataCliente(clienteId){
    this.clienteService.find(clienteId).subscribe(data=>{
      this.clienteLabel = data['data']['razonSocial'];
      this.breadCrumbItems = [{ label: "Anticipo del Cliente" },{ label: this.clienteLabel, active: true },]
    },error=>this.notificacion.alertError(error));
  }

  verMovimientos(anticipo, template){
    this.dataAnticipo=anticipo;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }
}
