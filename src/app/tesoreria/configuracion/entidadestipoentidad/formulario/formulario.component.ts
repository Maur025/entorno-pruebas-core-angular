import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { EntidadestipoentidadService } from "../servicios/entidadestipoentidad.service";
import { TipoentidadService } from '../servicios/tipoentidad.service';
import { EntidadesService } from '../servicios/entidades.service';
@Component({
  selector: "app-formulario-entidadestipoentidad",
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

  tipo_entidad:any = [];
entidades:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private EntidadestipoentidadService: EntidadestipoentidadService,
    private TipoentidadService: TipoentidadService,private EntidadesService: EntidadesService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {    
    this.TipoentidadService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tipo_entidad = res.content; });
this.EntidadesService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.entidades = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],tipo_entidad_id:["",[] ],entidad_id:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,tipo_entidad_id:this.dataEdit.tipo_entidad_id,entidad_id:this.dataEdit.entidad_id});
      this.rel_prefix = "/entidadestipoentidad/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.EntidadestipoentidadService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,tipo_entidad_id:this.dataEdit.tipo_entidad_id,entidad_id:this.dataEdit.entidad_id});
          this.rel_prefix = "/entidadestipoentidad/"+id;
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
        this.EntidadestipoentidadService.register(sendData).subscribe(
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
        this.EntidadestipoentidadService.update(sendData, this.dataEdit.id).subscribe(
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
