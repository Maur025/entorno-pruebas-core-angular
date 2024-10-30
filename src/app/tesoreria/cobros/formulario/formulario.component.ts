import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CobrosService } from "../servicios/cobros.service";
import { AcreedorService } from '../servicios/acreedor.service';
import { DeudorService } from '../servicios/deudor.service';
import { FormacobroService } from '../servicios/formacobro.service';
import { TipocobroService } from '../servicios/tipocobro.service';
@Component({
  selector: "app-formulario-cobros",
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

  acreedor:any = [];
deudor:any = [];
forma_cobro:any = [];
tipo_cobro:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private CobrosService: CobrosService,
    private AcreedorService: AcreedorService,private DeudorService: DeudorService,private FormacobroService: FormacobroService,private TipocobroService: TipocobroService
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
    this.AcreedorService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.acreedor = res.content; });
this.DeudorService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.deudor = res.content; });
this.FormacobroService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.forma_cobro = res.content; });
this.TipocobroService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tipo_cobro = res.content; });
  }

  ngOnInit(): void {    
    this.cargarArrays();
    this.formGroup = this.FormBuilder.group({id:["",[] ],acreedorId:["",[Validators.required] ],monto:["",[Validators.required] ],deudorId:["",[Validators.required] ],formaCobroId:["",[] ],cobroFecha:["",[] ],tipoCobroId:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,acreedorId:this.dataEdit.acreedorId,monto:this.dataEdit.monto,deudorId:this.dataEdit.deudorId,formaCobroId:this.dataEdit.formaCobroId,cobroFecha:this.dataEdit.cobroFecha,tipoCobroId:this.dataEdit.tipoCobroId});
      this.rel_prefix = "/cobros/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.CobrosService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        
        if (Array.isArray(result.content))
          this.dataEdit= result.content[0];
        else
          this.dataEdit= result.content;

          this.formGroup.setValue({id:this.dataEdit.id,acreedorId:this.dataEdit.acreedorId,monto:this.dataEdit.monto,deudorId:this.dataEdit.deudorId,formaCobroId:this.dataEdit.formaCobroId,cobroFecha:this.dataEdit.cobroFecha,tipoCobroId:this.dataEdit.tipoCobroId});
          this.rel_prefix = "/cobros/"+id;
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
        this.CobrosService.register(sendData).subscribe(
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
        this.CobrosService.update(sendData, this.dataEdit.id).subscribe(
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
