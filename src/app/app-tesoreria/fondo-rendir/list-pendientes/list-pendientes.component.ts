import { Component, EventEmitter, Input, Output } from "@angular/core";
import { EstadosFondoRendir } from "src/app/core/models/estados-tesoreria.model";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FondoRendirService } from "src/app/core/services/tesoreria/fondo-rendir.service";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "list-pendientes",
  templateUrl: "./list-pendientes.component.html",
  styleUrls: ["./list-pendientes.component.scss"],
})
export class ListPendientesComponent {
  @Input() empleadoId;
  @Input() operacionPadre;
  @Output() alSelectPendiente: EventEmitter<any> = new EventEmitter();
  listaReembolsos: any[];
  fondoRendirId: string;
  totalARemmbolsar: number = 0;

  constructor(
    private fondoRendirService: FondoRendirService,
    private notificacionService: NotificacionService,
    protected utilityService: UtilityService
  ) {}

  ngOnInit() {
    //this.listPendientesReembolso();
    this.fieldByOperation();
  }
  labelMontoTh = "";
  fieldByOperation() {
    if (this.operacionPadre == EstadosFondoRendir.PAGO_REEMBOLSO) {
      this.labelMontoTh = "Monto por reembolsar";
      this.listPendientesReembolso();
    }
    if (this.operacionPadre == EstadosFondoRendir.DEVOLUCION) {
      this.labelMontoTh = "Saldo a devolver";
      this.listPendienteDevolucion();
    }
  }

  listPendientesReembolso() {
    this.fondoRendirService.fondosRendirEmpleado(this.empleadoId).subscribe(
      (data) => {
        this.listaReembolsos = data["data"].map((objeto) => ({
          ...objeto,
          selected: false,
          importe: 0,
        }));
        this.listaReembolsos = this.listaReembolsos.filter((r) => {
          r["pagar_saldo"] = r["saldoReembolso"];
          return r["saldoReembolso"] > 0;
        });
      },
      (error) => this.notificacionService.alertError(error)
    );
  }

  listPendienteDevolucion() {
    this.fondoRendirService.fondosRendirEmpleado(this.empleadoId).subscribe(
      (data) => {
        this.listaReembolsos = data["data"].map((objeto) => ({
          ...objeto,
          selected: false,
          importe: 0,
        }));
        this.listaReembolsos = this.listaReembolsos.filter((r) => {
          r["pagar_saldo"] = r["saldoDesembolso"];
          return r["saldoDesembolso"] > 0;
        });
      },
      (error) => this.notificacionService.alertError(error)
    );
  }

  selectPendiente(data, i) {
    const inputs = document.querySelectorAll('input[name="inputsPendiente"]');
    let id = "input_pagar_" + i;
    var inputPagar = document.getElementById(id);
    this.clearRadioAll(data.id);
    if (inputPagar) inputPagar.removeAttribute("disabled");
    inputs.forEach((input) => {
      if (input["id"] !== inputPagar["id"])
        input.setAttribute("disabled", "true");
    });
    const objectSelected = this.listaReembolsos.find(
      (element) => element.id == data.id
    );
    objectSelected.selected = !data["selected"];
    objectSelected.importe = data.pagar_saldo;
    this.changeInputPagar(data.pagar_saldo, 0, data);
  }

  changeInputPagar(monto, i, data) {
    let pendiente = {
      fondoRendirId: data["id"],
      montoPagar: monto,
    };

    this.alSelectPendiente.emit(pendiente);
  }

  clearRadioAll = (id: string) => {
    this.listaReembolsos.forEach((element) => {
      if (element.id != id) {
        element.selected = false;
        element.importe = 0;
      }
    });
  };

  getAmount = (data: any) => data["desembolso"];
}
