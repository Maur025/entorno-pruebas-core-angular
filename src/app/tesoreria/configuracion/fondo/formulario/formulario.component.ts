import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { FondoService } from "../servicios/fondo.service";
import { FondotipoService } from '../servicios/fondotipo.service';
import { FondoresponsablesService } from '../servicios/fondoresponsables.service';
import { FondocentrodecostosService } from '../servicios/fondocentrodecostos.service';
import { FondoformacobroService } from '../servicios/fondoformacobro.service';
@Component({
  selector: "app-formulario-fondo",
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

  fondo_tipo:any = [];
fondo_responsables:any = [];
fondo_centrodecostos:any = [];
fondo_forma_cobro:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private FondoService: FondoService,
    private FondotipoService: FondotipoService,private FondoresponsablesService: FondoresponsablesService,private FondocentrodecostosService: FondocentrodecostosService,private FondoformacobroService: FondoformacobroService
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
    this.FondotipoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.fondo_tipo = res.content; });
this.FondoresponsablesService.getAll(100, 1, 'fondo_id', false, '').subscribe((res:any) => { this.fondo_responsables = res.content; });
this.FondocentrodecostosService.getAll(100, 1, 'fondo_id', false, '').subscribe((res:any) => { this.fondo_centrodecostos = res.content; });
this.FondoformacobroService.getAll(100, 1, 'fondo_id', false, '').subscribe((res:any) => { this.fondo_forma_cobro = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],nombre:["",[Validators.required,Validators.minLength(2),Validators.maxLength(255)] ],direccion:["",[] ],descripcion:["",[] ],fondo_tipo_id:["",[] ],solicitud_id:["",[] ],fondo_responsables:["",[] ],fondo_centrodecostos:["",[] ],fondo_forma_cobro:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,direccion:this.dataEdit.direccion,descripcion:this.dataEdit.descripcion,fondo_tipo_id:this.dataEdit.fondo_tipo_id,solicitud_id:this.dataEdit.solicitud_id,fondo_responsables:this.dataEdit.fondo_responsables,fondo_centrodecostos:this.dataEdit.fondo_centrodecostos,fondo_forma_cobro:this.dataEdit.fondo_forma_cobro});
      this.rel_prefix = "/fondo/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.FondoService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,direccion:this.dataEdit.direccion,descripcion:this.dataEdit.descripcion,fondo_tipo_id:this.dataEdit.fondo_tipo_id,solicitud_id:this.dataEdit.solicitud_id,fondo_responsables:this.dataEdit.fondo_responsables,fondo_centrodecostos:this.dataEdit.fondo_centrodecostos,fondo_forma_cobro:this.dataEdit.fondo_forma_cobro});
          this.rel_prefix = "/fondo/"+id;
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
        this.FondoService.register(sendData).subscribe(
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
        this.FondoService.update(sendData, this.dataEdit.id).subscribe(
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
