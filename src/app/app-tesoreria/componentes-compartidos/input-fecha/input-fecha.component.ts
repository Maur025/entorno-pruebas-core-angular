import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AperturaCierreService } from 'src/app/core/services/tesoreria/apertura-cierre.service';
import { GestionService } from 'src/app/core/services/tesoreria/gestion.service';


@Component({
  selector: 'input-fecha',
  templateUrl: './input-fecha.component.html',
  styleUrls: ['./input-fecha.component.scss']
})
export class InputFechaComponent implements OnInit{

  @Input() labelFecha: string = "";
  @Input() formPadre:  UntypedFormGroup;
  @Input() submitted: boolean ;
  @Output() alRedirigir = new EventEmitter<void>();

  public arrayDiasHabilitados: any = []
  public arrayMesesHabilitados: any = []

  gestionId = new BehaviorSubject("");
  dateNow = new Date(new Date().setHours(23, 59, 59, 999))
  stateDate:boolean = false;


  constructor(
    private aperturasCierresService: AperturaCierreService,
    private gestionService: GestionService,
    private router: Router,
  ){}

  ngOnInit(): void{
    this.getGestionId();
    setTimeout(() => {
			this.enabledDays()
		}, 500)
  }


  get form() {
		return this.formPadre?.controls
	}

	getGestionId() {
		this.gestionService.getRecordsEnabled().subscribe({
			next: data => {
				this.gestionId.next(data.data[0].id)
			},
		})
	}

public enabledDays() {
  this.aperturasCierresService
    .getAperturaCierreHabilitados(this.gestionId.getValue())
    .subscribe(data => {
      this.checkDateStatus(data);
      data['data'].forEach(mes => {
        let dia = new Date(mes.fechaIni)
        dia = new Date(dia.setDate(dia.getDate() - 1))
        let diaFinal = new Date(mes.fechaFin)
        this.arrayMesesHabilitados.push([dia, diaFinal])
        while (dia < diaFinal) {
          this.arrayDiasHabilitados.push(dia)
          dia = new Date(dia.setDate(dia.getDate() + 1))
        }
      })
    })
}

checkDateStatus(data){
  if(data['data'].length==0){
    this.form.fecha.disable();
    this.stateDate = true;
  }
}

enabledDate(){
  this.alRedirigir.emit();
  this.router.navigate(["/gestion/aperturaCierre"]);
}


}
