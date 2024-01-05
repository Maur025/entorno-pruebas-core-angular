import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago-contado',
  templateUrl: './pago-contado.component.html',
  styleUrls: ['./pago-contado.component.scss']
})
export class PagoContadoComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label:'Configuración'}, {label: 'Administrar Pagos al Contado', active: true}];
  }
}
