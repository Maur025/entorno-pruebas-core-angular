import {
  Component,
  OnInit,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, UntypedFormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import Decimal from "decimal.js";
@Component({
  selector: "compensaciones-movimientos-no-origin",
  templateUrl: "./compensaciones-movimientos-no-origin.component.html",
  styleUrls: ["./compensaciones-movimientos-no-origin.component.scss"],
})
export class CompensacionesMovimientosNoOriginComponent
  implements OnInit, OnDestroy
{
  @Input() listMoves;
  @Output() alSelectAnticipo: EventEmitter<any> = new EventEmitter();
  @Input() formMain: UntypedFormGroup;
  @Input() labelOperation: string;
  @Input() selectedClientType: string;

  private listCuotas = new BehaviorSubject<any[]>([]);
  private listNoOrigin = new BehaviorSubject<any[]>([]);
  private fb = inject(FormBuilder);
  listMovesNoOrigin: any;
  importe: number = 0;
  isStatusRadio: boolean = false;
  changeImporte: number = 0;
  listData: any;
  move = {
    movimientoReferenciaId: "",
    montoMovimiento: 0,
  };
  installmentPlan = {
    planReferenciaId: "",
    monto: 0,
  };
  objectSelected: any;
  totalOrigin: Decimal = new Decimal(0);
  isOlder: boolean = false;
  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.listCuotas.next([]);
    this.listNoOrigin.next([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listMoves) {
      this.listData = this.listMoves.map((objeto) => ({
        ...objeto,
        selected: false, // o el valor que necesites
        importe: 0, // o la fecha que necesites
      }));
      this.totalOrigin = new Decimal(0);
      this.listCuotas.next([]);
      this.listNoOrigin.next([]);
    }
  }

  get form() {
    return this.formMain?.controls;
  }

  onCheckboxChange = (index: string) => {
    this.isOlder = false;
    const objectSelected = this.listData.find((element) => element.id == index);
    if (objectSelected != undefined) {
      objectSelected.selected = !objectSelected.selected;
      objectSelected.importe = this.getBalance(objectSelected);
      this.totalOrigin = objectSelected.importe;
      objectSelected.movimientoReferenciaId = objectSelected.id;
      objectSelected.montoMovimiento = objectSelected.importe;
      if (!objectSelected.selected) {
        objectSelected.importe = 0;
        objectSelected.selected = false;
        objectSelected.showOdds = false;
      }
      this.addListChecked(objectSelected);
      this.calculateTotal();
    }
  };

  addListChecked = (data: any) => {
    if (data.selected) {
      const dataCurrent = this.listNoOrigin
        .getValue()
        .filter((element) => element.checked);
      const move = {
        movimientoReferenciaId: data.id,
        montoMovimiento: Number(data.importe),
        planCuotas: [],
        checked: data.selected,
      };
      this.listNoOrigin.next([...dataCurrent, move]);
    } else {
      const dataSelected = this.listNoOrigin
        .getValue()
        .find((element) => element.movimientoReferenciaId == data.id);
      if (dataSelected) {
        dataSelected.checked = data.selected;
      }
    }
  };

  onNumberChange = (id: string, event) => {
    const objectSelected = this.listData.find((element) => element.id == id);
    if (event != "") {
      this.isOlder = false;
      objectSelected.importe = Number(event.target.value);
      objectSelected.montoMovimiento = objectSelected.importe;
      this.validateHigherAmount(objectSelected, Number(event.target.value));
      const dataSelected = this.listNoOrigin
        .getValue()
        .find((element) => element.movimientoReferenciaId == id);
      dataSelected.montoMovimiento = Number(event.target.value);
      this.calculateTotal();
    }
  };

  validateDecimalInput = (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const regex = /^\d*([.]?\d{0,1})?$/;
    const key = event.key;
    if (!/[\d.]/.test(key) && key !== "Backspace" && key !== "Tab") {
      event.preventDefault();
      return;
    }
    if (!regex.test(value)) {
      event.preventDefault();
    }
  };

  onSelectCheckboxOdds = (data: any, id: string) => {
    this.isOlder = false;
    const objectSelected = this.listData.find((element) => element.id == id);
    objectSelected.importe = data.saldoPendiente || data.saldoPagar;
    data.show = !data.show;
    data.importe = this.getInstallmentBalance(data);
    data.planReferenciaId = data.id;
    data.monto = data.importe;
    this.totalOrigin = data.importe;
    if (data.show) {
      //console.log("cuotas?: ", installmentPlanSelectedCurrent);
      const dataMoveSelected = this.listNoOrigin
        .getValue()
        .find((element) => element.movimientoReferenciaId == id);
      if (dataMoveSelected.planCuotas) {
        const installmentPlan = {
          planReferenciaId: data.id,
          monto: data.monto,
        };
        const exist = dataMoveSelected.planCuotas.some(
          (element) =>
            element.planReferenciaId === installmentPlan.planReferenciaId
        );
        if (!exist) {
          dataMoveSelected["planCuotas"].push(installmentPlan);
          this.calculateTotalinstallmentPlan(
            objectSelected,
            dataMoveSelected["planCuotas"]
          );
        }
      }
    }
    this.calculateTotal();
  };

  onNumberChangeCuota = (data: any, id: string, event) => {
    const objectSelected = this.listData.find((element) => element.id == id);
    if (event != "") {
      this.isOlder = false;
      data.monto = Number(event.target.value);
      data.importe = Number(event.target.value);
      objectSelected.importe = Number(event.target.value);
      this.validateHigherAmount(data, event.target.value);
      const dataMoveSelected = this.listNoOrigin
        .getValue()
        .find((element) => element.movimientoReferenciaId == id);
      const installmentPlan = dataMoveSelected.planCuotas.find(
        (element) => element.planReferenciaId == data.id
      );
      installmentPlan.monto = Number(event.target.value);
      this.calculateTotalinstallmentPlan(
        objectSelected,
        dataMoveSelected["planCuotas"]
      );
      this.calculateTotal();
    }
  };

  onClickShowOdds = (id: string) => {
    const objectSelected = this.listData.find((element) => element.id == id);
    objectSelected.showOdds = !objectSelected.showOdds;
    if (objectSelected?.planCobros != undefined) {
      objectSelected.planCobros.forEach((element) => {
        element["show"] = false;
        element["importe"] = 0;
      });
    }
    if (objectSelected?.planPagos != undefined) {
      objectSelected.planPagos.forEach((element) => {
        element["show"] = false;
        element["importe"] = 0;
      });
    }
  };

  calculateTotal = () => {
    const objectsSelected = this.listData.filter((element) => element.selected);

    /*     this.listMovesNoOrigin = objectsSelected;
        this.totalOrigin = this.listMovesNoOrigin?.reduce(
      (total, item) => total + Number(item?.importe),
      0
      ); */
    this.listMovesNoOrigin = objectsSelected;
    const total = this.listMovesNoOrigin?.reduce((total, item) => {
      return total.plus(new Decimal(item?.importe));
    }, new Decimal(0));
    this.totalOrigin = total.toString();

    this.formMain.patchValue({
      montoNoOrigin: total.toString(),
      //movimientosContraparte: this.listMovesNoOrigin,
      movimientosContraparte: this.listNoOrigin.getValue(),
    });
  };

  calculateTotalinstallmentPlan = (data: any, installmentPlan: any) => {
    const objectsSelected = this.listData.filter(
      (element) => element.id == data.id
    );
    const totalMoveById = installmentPlan?.reduce((total, item) => {
      return total.plus(new Decimal(item?.monto));
    }, new Decimal(0));

    /* const totalMoveById = installmentPlan?.reduce(
      (total, item) => total + Number(item?.monto),
      0
    ); */
    const listOrigin = this.listNoOrigin
      .getValue()
      .find((element) => element.movimientoReferenciaId == data.id);
    listOrigin.montoMovimiento = Number(totalMoveById.toString());

    objectsSelected.importe = Number(totalMoveById.toString());
  };

  validateHigherAmount = (data: any, amount) => {
    if (amount > (this.getInstallmentBalance(data) || this.getBalance(data))) {
      data.importe = "";
      this.isOlder = true;
      this.totalOrigin = new Decimal(0);
    }
  };

  getAmount = (data: any) => {
    if (this.labelOperation == "Reembolso") {
      return data.reembolso;
    } else if (this.labelOperation == "Fondo Rendir") {
      return data.desembolso;
    } else {
      return data.total || data.monto;
    }
  };

  getBalance = (data: any) => {
    if (this.labelOperation == "Reembolso") {
      return data.saldoReembolso;
    } else if (this.labelOperation == "Fondo Rendir") {
      return data.saldoDesembolso;
    } else {
      return data.saldo || data.saldoPendiente;
    }
  };

  getInstallmentBalance = (data: any) => data.saldoPendiente || data.saldoPagar;

  getInstallmentDate = (data: any) =>
    data.fechaLimiteCobro || data.fechaLimitePago;

  getMovementDate = (data: any) =>
    data["fechaVenta"] ||
    data["fecha"] ||
    data["fechaCompra"] ||
    data["fechaDesembolso"];

  getNroDocument = (data) => data["nroFacturaRecibo"] || data["nroReferencia"];

  updateTotalAmount = (totalAmount: number = 0) => {
    this.formMain.patchValue({
      montoNoOrigin: totalAmount,
    });
  };
}
