import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fondos-caja',
  templateUrl: './fondos-caja.component.html',
  styleUrls: ['./fondos-caja.component.scss']
})
export class FondosCajaComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label:'Fondos'}, {label: 'Administrar Fondos de Caja', active: true}];
  }
}
