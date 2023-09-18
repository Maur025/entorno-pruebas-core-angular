import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CreditoService } from "../servicios/credito.service";
import { CuotastiempoService } from '../servicios/cuotastiempo.service';
import { TiempointeresService } from '../servicios/tiempointeres.service';
import { TipointeresService } from '../servicios/tipointeres.service';
import { FormapagoService } from '../servicios/formapago.service';
import { TipopagoService } from '../servicios/tipopago.service';
import { AcreedorService } from '../servicios/acreedor.service';
import { DeudorService } from '../servicios/deudor.service';
import { CreditoestadoService } from '../servicios/creditoestado.service';
import { CreditopagosService } from '../servicios/creditopagos.service';
@Component({
  selector: "app-formulario-credito",
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

  cuotas_tiempo:any = [];
tiempo_interes:any = [];
tipo_interes:any = [];
forma_pago:any = [];
tipo_pago:any = [];
acreedor:any = [];
deudor:any = [];
credito_estado:any = [];
credito_pagos:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private CreditoService: CreditoService,
    private CuotastiempoService: CuotastiempoService,private TiempointeresService: TiempointeresService,private TipointeresService: TipointeresService,private FormapagoService: FormapagoService,private TipopagoService: TipopagoService,private AcreedorService: AcreedorService,private DeudorService: DeudorService,private CreditoestadoService: CreditoestadoService,private CreditopagosService: CreditopagosService
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
    this.DeudorService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.deudor = res.content; });
    this.CuotastiempoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.cuotas_tiempo = res.content; });
    this.TiempointeresService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tiempo_interes = res.content; });
    this.TipointeresService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tipo_interes = res.content; });
    this.FormapagoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.forma_pago = res.content; });
    this.TipopagoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tipo_pago = res.content; });
    this.AcreedorService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.acreedor = res.content; });
    this.DeudorService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.deudor = res.content; });
  }

  ngOnInit(): void {
    this.cargarArrays();
    this.CreditoestadoService.getAll(100, 1, 'creditoId', false, '').subscribe((res:any) => { this.credito_estado = res.content; });
    this.CreditopagosService.getAll(100, 1, 'creditoId', false, '').subscribe((res:any) => { this.credito_pagos = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],capital:["",[] ],cuotas:["",[] ],cuotasTiempoId:["",[] ],interes:["",[] ],tiempoInteresId:["",[] ],tipoInteresId:["",[] ],tieneiva:[false,[] ],redondear:[false,[] ],formaPagoId:["",[] ],tipoPagoId:["",[] ],montoaprobado:["",[] ],montodesembolsado:["",[] ],plazo:["",[] ],dias:["",[] ],acreedorId:["",[] ],deudorId:["",[] ],creditofecha:["",[] ],estados:["",[] ],pagos:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,capital:this.dataEdit.capital,cuotas:this.dataEdit.cuotas,cuotasTiempoId:this.dataEdit.cuotasTiempoId,interes:this.dataEdit.interes,tiempoInteresId:this.dataEdit.tiempoInteresId,tipoInteresId:this.dataEdit.tipoInteresId,tieneiva:this.dataEdit.tieneiva,redondear:this.dataEdit.redondear,formaPagoId:this.dataEdit.formaPagoId,tipoPagoId:this.dataEdit.tipoPagoId,montoaprobado:this.dataEdit.montoaprobado,montodesembolsado:this.dataEdit.montodesembolsado,plazo:this.dataEdit.plazo,dias:this.dataEdit.dias,acreedorId:this.dataEdit.acreedorId,deudorId:this.dataEdit.deudorId,creditofecha:this.dataEdit.creditofecha,estados:this.dataEdit.estados,pagos:this.dataEdit.pagos});
      this.rel_prefix = "/credito/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.CreditoService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;

        if (Array.isArray(result.content))
          this.dataEdit= result.content[0];
        else
          this.dataEdit= result.content;

          this.formGroup.setValue({id:this.dataEdit.id,capital:this.dataEdit.capital,cuotas:this.dataEdit.cuotas,cuotasTiempoId:this.dataEdit.cuotasTiempoId,interes:this.dataEdit.interes,tiempoInteresId:this.dataEdit.tiempoInteresId,tipoInteresId:this.dataEdit.tipoInteresId,tieneiva:this.dataEdit.tieneiva,redondear:this.dataEdit.redondear,formaPagoId:this.dataEdit.formaPagoId,tipoPagoId:this.dataEdit.tipoPagoId,montoaprobado:this.dataEdit.montoaprobado,montodesembolsado:this.dataEdit.montodesembolsado,plazo:this.dataEdit.plazo,dias:this.dataEdit.dias,acreedorId:this.dataEdit.acreedorId,deudorId:this.dataEdit.deudorId,creditofecha:this.dataEdit.creditofecha,estados:this.dataEdit.estados,pagos:this.dataEdit.pagos});
          this.rel_prefix = "/credito/"+id;
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
        this.CreditoService.register(sendData).subscribe(
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
        this.CreditoService.update(sendData, this.dataEdit.id).subscribe(
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
