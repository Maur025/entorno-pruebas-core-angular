import {
  Component,
  OnInit,
  EventEmitter,
  inject,
  Input,
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
import { NotificacionService } from "src/app/core/services/notificacion.service";
@Component({
  selector: "compensaciones-movimientos-no-origin",
  templateUrl: "./compensaciones-movimientos-no-origin.component.html",
  styleUrls: ["./compensaciones-movimientos-no-origin.component.scss"],
})
export class CompensacionesMovimientosNoOriginComponent implements OnInit {
  @Input() listMoves;
  @Output() alSelectAnticipo: EventEmitter<any> = new EventEmitter();
  @Input() formMain: UntypedFormGroup;
  @Input() labelOperation: string;

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
  objectSelected: any;
  totalOrigin: number = 0;
  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    console.log("Data llega: ", this.listMoves);
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

  get form() {
    return this.formMain?.controls;
  }

  onCheckboxChange = (index: string) => {
    console.log("index: ", index);
    this.objectSelected = this.listData.find((element) => element.id == index);
    console.log("selected: ", this.objectSelected);
    if (this.objectSelected != undefined) {
      this.objectSelected.selected = !this.objectSelected.selected;
      //this.clearRadioAll(index);
      this.objectSelected.importe =
        this.objectSelected.total ||
        this.objectSelected.monto ||
        this.objectSelected.saldoDesembolso;
      this.totalOrigin = this.objectSelected.importe;
      this.objectSelected.movimientoReferenciaId = this.objectSelected.id;
      this.objectSelected.montoMovimiento = this.objectSelected.importe;
      if (!this.objectSelected.selected) {
        this.objectSelected.importe = 0;
      }
      this.calculateTotal();
    }
    console.log("LIST DATA CHANGED", this.listData);
  };

  calculateTotal = () => {
    const objectsSelected = this.listData.filter((element) => element.selected);
    this.listMovesNoOrigin = objectsSelected;
    console.log("list no ORIGIN: ", this.listMovesNoOrigin);
    this.totalOrigin = this.listMovesNoOrigin?.reduce(
      (total, item) => total + Number(item?.montoMovimiento),
      0
    );
    this.formMain.patchValue({
      montoNoOrigin: this.totalOrigin,
      movimientosContraparte: this.listMovesNoOrigin,
    });

    console.log("lista de objetos: ", this.listMovesNoOrigin);
  };

  onNumberChange = (id: string, event) => {
    const objectSelected = this.listData.find((element) => element.id == id);
    objectSelected.importe = event.target.value;
    objectSelected.montoMovimiento = objectSelected.importe;
    if (event != "") {
      this.calculateTotal();
    }
  };
}
