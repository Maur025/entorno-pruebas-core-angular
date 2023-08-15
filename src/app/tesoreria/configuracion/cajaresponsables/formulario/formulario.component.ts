import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CajaresponsablesService } from "../servicios/cajaresponsables.service";
import { UsuariosService } from '../servicios/usuarios.service';
import { CajaService } from '../servicios/caja.service';
@Component({
  selector: "app-formulario-cajaresponsables",
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

  usuarios:any = [];
caja:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private CajaresponsablesService: CajaresponsablesService,
    private UsuariosService: UsuariosService,private CajaService: CajaService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {    
    this.UsuariosService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.usuarios = res.content; });
this.CajaService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.caja = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],responsable_id:["",[Validators.required] ],caja_id:["",[Validators.required] ],estado:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,responsable_id:this.dataEdit.responsable_id,caja_id:this.dataEdit.caja_id,estado:this.dataEdit.estado});
      this.rel_prefix = "/cajaresponsables/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.CajaresponsablesService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,responsable_id:this.dataEdit.responsable_id,caja_id:this.dataEdit.caja_id,estado:this.dataEdit.estado});
          this.rel_prefix = "/cajaresponsables/"+id;
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
        this.CajaresponsablesService.register(sendData).subscribe(
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
        this.CajaresponsablesService.update(sendData, this.dataEdit.id).subscribe(
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
