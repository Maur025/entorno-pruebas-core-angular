import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { CreditopagosService } from "../servicios/creditopagos.service";
import { CreditoService } from '../servicios/credito.service';
import { PagosService } from '../servicios/pagos.service';
@Component({
  selector: "app-formulario-creditopagos",
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
pagos:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private CreditopagosService: CreditopagosService,
    private CreditoService: CreditoService,private PagosService: PagosService
  ) {}

  get form() {
    return this.formGroup.controls;
  }

  alCambiar(control){
    console.log("control",control);
  }

  ngOnInit(): void {
    this.CreditoService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.credito = res.content; });
this.PagosService.getAll(100, 1, 'id', false, '').subscribe((res:any) => { this.pagos = res.content; });
    this.formGroup = this.FormBuilder.group({id:["",[] ],credito_id:["",[Validators.required] ],nrocuota:["",[Validators.required] ],interes:["",[Validators.required] ],capital:["",[Validators.required] ],saldo:["",[Validators.required] ],mora:["",[Validators.required] ],descuento:["",[Validators.required] ],recargo:["",[Validators.required] ],pagofecha:["",[Validators.required] ],plazo:["",[Validators.required] ],pago_id:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,credito_id:this.dataEdit.credito_id,nrocuota:this.dataEdit.nrocuota,interes:this.dataEdit.interes,capital:this.dataEdit.capital,saldo:this.dataEdit.saldo,mora:this.dataEdit.mora,descuento:this.dataEdit.descuento,recargo:this.dataEdit.recargo,pagofecha:this.dataEdit.pagofecha,plazo:this.dataEdit.plazo,pago_id:this.dataEdit.pago_id});
      this.rel_prefix = "/creditopagos/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.CreditopagosService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        this.dataEdit= result.content[0];
          this.formGroup.setValue({id:this.dataEdit.id,credito_id:this.dataEdit.credito_id,nrocuota:this.dataEdit.nrocuota,interes:this.dataEdit.interes,capital:this.dataEdit.capital,saldo:this.dataEdit.saldo,mora:this.dataEdit.mora,descuento:this.dataEdit.descuento,recargo:this.dataEdit.recargo,pagofecha:this.dataEdit.pagofecha,plazo:this.dataEdit.plazo,pago_id:this.dataEdit.pago_id});
          this.rel_prefix = "/creditopagos/"+id;
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
        this.CreditopagosService.register(sendData).subscribe(
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
        this.CreditopagosService.update(sendData, this.dataEdit.id).subscribe(
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
