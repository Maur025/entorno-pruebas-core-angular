import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { TransaccionesComprasService } from 'src/app/tesorery/services/tesoreria/transaccionesCompras.service';
@Component({
  selector: 'app-formulario-modulo',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioModuloComponent implements OnInit {

  @ViewChild('appFormOperativo') appFormOperativo;
  @ViewChild('appFormCredito') appFormCredito;
  @ViewChild('appFormRendir') appFormRendir;

  @Output() alProcesar = new EventEmitter<any>();
  @Input() modulo;
  @Input() moduloId;
  @Input() esquema;
  @Input() transaccion;

  cargandoContenido = false;

  constructor(
    private transaccionesComprasService: TransaccionesComprasService,
    private notificacion: NotificacionService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.esquema;
  }

  cerrarModal() {
    this.modalService.hide();
  }
}
