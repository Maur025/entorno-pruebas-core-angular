import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transacciones-kafka',
  templateUrl: './transacciones-kafka.component.html',
  styleUrls: ['./transacciones-kafka.component.scss']
})
export class TransaccionesKafkaComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{label:'Configuración'}, {label: 'Administrar Transacciones Kafka', active: true}];
  }
}
