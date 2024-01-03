import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fondos-rendir',
  templateUrl: './fondos-rendir.component.html',
  styleUrls: ['./fondos-rendir.component.scss']
})
export class FondosRendirComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label:'Fondos'}, {label: 'Administrar Fondos a Rendir', active: true}];
  }
}
