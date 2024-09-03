import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DevengadoService } from 'src/app/core/services/tesoreria/devengado.service';

@Component({
  selector: 'detalle-devengado',
  templateUrl: './detalle-devengado.component.html',
  styleUrls: ['./detalle-devengado.component.scss']
})
export class DetalleDevengadoComponent implements OnInit{
  @Input() dataDevengado;
  @Output() cerrarModal = new EventEmitter<void>();
  creditoDevengadoList: any[]=[];

  constructor(private devengadoService:DevengadoService){}

  ngOnInit(): void {
      this.getDetalleDevengado();
  }

  getDetalleDevengado(){
    this.devengadoService.detalleDevengado(this.dataDevengado['id']).subscribe(data=>{
      this.creditoDevengadoList = data['data'];
    }, error=>console.error("Ha ocurrido un error al llamar el servicio", error));
  }

}
