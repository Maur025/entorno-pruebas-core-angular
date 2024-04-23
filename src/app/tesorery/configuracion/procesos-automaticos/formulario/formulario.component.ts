import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { ProcesoAutomaticoService } from 'src/app/tesorery/services/tesoreria/proceso-automatico.service';

@Component({
  selector: 'app-formulario-procesos',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioProcesosComponent implements OnInit {

  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() procesoAutomatico;
  formProceso: FormGroup;
  submitted = false;
  cargandoContenido = false;

  constructor(
    private procesoAutomaticoService: ProcesoAutomaticoService,
    private formBuilder: FormBuilder,
    private notificacionService: NotificacionService,
  ) { }

  ngOnInit(): void {
    this.setForm();
    if (this.procesoAutomatico) {
      this.setProcesoAutomatico();
    }
  }

  setForm() {
    this.formProceso = this.formBuilder.group({
      id: [''],
      nombre: [, [Validators.required]],
      descripcion: [],
      codigo: [, [Validators.required]],
      automatico: [, [Validators.required]],
    });
  }

  get form() {
    return this.formProceso.controls;
  }

  setProcesoAutomatico() {
    this.formProceso.patchValue({
      id: this.procesoAutomatico.id,
      nombre: this.procesoAutomatico.nombre,
      descripcion: this.procesoAutomatico.descripcion,
      codigo: this.procesoAutomatico.codigo,
      automatico: this.procesoAutomatico.automatico,
    });
  }

  guardar() {
    this.submitted = true;
    if (this.formProceso.valid) {
      if (this.procesoAutomatico) {
        this.procesoAutomaticoService.update(this.formProceso.getRawValue()).subscribe(data => {
          this.alGuardar.emit(data);
          this.notificacionService.successStandar("Proceso automático registrado exitosamente");
        }, (error) => {
          this.notificacionService.alertError(error);
        });

      } else {
        this.procesoAutomaticoService.register(this.formProceso.getRawValue()).subscribe(data => {
          this.alGuardar.emit(data);
          this.notificacionService.successStandar("Proceso automático registrado exitosamente");
        }, (error) => {
          this.notificacionService.alertError(error);
        });
      }

    }
  }
}
