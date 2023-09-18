import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { TipopagoviaService } from "../servicios/tipopagovia.service";
import { TipopagoService } from '../servicios/tipopago.service';
import { ViasService } from '../servicios/vias.service';
@Component({
  selector: "app-formulario-tipopagovia",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();

  @Input() esModal:boolean = false;
  @Input() show_rel:boolean = true;
  @Input() dataEdit: any;
  @Input() rel_prefix: any;
  @Input() rel_field: any = '';
  @Input() rel_id: any = '';

  tipo_pago:any = [];
vias:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private TipopagoviaService: TipopagoviaService,
    private TipopagoService: TipopagoService,private ViasService: ViasService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  getDataFromFormname(array, formName){
    let element =  array.find( e => e.id == this.form[formName].value)
    return element;
  }
  setDataFromFormname(array, formName, data:any){
    let temp_value = this.form[formName].value;
    let el = array[array.indexOf(array.find( e => e.id == this.form[formName].value))];
    Object.keys(data.content).forEach( k => {
        el[k] = data.content[k];
    });
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {
    this.TipopagoService.getAll(100, 1, 'descripcion', false, '').subscribe((res:any) => { this.tipo_pago = res.content; });
this.ViasService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.vias = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],tipoPagoId:["",[] ],viaId:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,tipoPagoId:this.dataEdit.tipoPagoId,viaId:this.dataEdit.viaId});
      this.rel_prefix = "/tipo_pago_via/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.TipopagoviaService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;

        if (Array.isArray(result.content))
          this.dataEdit= result.content[0];
        else
          this.dataEdit= result.content;

          this.formGroup.setValue({id:this.dataEdit.id,tipoPagoId:this.dataEdit.tipoPagoId,viaId:this.dataEdit.viaId});
          this.rel_prefix = "/tipo_pago_via/"+id;
          this.rel_id = id;
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

      if (this.rel_prefix && this.rel_field) {
        this.formGroup.enable();//*
        this.formGroup.get(this.rel_field).setValue(this.rel_id);//*
      }
      let sendData = this.formGroup.value;
      if (this.dataEdit == null) {
        this.TipopagoviaService.register(sendData).subscribe(
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
        this.TipopagoviaService.update(sendData, this.dataEdit.id).subscribe(
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
