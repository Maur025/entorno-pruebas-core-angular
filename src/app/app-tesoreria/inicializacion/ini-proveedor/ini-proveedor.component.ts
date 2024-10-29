import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ArchivosService } from 'src/app/core/services/archivos.service';
import { ProveedorService } from 'src/app/core/services/compras/proveedor.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { InicializacionesService } from 'src/app/core/services/tesoreria/inicializaciones.service';

@Component({
  selector: 'app-ini-proveedor',
  templateUrl: './ini-proveedor.component.html',
  styleUrls: ['./ini-proveedor.component.scss']
})
export class IniProveedorComponent {
  @Input() codeProveedor;
  @Input() importarDescargar: boolean;
  formDownloadTemplateProveedor: UntypedFormGroup;
  excelForm: UntypedFormGroup;
  proveedoresList;
  submittedDownload:boolean=false;

  constructor(
    private archivoService: ArchivosService,
    private formBuilder: UntypedFormBuilder,
    private notificacion: NotificacionService,
    private inicializacionService: InicializacionesService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit() {
    this.getProveedores();
    this.setForm();
    this.excelForm = this.formBuilder.group({
      archivoXLSX: ["", [Validators.required]],
    });
  }
  get formE() {
    return this.excelForm.controls;
  }

  getProveedores(){
    this.proveedorService.habilitados().subscribe(data=>{
      this.proveedoresList = data['content'];
    }, error=>this.notificacion.alertError(error));

  }
  setForm() {
    this.formDownloadTemplateProveedor = this.formBuilder.group({
      id: [Validators.required],
      razonSocial: [Validators.required],
      nroDocumento: [Validators.required],
    });
  }
  selectProveedor(data){
    if (data != undefined) {
      this.formDownloadTemplateProveedor.controls["id"].setValue(
        data["id"]
      );
      this.formDownloadTemplateProveedor.controls["razonSocial"].setValue(
        data["nombre"]
      );
      this.formDownloadTemplateProveedor.controls["nroDocumento"].setValue(
        data["nitCi"]
      );
    }
  }

  descargarPlantilla(codeProveedor){
    if(this.formDownloadTemplateProveedor.valid){
      this.inicializacionService
      .exportarPlantillaInicializacionProveedor(codeProveedor, this.formDownloadTemplateProveedor.value)
      .subscribe({
        next: (data) => {
          this.archivoService.generar64aExcel(
            data.data.content,
            `Plantilla Anticipo - SI ${this.formDownloadTemplateProveedor.get('razonSocial').value}`
          );
          this.formDownloadTemplateProveedor.reset();
        },
        error: (err) => console.log(err),
      });
    }
    this.submittedDownload = true;
  }
}
