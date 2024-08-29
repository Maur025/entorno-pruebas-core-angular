import { Component, OnInit } from '@angular/core';
import { FuncionesComponent } from '../../funciones.component';
import { ActivatedRoute } from '@angular/router';
import { BancoService } from 'src/app/core/services/tesoreria/banco.service';
import { CuentaBancoService } from 'src/app/core/services/tesoreria/cuenta-banco.service';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cuenta-banco-list',
  templateUrl: './cuenta-banco-list.component.html',
  styleUrls: ['./cuenta-banco-list.component.scss']
})
export class CuentaBancoListComponent extends FuncionesComponent implements OnInit{

  idBanco: string;
  breadCrumbItems: object[];
  labelBanco: string="";
  formato: any;
  modalRef?: BsModalRef;
  cuentaBancoData: any;

  constructor(
    private route: ActivatedRoute,
    private bancoService: BancoService,
    public cuentaBancoService: CuentaBancoService,
    public location: Location,
    private modalService: BsModalService,
  ){
    super();
    this.idBanco = this.route.snapshot.paramMap.get('id');
  }

  private modalConfig: {
		ignoreBackdropClick: boolean
		keyboard: boolean
		class: string
	} = {
		ignoreBackdropClick: true,
		keyboard: false,
		class: 'modal-xl modal-scrollable',
	}

  ngOnInit(): void {
    this.bancoService.find(this.idBanco).subscribe(data=>{
      this.labelBanco= data['data']['nombre'];
      this.breadCrumbItems = [{ label: "Banco" },{ label: this.labelBanco, active: true },]
    });
    this.formato = this.getCabeceras();

  }

  getCabeceras() {
    return {
      cabeceras: {
        "nroCuenta": this.getOpcionesCabecera('Nº de Cuenta', 12),
        "moneda": this.getOpcionesCabecera('Moneda', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
      }
    };
  }

  verMovimientos(cuentaBanco, modalMovimientos){
    this.cuentaBancoData=cuentaBanco;
    this.modalRef = this.modalService.show(modalMovimientos, this.modalConfig)
  }

}
