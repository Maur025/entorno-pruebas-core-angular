import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  UntypedFormGroup,
} from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import Decimal from "decimal.js";

@Component({
  selector: "compensaciones-movimiento-origen",
  templateUrl: "./compensaciones-movimiento-origen.component.html",
  styleUrls: ["./compensaciones-movimiento-origen.component.scss"],
})
export class CompensacionesMovimientoOrigenComponent
  implements OnInit, OnDestroy
{
  @Input() listMoves;
  @Input() formMain: UntypedFormGroup;
  @Input() labelOperation: string;
  @Input() selectedClientType: string;
  @Output() alSelectAnticipo: EventEmitter<any> = new EventEmitter();
  private fb = inject(FormBuilder);
  //listMoves: any[];
  listCuotas = new BehaviorSubject(undefined);
  importe: number = 0;
  isStatusRadio: boolean = false;
  changeImporte: number = 0;
  labelPerson: string = "";
  listData: any;
  listCobrosPagos: any;
  cuotaSelected: any;
  move = {
    movimientoReferenciaId: "",
    montoMovimiento: 0,
  };
  objectSelected: any;
  totalOrigin: number = 0;
  constructor(private notificacionService: NotificacionService) {}
  isOlder: boolean = false;
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listMoves) {
      this.listData = this.listMoves.map((objeto) => ({
        ...objeto,
        selected: false,
        importe: 0,
        showOdds: false,
      }));
      this.totalOrigin = 0;
      this.listCuotas.next([]);
    }
  }
  ngOnDestroy(): void {
    this.listCuotas.next([]);
  }

  get form() {
    return this.formMain?.controls;
  }

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

  onRadioChange(index: string) {
    this.isOlder = false;
    this.objectSelected = this.listData.find((element) => element.id == index);
    if (this.objectSelected != undefined) {
      this.updateTotalAmount();
      this.objectSelected.selected = true;
      this.clearRadioAll(index);
      this.objectSelected.importe = this.getBalance(this.objectSelected);
      this.totalOrigin = this.objectSelected.importe;
      this.formMain.get("movimientoOrigen").patchValue({
        movimientoReferenciaId: this.objectSelected.id,
        montoMovimiento: this.getBalance(this.objectSelected),
        montoOrigin: this.getBalance(this.objectSelected),
      });
      if (
        this.labelOperation == "Anticipo" ||
        this.labelOperation == "Fondo Rendir" ||
        this.labelOperation == "Reembolso"
      ) {
        this.updateTotalAmount(this.totalOrigin);
      }
    }
  }

  clearRadioAll = (id: string) => {
    this.listData.forEach((element) => {
      if (element.id != id) {
        element.selected = false;
        element.importe = 0;
        element.showOdds = false;
      }
    });
  };

  onNumberChange = (event) => {
    if (event != "") {
      this.isOlder = false;
      this.objectSelected.importe = Number(event.target.value);
      this.totalOrigin = Number(event.target.value);
      this.updateTotalAmount(this.totalOrigin);
      this.formMain.get("movimientoOrigen").patchValue({
        montoMovimiento: Number(event.target.value),
      });
      this.validateHigherAmount(
        this.objectSelected,
        Number(event.target.value)
      );
    }
  };

  onSelectCheckbox = (data: any, id: string) => {
    const objectSelected = this.listData.find((element) => element.id == id);
    objectSelected.importe = this.getInstallmentBalance(data);
    const dataCheck = [];
    data.show = !data.show;
    data.importe = this.getInstallmentBalance(data);
    data.planReferenciaId = data.id;
    data.monto = data.monto;
    this.totalOrigin = data.importe;
    if (data.show) {
      dataCheck.push(data);
      this.listCuotas.next(dataCheck);
    }
    this.calculateTotal();
  };

  onNumberChangeCuota = (data: any, id: string, event) => {
    this.isOlder = false;
    const objectSelected = this.listData.find((element) => element.id == id);
    if (event != "") {
      data.monto = Number(event.target.value);
      data.importe = Number(event.target.value);
      objectSelected.importe = Number(event.target.value);
      this.validateHigherAmount(data, event.target.value);
      this.calculateTotal();
    }
  };

  validateHigherAmount = (data: any, amount) => {
    if (amount > (this.getInstallmentBalance(data) || this.getBalance(data))) {
      data.importe = "";
      this.isOlder = true;
      this.totalOrigin = 0;
    }
  };

  calculateTotal = () => {
    const objectsSelected = this.listCuotas
      .getValue()
      .filter((element) => element.show);

    /*     this.totalOrigin = objectsSelected?.reduce(
      (total, item) => total + Number(item?.importe),
      0
    ); */
    const total = objectsSelected?.reduce((total, item) => {
      return total.plus(new Decimal(item?.importe));
    }, new Decimal(0));
    this.totalOrigin = Number(total.toString());

    this.updateTotalAmount(this.totalOrigin);

    this.formMain.get("movimientoOrigen").patchValue({
      montoMovimiento: this.totalOrigin,
      planCuotas: objectsSelected,
    });
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

  getNroDocument = (data) => data["nroFacturaRecibo"] || data["nroReferencia"];

  getMovementDate = (data: any) =>
    data["fechaVenta"] ||
    data["fecha"] ||
    data["fechaCompra"] ||
    data["fechaDesembolso"];

  updateTotalAmount = (totalAmount: number = 0) => {
    this.formMain.patchValue({
      montoOrigin: totalAmount,
    });
  };
}
