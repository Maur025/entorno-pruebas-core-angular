import {
  Component,
  EventEmitter,
  inject,
  Input,
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

@Component({
  selector: "compensaciones-movimiento-origen",
  templateUrl: "./compensaciones-movimiento-origen.component.html",
  styleUrls: ["./compensaciones-movimiento-origen.component.scss"],
})
export class CompensacionesMovimientoOrigenComponent implements OnInit {
  @Input() listMoves;
  @Input() formMain: UntypedFormGroup;
  @Input() labelOperation: string;
  @Output() alSelectAnticipo: EventEmitter<any> = new EventEmitter();
  private fb = inject(FormBuilder);
  //listMoves: any[];
  listCuotas = new BehaviorSubject(undefined);
  importe: number = 0;
  isStatusRadio: boolean = false;
  changeImporte: number = 0;
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

  ngOnInit(): void {
    console.log("Data llega: ", this.listMoves);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listMoves) {
      this.listData = this.listMoves.map((objeto) => ({
        ...objeto,
        selected: false,
        importe: 0,
        showOdds: false,
      }));
      this.totalOrigin = 0;
    }
    console.log("LIST NEW", this.listData);
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
    console.log("***Selected: ", objectSelected);
  };

  onRadioChange(index: string) {
    console.log("index: ", index);
    this.objectSelected = this.listData.find((element) => element.id == index);
    console.log("selected: ", this.objectSelected);
    if (this.objectSelected != undefined) {
      this.objectSelected.selected = true;
      this.clearRadioAll(index);
      this.objectSelected.importe =
        this.objectSelected.total ||
        this.objectSelected.monto ||
        this.objectSelected.saldoDesembolso;
      this.totalOrigin = this.objectSelected.importe;
      this.formMain.get("movimientoOrigen").patchValue({
        movimientoReferenciaId: this.objectSelected.id,
        montoMovimiento:
          this.objectSelected.monto ||
          this.objectSelected.total ||
          this.objectSelected.saldoDesembolso,
        montoOrigin:
          this.objectSelected.monto ||
          this.objectSelected.total ||
          this.objectSelected.saldoDesembolso,
      });
    }
    console.log("LIST DATA CHANGED", this.listData);
  }

  clearRadioAll = (id: string) => {
    this.listData.forEach((element) => {
      if (element.id != id) {
        element.selected = false;
        element.importe = 0;
      }
    });
    console.log("CLEAR: ", this.listData);
  };

  onNumberChange = (event) => {
    console.log(event);
    if (event != "") {
      this.objectSelected.importe = event.target.value;
      this.totalOrigin = event.target.value;
      this.formMain.patchValue({
        montoOrigin: this.totalOrigin,
      });
      /*       this.formMain.setValue({
        movimientoOrigen: this.objectSelected,
      }); */
      this.formMain.get("movimientoOrigen").patchValue({
        montoMovimiento: event.target.value,
      });
    }
  };

  onSelectCheckbox = (data: any, id: string) => {
    const objectSelected = this.listData.find((element) => element.id == id);
    objectSelected.importe = data.monto;
    const dataCheck = [];
    console.log("Checkbox: ", data);
    data.show = !data.show;
    data.importe = data.monto;
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
    const objectSelected = this.listData.find((element) => element.id == id);
    if (event != "") {
      data.monto = event.target.value;
      data.importe = event.target.value;
      objectSelected.importe = event.target.value;
      this.calculateTotal();
    }
  };

  calculateTotal = () => {
    console.log("listCuotas", this.listCuotas.getValue());
    const objectsSelected = this.listCuotas
      .getValue()
      .filter((element) => element.show);

    console.log("list ORIGIN: ", objectsSelected);

    this.totalOrigin = objectsSelected?.reduce(
      (total, item) => total + Number(item?.importe),
      0
    );
    this.formMain.patchValue({
      montoOrigin: this.totalOrigin,
    });
    this.formMain.get("movimientoOrigen").patchValue({
      montoMovimiento: this.totalOrigin,
      planCuotas: objectsSelected,
    });
    console.log("TOTAL: ", this.totalOrigin);
  };
}
