import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ArchivosService } from 'src/app/core/services/archivos.service';
import { ProveedorService } from 'src/app/core/services/compras/proveedor.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { InicializacionesService } from 'src/app/core/services/tesoreria/inicializaciones.service';
import { ErrorDetailDataResponseStandard, ErrorDetailResponseStandard, ErrorResponseStandard } from 'src/app/shared/interface/common-api-response';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';

interface Proveedor {
  codigoProveedor: string;
  razonSocial: string;
  numeroDocumento: string;
}
interface DataImporAnticipoProveedor {
  filaError: number | null;
  error: boolean | null;
  descripcion: string | null;
  monto: number | null;
  fecha: Date | null;
  centroCosto: string | null;
  nroReferencia: string | null;
  messageError: string | null;
  columnError: { [key: string]: any } | null;
}
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
  submitted: boolean=false;
  dataXLSX;
  dataProveedor;
  dataFila: any[];
  archivoCSV
  cargandoContenido

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
            `${this.formDownloadTemplateProveedor.get('razonSocial').value}-Plantilla Anticipo`
          );
          this.formDownloadTemplateProveedor.reset();
        },
        error: (err) => console.log(err),
      });
    }
    this.submittedDownload = true;
  }

  recibirExcelProveedor=(file, codeProveedor):void =>{
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
      dataProveedor.forEach(element => {
        const referencia : Proveedor = {
          codigoProveedor: element[0],
          razonSocial:element[1],
          numeroDocumento:element[2]
        }
        this.dataProveedor = referencia;
      });
      /* Eliminar las filas del dato del proveedor*/
      this.dataXLSX.splice(0, 2);

      switch(codeProveedor){
        case "ANT_PROVEEDOR" :
          this.dataFila = this.readerAdvancedData();
          break;
        case "CRED_PROVEEDOR" :
          this.dataFila = this.readerCreditData();
          break;
   /*      case "" :
          break;   */
      }
      this.archivoCSV = utils.sheet_to_csv(ws);
      const csvFile = this.archivoCSV;
      this.archivoCSV = new File([csvFile], "file.csv", { type: "text/csv" });
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  readerAdvancedData=(): DataImporAnticipoProveedor[]=>{
    const arrayObject: DataImporAnticipoProveedor[] = this.dataXLSX?.map(
      (element: object, index: number) => {
        const dataRow: DataImporAnticipoProveedor = {
          filaError: null,
          error: null,
          descripcion: element[0] || "",
          nroReferencia: element[1] || "",
          fecha: element[2] || "",
          monto: element[3] || 0,
          centroCosto: element[4] || "",
          messageError: null,
          columnError: null,
        };
        return dataRow;
      }
    );
    return arrayObject;
  }

  readerCreditData=(): DataImporAnticipoProveedor[]=>{
    return null;
  }

  importarExcelProveedor(codeProveedor){
    this.submitted = true;
    this.cargandoContenido = true;
    const archivoData = new FormData();
    archivoData.append("file", this.archivoCSV);
    if(this.excelForm.valid){
      this.inicializacionService.importarInicializacionProveedor
        (codeProveedor, archivoData).subscribe({
          next:() =>{
            this.excelForm.reset();
            this.notificacion.successStandar(
              "IMPORTACIÓN REALIZADA EXITOSAMENTE"
            );
            this.cargandoContenido = false;
            this.submitted = false;
            this.dataFila = [];
            this.dataProveedor = [];
          }, error:(error: ErrorResponseStandard)=>{
            if (error?.error.data) this.getErrorsImportProveedor(codeProveedor,error?.error);
            this.cargandoContenido = false;
            this.submitted = false;
            this.notificacion.alertError(error);
          }
        });

    }
  }

  getErrorsImportProveedor=(codeProveedor:string, errorDetail: ErrorDetailResponseStandard):void=>{
    const errorData: ErrorDetailDataResponseStandard[] = errorDetail?.data?.map(
      (rowData: ErrorDetailDataResponseStandard) => {
        rowData.propertyPath = JSON.parse(rowData.propertyPath);
        return rowData;
      }
    );
    for (const errorRow of errorData) {
      const importDatafound = this.dataFila[errorRow.propertyPath?.row - 1];
      importDatafound.error = true;
      if (importDatafound.messageError) {
        importDatafound.messageError += `</br>- ${errorRow.message}`;
      } else {
        importDatafound.messageError = "- " + errorRow.message;
      }

      importDatafound.filaError = errorRow.propertyPath?.row;

      switch(codeProveedor){
        case "ANT_CLIENTE":
          this.errorsAdvances(errorRow,importDatafound);
          break;
        case "COB_CLIENTE":
          this.errorsCredit(errorRow,importDatafound);
          break;
        case "":
          break;
      }
    }
  }
  errorsCredit=(errorRow, importDatafound):void=>{

  }

  errorsAdvances=(errorRow, importDatafound):void=>{
    switch (errorRow.propertyPath?.column) {
      case "FECHA":
        importDatafound.columnError = {
          ...importDatafound.columnError,
          fecha: true,
        };
        break;
      case "CENTRO COSTOS":
        importDatafound.columnError = {
          ...importDatafound.columnError,
          centroCosto: true,
        };
        break;
      case "DESCRIPCION":
        importDatafound.columnError = {
          ...importDatafound.columnError,
          descripcion: true,
        };
        break;
      case "MONTO ANTICIPO":
        importDatafound.columnError = {
          ...importDatafound.columnError,
          monto: true,
        };
        break;
    }
  }

  limpiarInputFile(){
    this.excelForm.controls["archivoXLSX"].reset();
    this.dataFila = [];
    this.dataProveedor = [];
  }
}