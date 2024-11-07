import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FondoRendirService } from 'src/app/core/services/tesoreria/fondo-rendir.service';
import { FuncionesComponent } from '../../funciones.component';
import { EmpleadoService } from 'src/app/core/services/tesoreria/empleado.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-fondo-rendir-empleado',
  templateUrl: './list-fondo-rendir-empleado.component.html',
  styleUrls: ['./list-fondo-rendir-empleado.component.scss']
})
export class ListFondoRendirEmpleadoComponent extends FuncionesComponent{
  breadCrumbItems: object[];
  labelEmpleado: string = "";
  idEmpleado: any;
  formato: any;
  modalRef?: BsModalRef;
  empleadoFondoData: any;
  fondoRendirData: any;
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
    public location: Location,
    private modalService: BsModalService,
    public fondoRendirService: FondoRendirService,
    private empleadoService: EmpleadoService
  ){
    super();
    this.idEmpleado = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.empleadoService.find(this.idEmpleado).subscribe(data=>{
      this.labelEmpleado= data['data']['nombre'];
      this.breadCrumbItems = [{ label: "Fondo a Rendir" },{ label: this.labelEmpleado, active: true },]
    });
    this.formato = this.getCabeceras();

  }

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12),
        "fechaDesembolso": this.getOpcionesCabecera('Fecha desembolso', 12),
        "referencia": this.getOpcionesCabecera('Referencia', 12),
        "desembolso": this.getOpcionesCabecera('Desembolso', 12),
        "descargo": this.getOpcionesCabecera('Descargo', 12),
        "saldoDesembolso": this.getOpcionesCabecera('Saldo por Rendir', 12),
        "reembolso": this.getOpcionesCabecera('Reembolso', 12),
        "pagoReembolso": this.getOpcionesCabecera('Pago Reembolso', 12),
        "saldoReembolso": this.getOpcionesCabecera('Saldo  a reembolsar', 12),
        "saldoNeto": this.getOpcionesCabecera('Saldo Neto', 12),
      }
    };
  }

  verMovimientos(fondoRendir, modalMovimientos){
    this.fondoRendirData=fondoRendir;
    this.modalRef = this.modalService.show(modalMovimientos, this.modalConfig)
  }
}
