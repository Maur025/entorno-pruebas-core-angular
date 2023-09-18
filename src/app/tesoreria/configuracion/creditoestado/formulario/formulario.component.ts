import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CreditoestadoService } from "../servicios/creditoestado.service";
import { CreditoService } from '../servicios/credito.service';
import { EstadocreditoService } from '../servicios/estadocredito.service';
@Component({
  selector: "app-formulario-creditoestado",
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

  credito:any = [];
estado_credito:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private CreditoestadoService: CreditoestadoService,
    private CreditoService: CreditoService,private EstadocreditoService: EstadocreditoService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {
    this.CreditoService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.credito = res.content; });
this.EstadocreditoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.estado_credito = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],fecha:["",[] ],credito_id:["",[] ],estado_credito_id:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,fecha:this.dataEdit.fecha,credito_id:this.dataEdit.credito_id,estado_credito_id:this.dataEdit.estado_credito_id});
      this.rel_prefix = "/creditoestado/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.CreditoestadoService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,fecha:this.dataEdit.fecha,credito_id:this.dataEdit.credito_id,estado_credito_id:this.dataEdit.estado_credito_id});
          this.rel_prefix = "/creditoestado/"+id;
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
        this.CreditoestadoService.register(sendData).subscribe(
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
        this.CreditoestadoService.update(sendData, this.dataEdit.id).subscribe(
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
