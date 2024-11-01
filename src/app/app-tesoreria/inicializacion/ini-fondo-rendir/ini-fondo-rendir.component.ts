import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ArchivosService } from 'src/app/core/services/archivos.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { EmpleadoService } from 'src/app/core/services/tesoreria/empleado.service';
import { InicializacionesService } from 'src/app/core/services/tesoreria/inicializaciones.service';
import { ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { utils, WorkBook, WorkSheet, read } from 'xlsx';
import { DataImporFondoRendir, Employee } from '../inicializacion.model';

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

  dataFila;
  dataEmployee;
  cargandoContenido
  submitted;
  archivoCSV;
  dataXLSX;
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
      id: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      nitCi: ['',[Validators.required]],
    });
  }

  getListEmployee(){
    this.empleadoService.listarHabilitados().subscribe(data=>{
      this.empleadoList = data['data'];
    }, error=>this.notificacion.alertError(error));
  }

  selectEmpleado(value){
    console.log(value);
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

  limpiarInputFile(){
    this.excelForm.controls["archivoXLSX"].reset();
    this.dataFila = [];
    this.dataEmployee = [];
  }
  recibirExcelFondoRendir(file){
    const target: DataTransfer = <DataTransfer>file.target;
    if (target.files.length !== 1) {
      this.notificacion.alertError(null, {
        message: "No se puede subir mas de un archivo",
      });
      throw new Error("No puede subir mas de un archivo");
    }
    const reader: FileReader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const ab: ArrayBuffer = event.target.result as ArrayBuffer;
      const wb: WorkBook = read(ab);
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];
      this.dataXLSX = utils.sheet_to_json(ws, { header: 1 });

      let dataProveedor = this.dataXLSX.slice(1, 2);
      dataProveedor.forEach((element) => {
        const referencia: Employee = {
          id: element[0],
          nombre: element[1],
          numeroDocumento: element[2],
        };
        this.dataEmployee = referencia;
      });
      /* Eliminar las filas del dato del empleado*/
      this.dataXLSX.splice(0, 2);

      this.dataFila = this.readerFundToRenderData();
      this.archivoCSV = utils.sheet_to_csv(ws);
      const csvFile = this.archivoCSV;
      this.archivoCSV = new File([csvFile], "file.csv", { type: "text/csv" });
    };
    reader.readAsArrayBuffer(target.files[0]);
  }


  readerFundToRenderData = (): DataImporFondoRendir[] => {
    const arrayObject: DataImporFondoRendir[] = this.dataXLSX?.map(
      (element: object, index: number) => {
        const dataRow: DataImporFondoRendir  = {
          filaError: null,
          error: null,
          descripcion: element[0] || "",
          fecha: element[1] || "",
          centroCosto: element[2] || "",
          nroReferencia: element[3] || 0,
          estadoFondo: element[4] || "",
          montoPendiente: element[5] || "",
          messageError: null,
          columnError: null,
        };
        return dataRow;
      }
    );
    return arrayObject;
  };

  importarExcelFondoRendir(){
    this.submitted = true;
    this.cargandoContenido = true;
    const archivoData = new FormData();
    archivoData.append("file", this.archivoCSV);
    if (this.excelForm.valid) {
      this.inicializacionService
        .importarInicializacionFondoRendir(archivoData)
        .subscribe({
          next: () => {
            this.excelForm.reset();
            this.notificacion.successStandar(
              "IMPORTACIÓN REALIZADA EXITOSAMENTE"
            );
            this.cargandoContenido = false;
            this.submitted = false;
            this.dataFila = [];
            this.dataEmployee = [];
          },
          error: (error: ErrorResponseStandard) => {
            if (error?.error.data)
              this.getErrorsImport(error?.error);
            this.cargandoContenido = false;
            this.submitted = false;
            this.notificacion.alertError(error);
          },
        });
    }
  }

  getErrorsImport(errors){

  }

}
