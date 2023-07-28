import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { HorariodiaService } from "../servicios/horariodia.service";
import { HorariosService } from '../servicios/horarios.service';
import { DiasService } from '../servicios/dias.service';
@Component({
  selector: "app-formulario-horariodia",
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

  horarios:any = [];
dias:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private HorariodiaService: HorariodiaService,
    private HorariosService: HorariosService,private DiasService: DiasService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {    
    this.HorariosService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.horarios = res.content; });
this.DiasService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.dias = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],horario_id:["",[Validators.required] ],dia_id:["",[Validators.required] ],apertura:["",[Validators.required] ],cierre:["",[Validators.required] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,horario_id:this.dataEdit.horario_id,dia_id:this.dataEdit.dia_id,apertura:this.dataEdit.apertura,cierre:this.dataEdit.cierre});
      this.rel_prefix = "/horariodia/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.HorariodiaService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,horario_id:this.dataEdit.horario_id,dia_id:this.dataEdit.dia_id,apertura:this.dataEdit.apertura,cierre:this.dataEdit.cierre});
          this.rel_prefix = "/horariodia/"+id;
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
        this.HorariodiaService.register(sendData).subscribe(
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
        this.HorariodiaService.update(sendData, this.dataEdit.id).subscribe(
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
