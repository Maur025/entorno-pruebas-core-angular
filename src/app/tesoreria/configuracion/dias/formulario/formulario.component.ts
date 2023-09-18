import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { DiasService } from "../servicios/dias.service";

@Component({
  selector: "app-formulario-dias",
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


  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private DiasService: DiasService,

  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {

    this.formGroup = this.FormBuilder.group({id:["",[] ],nombre:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre});
      this.rel_prefix = "/dias/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.DiasService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre});
          this.rel_prefix = "/dias/"+id;
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
        this.DiasService.register(sendData).subscribe(
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
        this.DiasService.update(sendData, this.dataEdit.id).subscribe(
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
