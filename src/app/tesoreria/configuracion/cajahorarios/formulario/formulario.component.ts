import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CajahorariosService } from "../servicios/cajahorarios.service";
import { CajaService } from '../servicios/caja.service';
import { HorariosService } from '../servicios/horarios.service';
import { UsuariosService } from '../servicios/usuarios.service';
@Component({
  selector: "app-formulario-cajahorarios",
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

  caja:any = [];
horarios:any = [];
usuarios:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private CajahorariosService: CajahorariosService,
    private CajaService: CajaService,private HorariosService: HorariosService,private UsuariosService: UsuariosService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {    
    this.CajaService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.caja = res.content; });
this.HorariosService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.horarios = res.content; });
this.UsuariosService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.usuarios = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],caja_id:["",[Validators.required] ],horario_id:["",[Validators.required] ],responsable_id:["",[Validators.required] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,caja_id:this.dataEdit.caja_id,horario_id:this.dataEdit.horario_id,responsable_id:this.dataEdit.responsable_id});
      this.rel_prefix = "/cajahorarios/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.CajahorariosService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,caja_id:this.dataEdit.caja_id,horario_id:this.dataEdit.horario_id,responsable_id:this.dataEdit.responsable_id});
          this.rel_prefix = "/cajahorarios/"+id;
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
        this.CajahorariosService.register(sendData).subscribe(
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
        this.CajahorariosService.update(sendData, this.dataEdit.id).subscribe(
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
