import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";

@Component({
  selector: "compensaciones-movimiento-origen",
  templateUrl: "./compensaciones-movimiento-origen.component.html",
  styleUrls: ["./compensaciones-movimiento-origen.component.scss"],
})
export class CompensacionesMovimientoOrigenComponent implements OnInit {
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

  initializeForm() {
    /* this.listMoves.forEach(() => {
      this.rows.push(this.fb.group({
        selected: [false], // Control para el input de tipo radio
        numberInput: [{ value: '', disabled: true }] // Control para el input de tipo number
      }));
    }); */
    /*     this.listMoves.forEach(() => {
      this.rows.push(
        this.fb.group({
          selected: [false], // Control para el input de tipo radio
          numberInput: [{ value: "", disabled: true }], // Control para el input de tipo number
        })
      );
    }); */
  }

  /*   onRadioChange(index: number) {
    this.rows.controls.forEach((row, i) => {
      const numberInputControl = row.get("numberInput");
      if (i === index) {
        numberInputControl?.enable(); // Habilitar el input de número de la fila seleccionada
      } else {
        numberInputControl?.disable(); // Deshabilitar los demás inputs de número
        numberInputControl?.setValue(""); // Limpiar el valor de los inputs deshabilitados
      }
    });
  } */
  get rows(): FormArray {
    return this.myForm.get("rows") as FormArray;
  }

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
    }
    /*  this.rows.controls.forEach((row, i) => {
      const selectedControl = row.get("selected") as FormControl;
      const numberInputControl = row.get("numberInput") as FormControl;
      if (i === index) {
        selectedControl.setValue(true);
        numberInputControl.enable();
        const selectedVenta = this.listMoves[i];
        const isSelected = selectedControl.value;
        const numberValue = numberInputControl.value;

        console.log({
          isSelected,
          numberValue,
          selectedVenta,
        });
      } else {
        selectedControl.setValue(false);
        numberInputControl.disable();
        numberInputControl.setValue("");
      }
    }); */
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
    }
    /*     this.rows.controls.forEach((row, i) => {
      const selectedControl = row.get("selected") as FormControl;
      const numberInputControl = row.get("numberInput") as FormControl;
      if (i === index) {
        selectedControl.setValue(true);
        numberInputControl.enable();
        const selectedVenta = this.listMoves[i];
        const isSelected = selectedControl.value;
        const numberValue = numberInputControl.value;

        console.log({
          numberValue,
        });
      } else {
        selectedControl.setValue(false);
        numberInputControl.disable();
        numberInputControl.setValue("");
      }
    }); */
  };

  getNumberInputControl(index: number): FormControl {
    return this.rows.at(index).get("numberInput") as FormControl;
  }

  getRadioControl(index: number): FormControl {
    return this.rows.at(index).get("selected") as FormControl;
  }
}
