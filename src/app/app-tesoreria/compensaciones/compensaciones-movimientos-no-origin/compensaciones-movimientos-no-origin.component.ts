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
  totalOrigin: number = 0;
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
      this.totalOrigin = 0;
    }
  }

  get form() {
    return this.formMain?.controls;
  }

  onCheckboxChange = (index: string) => {
    console.log("id move: ", index);
    const objectSelected = this.listData.find((element) => element.id == index);
    console.log("objectSelected: ", objectSelected);
    if (objectSelected != undefined) {
      objectSelected.selected = !objectSelected.selected;
      //this.clearRadioAll(index);
      objectSelected.importe =
        objectSelected.total ||
        objectSelected.monto ||
        objectSelected.saldoDesembolso;
      this.totalOrigin = objectSelected.importe;
      objectSelected.movimientoReferenciaId = objectSelected.id;
      objectSelected.montoMovimiento = objectSelected.importe;
      if (!objectSelected.selected) {
        objectSelected.importe = 0;
      }
      console.log("object SELECTED: ", objectSelected);
      let dataCurrent = this.listNoOrigin.getValue();

      this.addListChecked(objectSelected);
      this.calculateTotal();
      console.log("ESPECIAL: ", this.listNoOrigin.getValue());
    }
  };

  addListChecked = (data: any) => {
    if (data.selected) {
      const dataCurrent = this.listNoOrigin
        .getValue()
        .filter((element) => element.checked);
      console.log("Filtrado true: ", dataCurrent);
      const move = {
        movimientoReferenciaId: data.id,
        montoMovimiento: data.importe,
        planCuotas: [],
        checked: data.selected,
      };
      /* this.move.movimientoReferenciaId = data.id;
      this.move.montoMovimiento = data.importe; */
      console.log("move add:", move);

      this.listNoOrigin.next([...dataCurrent, move]);
      console.log("list all", this.listNoOrigin.getValue());
    } else {
      const dataSelected = this.listNoOrigin
        .getValue()
        .find((element) => element.movimientoReferenciaId == data.id);
      if (dataSelected) {
        dataSelected.checked = data.selected;
      }
    }
  };
  /*   updateListChecked = (data: any) => {
    const objectCurrent = this.listNoOrigin.getValue();
    const newObject = objectCurrent.map((element) =>
      element.id === data.id ? data : element
    );
    console.log("newObject: ", newObject);
    this.listNoOrigin.next(newObject);
  };
 */
  onNumberChange = (id: string, event) => {
    const objectSelected = this.listData.find((element) => element.id == id);
    objectSelected.importe = event.target.value;
    objectSelected.montoMovimiento = objectSelected.importe;
    if (event != "") {
      this.calculateTotal();
    }
  };

  onSelectCheckboxOdds = (data: any, id: string) => {
    console.log("DATA***: ", this.listNoOrigin.getValue());
    console.log("ID: ", id);
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
      //console.log("cuotas?: ", installmentPlanSelectedCurrent);
      const dataMoveSelected = this.listNoOrigin
        .getValue()
        .find((element) => element.movimientoReferenciaId == id);
      console.log("search: ", dataMoveSelected);
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
      console.log("DATA UPDATED: ", dataMoveSelected);
      console.log("TOTAL: ", this.listNoOrigin.getValue());
    }
    this.calculateTotal();
  };

  onNumberChangeCuota = (data: any, id: string, event) => {
    const objectSelected = this.listData.find((element) => element.id == id);
    if (event != "") {
      data.monto = event.target.value;
      data.importe = event.target.value;
      objectSelected.importe = event.target.value;

      const dataMoveSelected = this.listNoOrigin
        .getValue()
        .find((element) => element.movimientoReferenciaId == id);
      const installmentPlan = dataMoveSelected.planCuotas.find(
        (element) => element.planReferenciaId == data.id
      );
      console.log("installmentPlan", installmentPlan);
      installmentPlan.monto = event.target.value;
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
    this.listMovesNoOrigin = objectsSelected;
    this.totalOrigin = this.listMovesNoOrigin?.reduce(
      (total, item) => total + Number(item?.importe),
      0
    );
    this.formMain.patchValue({
      montoNoOrigin: this.totalOrigin,
      //movimientosContraparte: this.listMovesNoOrigin,
      movimientosContraparte: this.listNoOrigin.getValue(),
    });
  };

  calculateTotalinstallmentPlan = (data: any, installmentPlan: any) => {
    const objectsSelected = this.listData.filter(
      (element) => element.id == data.id
    );
    const totalMoveById = installmentPlan?.reduce(
      (total, item) => total + Number(item?.monto),
      0
    );
    const listOrigin = this.listNoOrigin
      .getValue()
      .find((element) => element.movimientoReferenciaId == data.id);
    listOrigin.montoMovimiento = totalMoveById;

    objectsSelected.importe = totalMoveById;
  };
}
