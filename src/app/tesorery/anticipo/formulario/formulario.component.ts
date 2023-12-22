import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { CentrocostoService } from '../../services/centrocosto.service';
import { EntidadService } from '../../services/entidad.service';
import { AnticipoService } from '../../services/anticipo.service';
import { TipoEntidadService } from '../../services/tipoentidad.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
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
  listaTipoEntidad: any;
  listaCentroCostos: any;
  tipoEntidadId: any = null;

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
    private centroCostoService: CentrocostoService,
    private entidadService: EntidadService,
    private anticipoService: AnticipoService,
    public tipoEntidadService: TipoEntidadService
  ) {

  }

   ngOnInit(){

    //this.maxDate = this.dateNow;
    if (!this.maxDate) this.maxDate = this.dateNow;
    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true },];
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    if (this.idRuta) this.form['id'].disable();
    this.getCentroCostos();

    this.getTipoEntidadId("PROVEEDOR").then(uuid=>{
      this.getEntidadReferencialTipoEntidad(uuid);
    });

    if (this.anticipo) {
      this.formGroup.setValue({
        id: this.anticipo.id,
        entidadReferencialId: this.anticipo.entidadReferencialId,
        fecha: new Date(this.anticipo.fecha),
        monto: this.anticipo.monto,
        centroCostoId: this.anticipo.centroCostoId,
        ingresoEgreso: this.anticipo.ingresoEgreso,
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
        //agregando datos y enviar
        let data = this.formGroup.value;
        data.saldo = this.anticipo.monto;

        this.anticipoService.update(data).subscribe((res: any) => {
          this.notificacionService.successStandar();

          this.alActualizar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        });

      } else {

        let data = this.formGroup.value;
        data.saldo = data.monto;

        this.anticipoService.register(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        }
        );
      }
    }
  }

  getCentroCostos() {
    this.centroCostoService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    });
  }
  getEntidadReferencialTipoEntidad(id: string) {

    this.entidadService.listaEntidadReferencialTipoEntidad(id).subscribe(data => {
      this.listaEntidades = data.content;
    });
  }

  async getTipoEntidadId(tipo: String) {
    let respuesta:any;
    await this.tipoEntidadService.habilitados().toPromise().then((response) => {
      respuesta = response.content.filter( data => data.tipo === tipo)[0].id;
    }).catch(e => console.error(e));
    return respuesta;
  }

  async getTipoEntidadInicio() {
    this.tipoEntidadService.habilitados().subscribe(async data => {
      this.listaTipoEntidad = await data.content;
    });
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      monto: [, [Validators.required]],
      fecha: [, [Validators.required]],
      ingresoEgreso: [, [Validators.required]],
      nroReferencia: [, [Validators.required]],
      centroCostoId: [, [Validators.required]],
      entidadReferencialId: [, [Validators.required]],
    };
  }
}
