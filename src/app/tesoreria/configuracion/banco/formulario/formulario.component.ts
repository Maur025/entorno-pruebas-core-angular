import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { BancoService } from "../servicios/banco.service";
import { ContactobancoService } from '../servicios/contactobanco.service';
import { CuentabancoService } from '../servicios/cuentabanco.service';
import { LineacreditobancoService } from '../servicios/lineacreditobanco.service';
@Component({
  selector: "app-formulario-banco",
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

  contacto_banco:any = [];
cuenta_banco:any = [];
lineacredito_banco:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private BancoService: BancoService,
    private ContactobancoService: ContactobancoService,private CuentabancoService: CuentabancoService,private LineacreditobancoService: LineacreditobancoService
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
    this.ContactobancoService.getAll(100, 1, 'banco_id', false, '').subscribe((res:any) => { this.contacto_banco = res.content; });
this.CuentabancoService.getAll(100, 1, 'banco_id', false, '').subscribe((res:any) => { this.cuenta_banco = res.content; });
this.LineacreditobancoService.getAll(100, 1, 'banco_id', false, '').subscribe((res:any) => { this.lineacredito_banco = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],nombre:["",[Validators.required,Validators.minLength(2),Validators.maxLength(255)] ],descripcion:["",[] ],direccion:["",[] ],url:["",[] ],contacto:["",[] ],cuentas:["",[] ],lineasdecredito:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,descripcion:this.dataEdit.descripcion,direccion:this.dataEdit.direccion,url:this.dataEdit.url,contacto:this.dataEdit.contacto,cuentas:this.dataEdit.cuentas,lineasdecredito:this.dataEdit.lineasdecredito});
      this.rel_prefix = "/banco/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.BancoService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,descripcion:this.dataEdit.descripcion,direccion:this.dataEdit.direccion,url:this.dataEdit.url,contacto:this.dataEdit.contacto,cuentas:this.dataEdit.cuentas,lineasdecredito:this.dataEdit.lineasdecredito});
          this.rel_prefix = "/banco/"+id;
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
        this.BancoService.register(sendData).subscribe(
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
        this.BancoService.update(sendData, this.dataEdit.id).subscribe(
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
