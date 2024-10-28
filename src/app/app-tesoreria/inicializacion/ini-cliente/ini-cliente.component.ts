import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ArchivosService } from "src/app/core/services/archivos.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { AnticipoClienteService } from "src/app/core/services/tesoreria/anticipo-cliente.service";
import { InicializacionesService } from "src/app/core/services/tesoreria/inicializaciones.service";
import { ClienteService } from "src/app/core/services/ventas/clientes.service";
import {
  ErrorDetailDataResponseStandard,
  ErrorDetailResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { read, utils, WorkBook, WorkSheet } from "xlsx";

interface DataImporAnticipoCliente {
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
  selector: "app-ini-cliente",
  templateUrl: "./ini-cliente.component.html",
  styleUrls: ["./ini-cliente.component.scss"],
  providers: [DatePipe],
})
export class IniClienteComponent {
  @Input() codeCliente: any;
  @Input() importarDescargar: any;
  submitted: boolean = false;
  submittedDownload: boolean = false;
  dataClient;
  formDownloadTemplateClient: UntypedFormGroup;
  excelForm: UntypedFormGroup;
  data: any;
  dataFila: DataImporAnticipoCliente[];
  archivoCSV: any;
  cargandoContenido;
  clientData: any;
  importDatafound;
  constructor(
    private _clienteService: ClienteService,
    private anticipoClienteService: AnticipoClienteService,
    private archivoService: ArchivosService,
    private formBuilder: UntypedFormBuilder,
    private notificacion: NotificacionService,
    private inicializacionService: InicializacionesService
  ) {}

  ngOnInit() {
    this.getClients();
    this.setForm();
    this.excelForm = this.formBuilder.group({
      archivoXLSX: ["", [Validators.required]],
    });
  }
  get formE() {
    return this.excelForm.controls;
  }

  getClients = () => {
    this._clienteService.getAll(100, 1, "id", false, "").subscribe({
      next: (data) => {
        this.dataClient = data;
      },
      error: (err) => console.log(err),
    });
  };
  setForm() {
    this.formDownloadTemplateClient = this.formBuilder.group({
      referenciaId: [Validators.required],
      razonSocial: [Validators.required],
      nroDocumento: [Validators.required],
    });
  }
  selectData(data) {
    if (data != undefined) {
      this.formDownloadTemplateClient.controls["referenciaId"].setValue(
        data["id"]
      );
      this.formDownloadTemplateClient.controls["razonSocial"].setValue(
        data["nombre"]
      );
      this.formDownloadTemplateClient.controls["nroDocumento"].setValue(
        data["documentoNumero"]
      );
    }
  }

  descargarPlantilla(codigo) {
    console.log(codigo);
    if(this.formDownloadTemplateClient.valid){
      this.inicializacionService
      .exportarPlantillaInicializacion(codigo, this.formDownloadTemplateClient.value)
      .subscribe({
        next: (data) => {
          this.archivoService.generar64aExcel(
            data.data.content,
            "Anticipos-Clientes-Plantilla-Saldos-Iniciales"
          );
          this.formDownloadTemplateClient.reset();
        },
        error: (err) => console.log(err),
      });
    }
    this.submittedDownload = true;
  }

/*   descargarPlantilla() {
    this.anticipoClienteService
      .exportarPlantillaInicializacion(this.formDownloadTemplateClient.value)
      .subscribe({
        next: (data) => {
          this.archivoService.generar64aExcel(
            data.data.content,
            "Anticipos-Clientes-Plantilla-Saldos-Iniciales"
          );
        },
        error: (err) => console.log(err),
      });
  } */

  recibirExcel = (archivo): void => {
    const target: DataTransfer = <DataTransfer>archivo.target;
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
      this.data = utils.sheet_to_json(ws, { header: 1 });

      this.clientData = this.data.slice(0, 2);
      /* Elimanar las filas del dato del cliente en caso de anticipo cliente */
      this.data.splice(0, 2);
      console.log(this.data);
      const arrayObject: DataImporAnticipoCliente[] = this.data?.map(
        (element: object, index: number) => {
          const dataRow: DataImporAnticipoCliente = {
            filaError: null,
            error: null,
            descripcion: element[0] || "",
            monto: element[1] || 0,
            fecha: element[2] || "",
            centroCosto: element[3] || "",
            nroReferencia: element[4] || "",
            messageError: null,
            columnError: null,
          };
          return dataRow;
        }
      );

      this.dataFila = arrayObject;
      this.archivoCSV = utils.sheet_to_csv(ws);
      const csvFile = this.archivoCSV;
      this.archivoCSV = new File([csvFile], "file.csv", { type: "text/csv" });
    };
    reader.readAsArrayBuffer(target.files[0]);
  };

  importarExcel() {
    this.submitted = true;
    this.cargandoContenido = true;
    const archivoData = new FormData();
    archivoData.append("file", this.archivoCSV);
    if (this.excelForm.valid) {
      this.anticipoClienteService
        .importarSaldosIniciales(archivoData)
        .subscribe({
          next: () => {
            this.excelForm.reset();
            this.notificacion.successStandar(
              "IMPORTACIÓN REALIZADA EXITOSAMENTE"
            );
            this.cargandoContenido = false;
            this.submitted = false;
            this.dataFila = [];
            this.clientData = "";
          },
          error: (error: ErrorResponseStandard) => {
            if (error?.error.data) this.getErrorsImportData(error?.error);
            this.cargandoContenido = false;
            this.submitted = false;
            this.notificacion.alertError(error);
          },
        });
    }
  }

  getErrorsImportData = (errorDetail: ErrorDetailResponseStandard): void => {
    const errorData: ErrorDetailDataResponseStandard[] = errorDetail?.data?.map(
      (rowData: ErrorDetailDataResponseStandard) => {
        rowData.propertyPath = JSON.parse(rowData.propertyPath);
        return rowData;
      }
    );
    for (const errorRow of errorData) {
      console.log(errorRow);

      const importDatafound = this.dataFila[errorRow.propertyPath?.row - 1];

      //console.log("IMPORTDATAFOUND------__>"+importDatafound);
      importDatafound.error = true;
      //importDatafound.typeError = TypeErrorEnum.DANGER;
      if (importDatafound.messageError) {
        importDatafound.messageError += `</br>- ${errorRow.message}`;
      } else {
        importDatafound.messageError = "- " + errorRow.message;
      }

      importDatafound.filaError = errorRow.propertyPath?.row;
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
        case "DESCRIPCIÓN":
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
  };

  limpiarInputFile = (): void => {
    this.excelForm.controls["archivoXLSX"].reset();
    this.dataFila = [];
    this.clientData = "";
  };
}
