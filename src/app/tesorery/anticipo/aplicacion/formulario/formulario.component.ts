import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { AnticipoService } from 'src/app/tesorery/services/tesoreria/anticipo.service';
import { AplicacionAnticipoService } from 'src/app/tesorery/services/tesoreria/aplicacion-anticipo.service';
import { CentrocostoService } from 'src/app/tesorery/services/tesoreria/centrocosto.service';
import { EntidadService } from 'src/app/tesorery/services/tesoreria/entidad.service';
import { EstadoAnticipoService } from 'src/app/tesorery/services/tesoreria/estadoanticipo.service';

@Component({
  selector: 'app-aplicacion-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = "Gestión de Anticipos";
  titulo: any = "Movimiento";

  routeApi = 'anticipo';
  levelNavigate = 2;
  service = null;
  inout: boolean = false;

  @Input() maxDate: any;

  formGroup: FormGroup;
  submitted = false;
  @Output() alGuardar = new EventEmitter<any>();
  @Output() alActualizar = new EventEmitter<any>();
  @Input() anticipo;
  @Input() idRuta;
  listaEntidades: any;
  listaCentroCostos: any;
  listaEstadoAnticipo: any;

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
    private aplicacionAnticipoService: AplicacionAnticipoService,
    private estadoAnticipoService: EstadoAnticipoService,
    private _localeService: BsLocaleService,
  ) {
    this._localeService.use('es');
  }

  ngOnInit(): void {

    this.maxDate = this.dateNow;

    this.breadCrumbItems = [{ label: this.breadCrumbTitle }, { label: this.titulo, active: true },];
    this.formGroup = this.FormBuilder.group(this.fieldsFormValidation());
    if (this.idRuta) this.form['id'].disable();
    this.getEstadoAnticipo();
    this.getCentroCostos();
    if (this.anticipo) {

      this.formGroup.setValue({
        id: this.anticipo.id,
        // entidadReferencialId: this.anticipo.entidadReferencialId,
        fecha: new Date(this.anticipo.fecha),
        monto: this.anticipo.monto,
        estado: this.anticipo.estado,
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

    let data = this.formGroup.value;
    data.movimiento = "MOV-PROV";
    data.anticipoId = this.route.snapshot.paramMap.get('id');


    this.submitted = true;
    if (this.formGroup.valid) {
      if (this.anticipo) {
        data.saldo = this.anticipo.monto;
        this.aplicacionAnticipoService.update(data).subscribe((res: any) => {

          this.notificacionService.successStandar();
          this.alActualizar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        });

      } else {
        data.saldo = data.monto;
        console.log(data);
        this.aplicacionAnticipoService.register(data).subscribe((res: any) => {
          this.notificacionService.successStandar();
          this.alGuardar.emit(res);
        }, (err: any) => {
          this.notificacionService.alertError(err);
        }
        );
      }
    }
  }

  getEstadoAnticipo() {
    this.estadoAnticipoService.habilitados().subscribe(data => {
      this.listaEstadoAnticipo = data.content;
    });
  }

  getCentroCostos() {
    this.centroCostoService.habilitados().subscribe(data => {
      this.listaCentroCostos = data.content;
    });
  }
  getEntidadReferencia() {
    this.entidadService.listaEntidadReferncial().subscribe(data => {
      this.listaEntidades = data.content;
    });
  }

  fieldsFormValidation() {
    return {
      id: ["", []],
      monto: [, [Validators.required]],
      fecha: [, [Validators.required]],
      nroReferencia: [, [Validators.required]],
      estado: [, [Validators.required]],
      ingresoEgreso: [, []],
    };
  }

  cambioEstado(event: any) {
    if (event.nombre === 'COMPENZACION') {
      this.inout = true;
      this.formGroup.addControl('ingresoEgreso', new FormControl(null, Validators.required));
    } else {
      this.formGroup.removeControl('ingresoEgreso');
      this.inout = false;
    }
  }
}

