import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ArchivosService } from 'src/app/core/services/archivos.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { EmpleadoService } from 'src/app/core/services/tesoreria/empleado.service';
import { InicializacionesService } from 'src/app/core/services/tesoreria/inicializaciones.service';

@Component({
  selector: 'app-ini-fondo-rendir',
  templateUrl: './ini-fondo-rendir.component.html',
  styleUrls: ['./ini-fondo-rendir.component.scss']
})
export class IniFondoRendirComponent {
  @Input() importarDescargar: boolean;
  formDownloadTemplateFondoRendir: UntypedFormGroup;
  excelForm: UntypedFormGroup;
  empleadoList;
  submittedDownload;

  constructor(
    private archivoService: ArchivosService,
    private formBuilder: UntypedFormBuilder,
    private notificacion: NotificacionService,
    private inicializacionService: InicializacionesService,
    private empleadoService : EmpleadoService
  ) {}

  ngOnInit() {
    this.getListEmployee();
    this.setForm();
    this.excelForm = this.formBuilder.group({
      archivoXLSX: ["", [Validators.required]],
    });
  }
  get formE() {
    return this.excelForm.controls;
  }

  setForm() {
    this.formDownloadTemplateFondoRendir = this.formBuilder.group({
      id: [Validators.required],
      nombre: [Validators.required],
      nitCi: [Validators.required],
    });
  }

  getListEmployee(){
    this.empleadoService.listarHabilitados().subscribe(data=>{
      this.empleadoList = data['data'];
    }, error=>this.notificacion.alertError(error));
  }

  selectEmpleado(value){
    if (value != undefined) {
      this.formDownloadTemplateFondoRendir.controls["id"].setValue(value["id"]);
      this.formDownloadTemplateFondoRendir.controls["nombre"].setValue(
        value["nombre"]
      );
      this.formDownloadTemplateFondoRendir.controls["nitCi"].setValue(
        value["nitCi"]
      );
    }
  }

  descargarPlantilla(){
    if (this.formDownloadTemplateFondoRendir.valid) {
      this.inicializacionService
        .exportarPlantillaInicializacionFondoRendir(
          this.formDownloadTemplateFondoRendir.value
        )
        .subscribe({
          next: (data) => {
            let fileName = this.formDownloadTemplateFondoRendir
              .get("nombre")
              .value
            this.archivoService.generar64aExcel(
              data.data.content,
              `Plantilla FondoRendir-${fileName}`
            );
            this.formDownloadTemplateFondoRendir.reset();
          },
          error: (err) => console.error(err),
        });
    }
    this.submittedDownload = true;
  }

}
