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

  @ViewChild('appFormAsiento') appFormAsiento;
  @Output() alProcesar = new EventEmitter<any>();
  @Input() modulo;
  @Input() moduloId;
  @Input() esquema;
  transaccion: any;
  cargandoContenido = false;

  constructor(
    private transaccionesComprasService: TransaccionesComprasService,
    private notificacion: NotificacionService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getAsientoAutomaticoDatos();
  }

  getAsientoAutomaticoDatos() {
    this.cargandoContenido = true;
    switch (this.modulo.codigo) {
      case 'COM':
        this.transaccionesComprasService.getMovimientoFondoOperativo({transaccionKafkaId: this.esquema.transaccionKafkaId}).subscribe(data => {
          this.transaccion = data.content;
          this.cargandoContenido = false;
        }, error => {
          this.cerrarModal();
          this.notificacion.alertError(error);
        });
        break;
      case 'VEN':

        break;
    }
  }

  cerrarModal() {
    this.modalService.hide();
  }
}
