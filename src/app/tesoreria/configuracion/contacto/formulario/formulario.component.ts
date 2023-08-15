import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ContactoService } from "../servicios/contacto.service";
import { TipoidentificacionService } from '../servicios/tipoidentificacion.service';
import { ContactogrupoService } from '../servicios/contactogrupo.service';
@Component({
  selector: "app-formulario-contacto",
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

  tipo_identificacion:any = [];
contacto_grupo:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private ContactoService: ContactoService,
    private TipoidentificacionService: TipoidentificacionService,private ContactogrupoService: ContactogrupoService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {    
    this.TipoidentificacionService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tipo_identificacion = res.content; });
this.ContactogrupoService.getAll(100, 1, 'contacto_id', false, '').subscribe((res:any) => { this.contacto_grupo = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],nombre:["",[Validators.required,Validators.minLength(2),Validators.maxLength(100)] ],telefono:["",[] ],correo:["",[] ],direccion:["",[] ],descripción:["",[] ],identificacion:["",[] ],tipo_identificacion_id:["",[] ],contacto_grupos:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,telefono:this.dataEdit.telefono,correo:this.dataEdit.correo,direccion:this.dataEdit.direccion,descripción:this.dataEdit.descripción,identificacion:this.dataEdit.identificacion,tipo_identificacion_id:this.dataEdit.tipo_identificacion_id,contacto_grupos:this.dataEdit.contacto_grupos});
      this.rel_prefix = "/contacto/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.ContactoService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,telefono:this.dataEdit.telefono,correo:this.dataEdit.correo,direccion:this.dataEdit.direccion,descripción:this.dataEdit.descripción,identificacion:this.dataEdit.identificacion,tipo_identificacion_id:this.dataEdit.tipo_identificacion_id,contacto_grupos:this.dataEdit.contacto_grupos});
          this.rel_prefix = "/contacto/"+id;
      });
    }
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
        this.ContactoService.register(sendData).subscribe(
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
        this.ContactoService.update(sendData, this.dataEdit.id).subscribe(
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
