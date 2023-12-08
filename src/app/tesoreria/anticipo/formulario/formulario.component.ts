import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { AnticipoService } from "../servicios/anticipo.service";
import { TipoentidadService } from '../servicios/tipoentidad.service';
import { DocumentoService } from '../servicios/documento.service';
@Component({
  selector: "app-formulario-anticipo",
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

  tipo_entidad:any = [];
anticipo:any = [];
documento:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private TipoentidadService: TipoentidadService,private AnticipoService: AnticipoService,private DocumentoService: DocumentoService
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

  cargarArrays()
  {
    this.TipoentidadService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tipo_entidad = res.content; });
this.AnticipoService.getAll(100, 1, 'tipoEntidadId', false, '').subscribe((res:any) => { this.anticipo = res.content; });
this.DocumentoService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.documento = res.content; });
  }

  ngOnInit(): void {
    this.cargarArrays();
    this.formGroup = this.FormBuilder.group({id:["",[] ],tipoEntidadId:["",[Validators.required] ],formaRegistro:["",[Validators.required] ],anticipoRegularizarId:["",[Validators.required] ],monto:["",[Validators.required] ],ingresoEgreso:["",[Validators.required] ],saldo:["",[Validators.required] ],documentoId:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,tipoEntidadId:this.dataEdit.tipoEntidadId,formaRegistro:this.dataEdit.formaRegistro,anticipoRegularizarId:this.dataEdit.anticipoRegularizarId,monto:this.dataEdit.monto,ingresoEgreso:this.dataEdit.ingresoEgreso,saldo:this.dataEdit.saldo,documentoId:this.dataEdit.documentoId});
      this.rel_prefix = "/anticipo/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.AnticipoService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;

        if (Array.isArray(result.content))
          this.dataEdit= result.content[0];
        else
          this.dataEdit= result.content;

          this.formGroup.setValue({id:this.dataEdit.id,tipoEntidadId:this.dataEdit.tipoEntidadId,formaRegistro:this.dataEdit.formaRegistro,anticipoRegularizarId:this.dataEdit.anticipoRegularizarId,monto:this.dataEdit.monto,ingresoEgreso:this.dataEdit.ingresoEgreso,saldo:this.dataEdit.saldo,documentoId:this.dataEdit.documentoId});
          this.rel_prefix = "/anticipo/"+id;
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
        this.AnticipoService.register(sendData).subscribe(
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
        this.AnticipoService.update(sendData, this.dataEdit.id).subscribe(
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
