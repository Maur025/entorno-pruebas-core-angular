import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FondoformacobroService } from "../servicios/fondoformacobro.service";
import { FondoService } from '../servicios/fondo.service';
import { FormacobroService } from '../servicios/formacobro.service';
@Component({
  selector: "app-formulario-fondoformacobro",
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

  fondo:any = [];
forma_cobro:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private FondoformacobroService: FondoformacobroService,
    private FondoService: FondoService,private FormacobroService: FormacobroService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {    
    this.FondoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.fondo = res.content; });
this.FormacobroService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.forma_cobro = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],fondo_id:["",[Validators.required] ],forma_cobro_id:["",[Validators.required] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,fondo_id:this.dataEdit.fondo_id,forma_cobro_id:this.dataEdit.forma_cobro_id});
      this.rel_prefix = "/fondoformacobro/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.FondoformacobroService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,fondo_id:this.dataEdit.fondo_id,forma_cobro_id:this.dataEdit.forma_cobro_id});
          this.rel_prefix = "/fondoformacobro/"+id;
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
        this.FondoformacobroService.register(sendData).subscribe(
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
        this.FondoformacobroService.update(sendData, this.dataEdit.id).subscribe(
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
