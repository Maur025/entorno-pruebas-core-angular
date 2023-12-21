import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fondos-operativos',
  templateUrl: './fondos-operativos.component.html',
  styleUrls: ['./fondos-operativos.component.scss']
})
export class FondosOperativosComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label:'Fondos'}, {label: 'Administrar Fondos Operativos', active: true}];
  }
}
