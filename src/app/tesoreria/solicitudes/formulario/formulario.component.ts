import { Component,  EventEmitter,  Input,  Output,  ViewChild,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { SolicitudesService } from "../servicios/solicitudes.service";
import { TiposolicitudService } from '../servicios/tiposolicitud.service';
import { CentrodecostosService } from '../servicios/centrodecostos.service';
import { ContactoService } from '../servicios/contacto.service';
@Component({
  selector: "app-formulario-solicitudes",
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

  tipo_solicitud:any = [];
centrodecostos:any = [];
contacto:any = [];
  estados: any = [
    { value: "habilitado", name: "Habilitado" },
    { value: "deshabilitado", name: "Deshabilitado" },
  ];

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private SolicitudesService: SolicitudesService,
    private TiposolicitudService: TiposolicitudService,private CentrodecostosService: CentrodecostosService,private ContactoService: ContactoService
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
    this.TiposolicitudService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.tipo_solicitud = res.content; });
this.CentrodecostosService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.centrodecostos = res.content; });
this.ContactoService.getAll(100, 1, 'nombre', false, '').subscribe((res:any) => { this.contacto = res.content; });
  }

  ngOnInit(): void {    
    this.cargarArrays();
    this.formGroup = this.FormBuilder.group({id:["",[] ],fecha:["",[] ],aprobacion:[false,[] ],estado:["",[] ],tipoSolicitudId:["",[] ],centrodecostosId:["",[] ],solicitanteId:["",[] ]});
    if (this.dataEdit != null) {
      this.formGroup.setValue({id:this.dataEdit.id,fecha:this.dataEdit.fecha,aprobacion:this.dataEdit.aprobacion,estado:this.dataEdit.estado,tipoSolicitudId:this.dataEdit.tipoSolicitudId,centrodecostosId:this.dataEdit.centrodecostosId,solicitanteId:this.dataEdit.solicitanteId});
      this.rel_prefix = "/solicitudes/"+this.dataEdit.id;
    }
    let id = this.route.snapshot.params['id'];
    if (this.rel_prefix && this.rel_field) this.formGroup.get(this.rel_field).disable();
    if (id != null && !this.esModal && id!="nuevo" ) {
      this.SolicitudesService.find(id).subscribe((result:any) => {
        if (result.content.length == 0) return;
        
        if (Array.isArray(result.content))
          this.dataEdit= result.content[0];
        else
          this.dataEdit= result.content;

          this.formGroup.setValue({id:this.dataEdit.id,fecha:this.dataEdit.fecha,aprobacion:this.dataEdit.aprobacion,estado:this.dataEdit.estado,tipoSolicitudId:this.dataEdit.tipoSolicitudId,centrodecostosId:this.dataEdit.centrodecostosId,solicitanteId:this.dataEdit.solicitanteId});
          this.rel_prefix = "/solicitudes/"+id;
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
        this.SolicitudesService.register(sendData).subscribe(
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
        this.SolicitudesService.update(sendData, this.dataEdit.id).subscribe(
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