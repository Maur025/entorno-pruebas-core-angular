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
  isOlder:boolean = false;
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
    }
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
    this.objectSelected = this.listData.find((element) => element.id == index);
    if (this.objectSelected != undefined) {
      this.objectSelected.selected = true;
      this.clearRadioAll(index);
      this.objectSelected.importe = this.getBalance(this.objectSelected);
      this.totalOrigin = this.objectSelected.importe;
      this.formMain.get("movimientoOrigen").patchValue({
        movimientoReferenciaId: this.objectSelected.id,
        montoMovimiento: this.getBalance(this.objectSelected),
        montoOrigin: this.getBalance(this.objectSelected)
      });
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
      this.totalOrigin = event.target.value;

      this.formMain.patchValue({
        montoOrigin: this.totalOrigin,
      });
      /*       this.formMain.setValue({
        movimientoOrigen: this.objectSelected,
      }); */
      this.formMain.get("movimientoOrigen").patchValue({
        montoMovimiento: Number(event.target.value),
      });
      this.validateHigherAmount(this.objectSelected, event.target.value);
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
      this.validateHigherAmount(data,event.target.value);
      this.calculateTotal();
    }
  };


  validateHigherAmount = (data:any, amount)=>{
    if(amount > (data.saldoPagar || data.saldoPendiente || data.saldo || data.saldoPendiente || data.saldoNeto)){
      data.importe = '';
      this.isOlder = true;
      this.totalOrigin = 0;
    }
  }

  calculateTotal = () => {
    const objectsSelected = this.listCuotas
      .getValue()
      .filter((element) => element.show);

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
  };


  getBalance = (data:any)=> data.saldo ||
    data.saldoPendiente ||
    data.saldoNeto ||
    data.saldoDesembolso;

  getInstallmentBalance = (data:any)=>data.saldoPendiente || data.saldoPagar;
}
