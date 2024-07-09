import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from './../../services/tesoreria/empleado.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/core/services/notificacion.service';

@Component({
  selector: 'formulario-empleado',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{

  submitted= false;
  formEmpleado: UntypedFormGroup;
  @Input() empleado;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();

  constructor(public formBuilder: UntypedFormBuilder,
    private empleadoService: EmpleadoService,
    private notificacionService: NotificacionService,
  ){}

  ngOnInit(){
    this.setForm();
    if(this.empleado){
      this.editar();
    }
  }

  setForm() {
    this.formEmpleado = this.formBuilder.group({
      id: ["", []],
      nombre: [, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      nitCi: [, [Validators.minLength(4)]],

    });
  }
  get form() { return this.formEmpleado.controls;}

   editar(){
    this.formEmpleado.controls['nombre'].setValue(this.empleado.nombre);
    this.formEmpleado.controls['nitCi'].setValue(this.empleado.nitCi);
  }

  guardar(){
    if(this.formEmpleado.value){
      if(this.empleado){
        this.empleadoService.update(this.formEmpleado.value).subscribe(data=>{
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        });
      }else{
        this.empleadoService.register(this.formEmpleado.value).subscribe(data=>{
          this.notificacionService.successStandar();
          this.alActualizar.emit();
        });
      }
      console.log(this.formEmpleado.value);
      this.empleadoService.register(this.formEmpleado.value).subscribe(data=>{
        this.notificacionService.successStandar();
        this.alActualizar.emit();
      });
    }
    this.submitted = true;
  }

}
