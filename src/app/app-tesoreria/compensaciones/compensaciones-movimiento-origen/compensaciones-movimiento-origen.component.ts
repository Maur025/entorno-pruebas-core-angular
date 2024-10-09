import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
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
  move = {
    movimientoReferenciaId: "",
    montoMovimiento: 0,
  };

  constructor(private notificacionService: NotificacionService) {
    this.myForm = this.fb.group({
      rows: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    console.log("Data llega: ", this.listMoves);
    setTimeout(() => {
      this.initializeForm();
      this.isStatusRadio = true;
    }, 750);
  }
  initializeForm() {
    /* this.listMoves.forEach(() => {
      this.rows.push(this.fb.group({
        selected: [false], // Control para el input de tipo radio
        numberInput: [{ value: '', disabled: true }] // Control para el input de tipo number
      }));
    }); */
    this.listMoves.forEach(() => {
      this.rows.push(
        this.fb.group({
          selected: [false], // Control para el input de tipo radio
          numberInput: [{ value: "", disabled: true }], // Control para el input de tipo number
        })
      );
    });
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

  onRadioChange(index: number) {
    this.rows.controls.forEach((row, i) => {
      const selectedControl = row.get("selected") as FormControl;
      const numberInputControl = row.get("numberInput") as FormControl;
      if (i === index) {
        selectedControl.setValue(true);
        numberInputControl.enable();
        const selectedVenta = this.listMoves[i]; // Obtén los datos de la fila seleccionada
        const isSelected = selectedControl.value; // Estado del radio
        const numberValue = numberInputControl.value; // Valor del input de número

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
    });
  }

  onNumberChange = (index) => {
    this.rows.controls.forEach((row, i) => {
      const selectedControl = row.get("selected") as FormControl;
      const numberInputControl = row.get("numberInput") as FormControl;
      if (i === index) {
        selectedControl.setValue(true);
        numberInputControl.enable();
        const selectedVenta = this.listMoves[i]; // Obtén los datos de la fila seleccionada
        const isSelected = selectedControl.value; // Estado del radio
        const numberValue = numberInputControl.value; // Valor del input de número

        console.log({
          numberValue,
        });
      } else {
        selectedControl.setValue(false);
        numberInputControl.disable();
        numberInputControl.setValue("");
      }
    });
  };

  getNumberInputControl(index: number): FormControl {
    return this.rows.at(index).get("numberInput") as FormControl;
  }

  getRadioControl(index: number): FormControl {
    return this.rows.at(index).get("selected") as FormControl;
  }
}
