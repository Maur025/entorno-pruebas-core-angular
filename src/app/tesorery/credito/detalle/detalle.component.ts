import { Component, EventEmitter, Input, Output, ViewChild, OnInit, } from "@angular/core";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit{
  @Input() credito;

  ngOnInit(): void {
    console.log(this.credito)
  }
}
