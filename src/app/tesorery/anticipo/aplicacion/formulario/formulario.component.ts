import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { AnticipoService } from 'src/app/tesorery/services/anticipo.service';
import { CentrocostoService } from 'src/app/tesorery/services/centrocosto.service';
import { EntidadService } from 'src/app/tesorery/services/entidad.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = "Gestión de Anticipos";
  titulo: any = "Anicipo";
  routeApi = 'anticipo';
  levelNavigate = 2;
  service = null;

  @Input() maxDate: any;

  formGroup: FormGroup;
  submitted = false;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() anticipo;
  @Input() idRuta;
  listaEntidades: any;
  listaCentroCostos: any;

  dateNow = new Date((new Date).setHours(23, 59, 59, 999));

  ingresoEgreso: any = [
    { value: "IN", name: "INGRESO" },
    { value: "OUT", name: "EGRESO" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private centroCostoService:CentrocostoService,
    private entidadService:EntidadService,
    private anticipoService:AnticipoService
  ){

  }

  ngOnInit(): void {

    this.maxDate = this.dateNow;
  
    this.breadCrumbItems = [ { label: this.breadCrumbTitle },{ label: this.titulo, active: true },];
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    if(this.idRuta) this.form['id'].disable();
    this.getEntidadReferencia();
    this.getCentroCostos();
    if (this.anticipo) {
  
      this.formGroup.setValue({
        id: this.anticipo.id,
        entidadReferencialId: this.anticipo.entidadReferencialId,
        fecha: new Date(this.anticipo.fecha),
        monto: this.anticipo.monto,
        centroCostoId: this.anticipo.centroCostoId,
        ingresoEgreso:  this.anticipo.ingresoEgreso,
        nroReferencia: this.anticipo.nroReferencia
      });
    } else {
      this.form['id'].setValue(this.idRuta)
    }
  }

  
  get form() {
    return this.formGroup.controls;
  }

  guardar() {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (this.anticipo) {
        this.anticipoService.update(this.formGroup.value).subscribe((res: any) => {
          console.log(res);
          this.notificacionService.successStandar();
          this.alActualizar.emit(res);
        },(err: any) => {
          this.notificacionService.alertError(err);
        });
      
      } else {
        this.anticipoService.register(this.formGroup.value).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        },(err: any) => {
          this.notificacionService.alertError(err);
        }
      );
      }
    }
  }

  getCentroCostos(){
    this.centroCostoService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    });
  }
  getEntidadReferencia(){
    this.entidadService.listaEntidadReferncial().subscribe(data => {
      this.listaEntidades = data.content;
    });
  }
  
  fieldsFormValidation() {
    return {
      id: ["", []],     
      monto: [, [Validators.required]],
      fecha: [, [Validators.required]],    
      ingresoEgreso: [, [Validators.required]],
      nroReferencia: [, [Validators.required]],
      //aperturado:[,Validators.required],
      //saldo:[,Validators.required],    
      centroCostoId: [, [Validators.required]],
      entidadReferencialId: [, [Validators.required]],
    };
  }
}
