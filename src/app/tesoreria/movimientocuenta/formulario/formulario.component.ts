import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { MovimientocuentaService } from "../servicios/movimientocuenta.service";
import { CuentabancoService } from '../servicios/cuentabanco.service';
import { TipomovimientoService } from '../servicios/tipomovimiento.service';
@Component({
  selector: "app-formulario-movimientocuenta",
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

  cuenta_banco:any = [];
tipo_movimiento:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private MovimientocuentaService: MovimientocuentaService,
    private CuentabancoService: CuentabancoService,private TipomovimientoService: TipomovimientoService
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
    this.CuentabancoService.getAll(100, 1, 'nrocuenta', false, '').subscribe((res:any) => { this.cuenta_banco = res.content; });
this.TipomovimientoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tipo_movimiento = res.content; });
  }

  ngOnInit(): void {    
    this.cargarArrays();
    this.formGroup = this.FormBuilder.group({id:["",[] ],cuentaId:["",[Validators.required] ],ingreso:["",[Validators.required] ],egreso:["",[Validators.required] ],saldo:["",[Validators.required] ],tipoMovimientoId:["",[Validators.required] ],pagoFormaId:["",[Validators.required] ],descripcion:["",[Validators.required] ],usuarioId:["",[Validators.required] ],fechaPago:["",[Validators.required] ],fechaReg:["",[Validators.required] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,cuentaId:this.dataEdit.cuentaId,ingreso:this.dataEdit.ingreso,egreso:this.dataEdit.egreso,saldo:this.dataEdit.saldo,tipoMovimientoId:this.dataEdit.tipoMovimientoId,pagoFormaId:this.dataEdit.pagoFormaId,descripcion:this.dataEdit.descripcion,usuarioId:this.dataEdit.usuarioId,fechaPago:this.dataEdit.fechaPago,fechaReg:this.dataEdit.fechaReg});
      this.rel_prefix = "/movimiento_cuenta/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.MovimientocuentaService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        
        if (Array.isArray(result.content))
          this.dataEdit= result.content[0];
        else
          this.dataEdit= result.content;

          this.formGroup.setValue({id:this.dataEdit.id,cuentaId:this.dataEdit.cuentaId,ingreso:this.dataEdit.ingreso,egreso:this.dataEdit.egreso,saldo:this.dataEdit.saldo,tipoMovimientoId:this.dataEdit.tipoMovimientoId,pagoFormaId:this.dataEdit.pagoFormaId,descripcion:this.dataEdit.descripcion,usuarioId:this.dataEdit.usuarioId,fechaPago:this.dataEdit.fechaPago,fechaReg:this.dataEdit.fechaReg});
          this.rel_prefix = "/movimiento_cuenta/"+id;
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
        this.MovimientocuentaService.register(sendData).subscribe(
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
        this.MovimientocuentaService.update(sendData, this.dataEdit.id).subscribe(
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
