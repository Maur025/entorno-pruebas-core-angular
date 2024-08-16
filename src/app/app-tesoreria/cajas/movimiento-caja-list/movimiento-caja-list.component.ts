import { Component, OnInit } from '@angular/core';
import { FuncionesComponent } from '../../funciones.component';
import { ActivatedRoute } from '@angular/router';
import { CajaService } from 'src/app/core/services/tesoreria/caja.service';
import { MovimientoCajaService } from 'src/app/core/services/tesoreria/movimiento-caja.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movimiento-caja-list',
  templateUrl: './movimiento-caja-list.component.html',
  styleUrls: ['./movimiento-caja-list.component.scss']
})
export class MovimientoCajaListComponent extends FuncionesComponent implements OnInit {
  idCaja;
  breadCrumbItems: object[];
  labelBanco: string="";
  formato: any;

  constructor(
    private route: ActivatedRoute,
    private cajaService: CajaService,
    public movimientoCajaService: MovimientoCajaService,
    public location: Location

  ){
    super();
    this.idCaja = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cajaService.find(this.idCaja).subscribe(data=>{
      this.labelBanco= data['data']['nombre'];
      this.breadCrumbItems = [{ label: "Caja" },{ label: this.labelBanco, active: true },]
    });
    this.formato = this.getCabeceras();

  }

  getCabeceras() {
    return {
      cabeceras: {
        "movimiento": this.getOpcionesCabecera('Movimiento', 12),
        "fecha": this.getOpcionesCabecera('Fecha', 12),
        "monto": this.getOpcionesCabecera('Monto', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "estado": this.getOpcionesCabecera('Estado', 12),
      }
    };
  }

  calcularSaldo(a,b, index){
    let amount = a?.monto;
    let signoAmount = a?.ingresoEgreso ? 1 : -1;
    let saldoAnterior =0;
    let saldo =0;

    if(index==0){
      saldo=(signoAmount*amount);
      let id = "saldo_"+index;
      var saldoInfo = document.getElementById(id);
      if(saldoInfo)saldoInfo['value']=saldo;
    }else{
      let indexLast=index-1;
      let id = "saldo_"+indexLast;
      var saldoInfo = document.getElementById(id);
      if(saldoInfo){
        saldoAnterior = parseInt(saldoInfo['value']);
        saldo=saldoAnterior + (signoAmount*amount);
        document.getElementById("saldo_"+index)['value']=saldo;
      }
    }

    return saldo;
  }




}
