import {
  Component,
  OnInit,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
@Component({
  selector: "compensaciones-movimientos-no-origin",
  templateUrl: "./compensaciones-movimientos-no-origin.component.html",
  styleUrls: ["./compensaciones-movimientos-no-origin.component.scss"],
})
export class CompensacionesMovimientosNoOriginComponent implements OnInit {
  @Input() listMoves;
  @Output() alSelectAnticipo: EventEmitter<any> = new EventEmitter();
  private fb = inject(FormBuilder);
  //listMoves: any[];
  myForm: FormGroup;
  importe: number = 0;
  isStatusRadio: boolean = false;
  changeImporte: number = 0;
  listData: any;
  move = {
    movimientoReferenciaId: "",
    montoMovimiento: 0,
  };
  objectSelected: any;
  totalOrigin: number = 0;
  constructor(private notificacionService: NotificacionService) {
    this.myForm = this.fb.group({
      rows: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    console.log("Data llega: ", this.listMoves);
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listMoves) {
      console.log("list MOVES: ", this.listMoves);
      this.listData = this.listMoves.map((objeto) => ({
        ...objeto,
        selected: false, // o el valor que necesites
        importe: 0, // o la fecha que necesites
      }));
      this.totalOrigin = 0;
    }
    console.log("LIST NEW", this.listData);
  }

  initializeForm() {}

  get rows(): FormArray {
    return this.myForm.get("rows") as FormArray;
  }

  onCheckboxChange = (index: string) => {
    console.log("index: ", index);
    this.objectSelected = this.listData.find((element) => element.id == index);
    console.log("selected: ", this.objectSelected);
    if (this.objectSelected != undefined) {
      this.objectSelected.selected = true;
      //this.clearRadioAll(index);
      this.objectSelected.importe =
        this.objectSelected.total ||
        this.objectSelected.monto ||
        this.objectSelected.saldoDesembolso;
      this.totalOrigin = this.objectSelected.importe;
    }
    console.log("LIST DATA CHANGED", this.listData);
  };

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
    }
  };

  getNumberInputControl(index: number): FormControl {
    return this.rows.at(index).get("numberInput") as FormControl;
  }

  getRadioControl(index: number): FormControl {
    return this.rows.at(index).get("selected") as FormControl;
  }
}
