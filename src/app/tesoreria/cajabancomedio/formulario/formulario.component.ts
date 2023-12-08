import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CajabancomedioService } from "../servicios/cajabancomedio.service";
import { MedioformapagoService } from '../servicios/medioformapago.service';
import { CajabancotransferenciaService } from '../servicios/cajabancotransferencia.service';
@Component({
  selector: "app-formulario-cajabancomedio",
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

  medio_forma_pago:any = [];
caja_banco_transferencia:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private CajabancomedioService: CajabancomedioService,
    private MedioformapagoService: MedioformapagoService,private CajabancotransferenciaService: CajabancotransferenciaService
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
    this.MedioformapagoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.medio_forma_pago = res.content; });
this.CajabancotransferenciaService.getAll(100, 1, 'cajaBancoMedioId', false, '').subscribe((res:any) => { this.caja_banco_transferencia = res.content; });
  }

  ngOnInit(): void {    
    this.cargarArrays();
    this.formGroup = this.FormBuilder.group({id:["",[] ],nombre:["",[Validators.required,Validators.minLength(2),Validators.maxLength(255)] ],tablaRelacion:["",[Validators.required,Validators.maxLength(255)] ],descripcion:["",[Validators.maxLength(255)] ],idRelacion:["",[] ],medioFormaPagoId:["",[] ],cajaBancoTransferencia:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,tablaRelacion:this.dataEdit.tablaRelacion,descripcion:this.dataEdit.descripcion,idRelacion:this.dataEdit.idRelacion,medioFormaPagoId:this.dataEdit.medioFormaPagoId,cajaBancoTransferencia:this.dataEdit.cajaBancoTransferencia});
      this.rel_prefix = "/caja_banco_medio/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.CajabancomedioService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        
        if (Array.isArray(result.content))
          this.dataEdit= result.content[0];
        else
          this.dataEdit= result.content;

          this.formGroup.setValue({id:this.dataEdit.id,nombre:this.dataEdit.nombre,tablaRelacion:this.dataEdit.tablaRelacion,descripcion:this.dataEdit.descripcion,idRelacion:this.dataEdit.idRelacion,medioFormaPagoId:this.dataEdit.medioFormaPagoId,cajaBancoTransferencia:this.dataEdit.cajaBancoTransferencia});
          this.rel_prefix = "/caja_banco_medio/"+id;
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
        this.CajabancomedioService.register(sendData).subscribe(
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
        this.CajabancomedioService.update(sendData, this.dataEdit.id).subscribe(
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
