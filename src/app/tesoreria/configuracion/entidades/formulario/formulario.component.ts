import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { EntidadesService } from "../servicios/entidades.service";
import { EntidadestipoentidadService } from '../servicios/entidadestipoentidad.service';
import { EntidadcontactosService } from '../servicios/entidadcontactos.service';
@Component({
  selector: "app-formulario-entidades",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();

  @Input() esModal:boolean = false;
  @Input() dataEdit: any;
  @Input() rel_prefix: any;
  @Input() rel_field: any = '';

  entidades_tipo_entidad:any = [];
entidad_contactos:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private EntidadesService: EntidadesService,
    private EntidadestipoentidadService: EntidadestipoentidadService,private EntidadcontactosService: EntidadcontactosService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {
    //this.EntidadestipoentidadService.getAll(100, 1, 'entidad_id', false, '').subscribe((res:any) => { this.entidades_tipo_entidad = res.content; });
    //this.EntidadcontactosService.getAll(100, 1, 'entidad_id', false, '').subscribe((res:any) => { this.entidad_contactos = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],nombre:["",[Validators.required,Validators.minLength(2),Validators.maxLength(100)] ],identificacion:["",[Validators.maxLength(100)] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,identificacion:this.dataEdit.identificacion});
      this.rel_prefix = "/entidades/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.EntidadesService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= Array.isArray(result.content)?result.content[0]:result.content;
        console.log("this.dataEdit",this.dataEdit);
          this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,identificacion:this.dataEdit.identificacion});
          this.rel_prefix = "/entidades/"+id;
      });
    }
  }
  arrayToSingle(posibleArray){
    if (Array.isArray(posibleArray))
      if (posibleArray.length>0)
        return posibleArray[0];
      else
        return {}
    return posibleArray;
  }
  volver(){
    this.router.navigate(['..'], {relativeTo: this.route});
  }
  guardar() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.submitted = false;
      let sendData = this.formGroup.value;
      if (this.dataEdit == null) {
        this.EntidadesService.register(sendData).subscribe(
          (res: any) => {
            this.notificacionService.successStandar();
            this.alGuardar.emit(res);
            if (!this.esModal) this.router.navigate(['..'], {relativeTo: this.route});
          },
          (err: any) => {
            this.notificacionService.alertError(err);
          }
        );
      } else {
        this.EntidadesService.update(sendData, this.dataEdit.id).subscribe(
          (res: any) => {
            this.notificacionService.successStandar();
            this.alActualizar.emit(res);
            if (!this.esModal) this.router.navigate(['..'], {relativeTo: this.route});
          },
          (err: any) => {
            this.notificacionService.alertError(err);
          }
        );
      }
    }
  }
}
