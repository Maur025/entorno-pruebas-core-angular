import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { BehaviorSubject, debounceTime } from "rxjs";
import { UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AperturaCierreService } from "src/app/core/services/tesoreria/apertura-cierre.service";
import { GestionService } from "src/app/core/services/tesoreria/gestion.service";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { AperturaEnabledDatesService } from "src/app/core/services/apertura-enabled-dates.service";

@Component({
  selector: "input-fecha",
  templateUrl: "./input-fecha.component.html",
  styleUrls: ["./input-fecha.component.scss"],
})
export class InputFechaComponent implements OnInit {
  @Input() labelFecha: string = "";
  @Input() formPadre: UntypedFormGroup;
  @Input() submitted: boolean;
  @Output() alRedirigir = new EventEmitter<void>();
  private _aperturaEnabledDatesService = inject(AperturaEnabledDatesService);
  public arrayDiasHabilitados: any = [];
  public arrayMesesHabilitados: any = [];
  gestionId = new BehaviorSubject("");
  dateNow = new Date(new Date().setHours(23, 59, 59, 999));
  stateDate: boolean = false;
  isValidDate: boolean = false;

  constructor(
    private gestionService: GestionService,
    private _localeService: BsLocaleService,
    private router: Router
  ) {
    this._localeService.use("es");
  }

  ngOnInit(): void {
    this.enabledDays();
  }

  get form() {
    return this.formPadre?.controls;
  }

  validateDate(event) {
    let dateStart = this.arrayDiasHabilitados[0];
    let dateEnd =
      this.arrayDiasHabilitados[this.arrayDiasHabilitados.length - 1];
    this.isValidDate = event >= dateStart && event <= dateEnd ? false : true;
    if (this.isValidDate) {
      setTimeout(() => {
        this.formPadre.patchValue({
          fecha: "",
        });
        this.isValidDate = false;
      }, 2000);
    }
  }

  getGestionId() {
    this.gestionService.getRecordsEnabled().subscribe({
      next: (data) => {
        this.gestionId?.next(data?.data[0]?.id);
      },
    });
  }

  /*   public enabledDays() {
    if (this.gestionId.getValue()) {
      this.aperturasCierresService
        .getAperturaCierreHabilitados(this.gestionId.getValue())
        .subscribe((data) => {
          this.checkDateStatus(data);
          data["data"].forEach((mes) => {
            let dia = new Date(mes.fechaIni);
            dia = new Date(dia.setDate(dia.getDate() - 1));
            const diaFinal = new Date(mes.fechaFin);
            this.arrayMesesHabilitados.push([dia, diaFinal]);
            while (dia < diaFinal) {
              this.arrayDiasHabilitados.push(dia);
              dia = new Date(dia.setDate(dia.getDate() + 1));
            }
          });
        });
    } else {
      console.error("No se encontro la gestion");
    }
  } */

  public enabledDays() {
    this._aperturaEnabledDatesService?.getEnabledDateList()?.subscribe({
      next: (response: Date[]) => {
        this.checkDateStatus(response);
        this.arrayDiasHabilitados = response;
      },
      error: (error) => console.error("Dates not found", error),
    });
  }

  checkDateStatus(data) {
    if (data.length == 0) {
      this.form.fecha.disable();
      this.stateDate = true;
    }
  }

  enabledDate() {
    this.alRedirigir.emit();
    this.router.navigate(["/gestion/apertura-cierre"]);
  }
}
