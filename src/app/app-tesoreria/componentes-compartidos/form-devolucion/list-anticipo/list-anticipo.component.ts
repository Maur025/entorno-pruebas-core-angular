import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { AnticipoClienteService } from "src/app/core/services/tesoreria/anticipo-cliente.service";

@Component({
  selector: "app-list-anticipo",
  templateUrl: "./list-anticipo.component.html",
  styleUrls: ["./list-anticipo.component.scss"],
})
export class ListAnticipoComponent {
  private anticipoClienteService = inject(AnticipoClienteService);
  @Input() title: string = "";
  @Input() clienteId;
  @Output() alSelectAnticipo: EventEmitter<any> = new EventEmitter();
  listaAnticipos: any[];
  anticipoId: string;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit() {
    this.listAnticipos();
  }

  listAnticipos() {
    this.anticipoClienteService.findAnticipoCliente(this.clienteId).subscribe(
      (data) => {
        this.listaAnticipos = data["data"];
      },
      (error) => this.notificacionService.alertError(error)
    );
  }

  selectAnticipo(data) {
    let anticipo = {
      id: data["id"],
      saldo: data["saldo"],
    };

    this.alSelectAnticipo.emit(anticipo);
  }
}
