import { Component, inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ProveedorService } from "src/app/core/services/tesoreria/proveedor.service";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { CentroCostosService } from "src/app/core/services/tesoreria/centro-costos.service";
import { ClienteService } from "src/app/core/services/tesoreria/cliente.service";
import { TiposPersonasService } from "src/app/core/services/tesoreria/tipos-personas.service";
import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { ResponseDataStandard } from "src/app/shared/interface/common-list-interface";
import { UtilityService } from "src/app/shared/services/utilityService.service";
import { EmpleadoService } from "src/app/core/services/tesoreria/empleado.service";
import { CobroService } from "src/app/core/services/tesoreria/cobro.service";
import { AnticipoClienteService } from "src/app/core/services/tesoreria/anticipo-cliente.service";
import { AnticipoProveedorService } from "src/app/core/services/tesoreria/anticipo-proveedor.service";
import { PagosService } from "src/app/core/services/tesoreria/pagos.service";
import { FondoRendirService } from "src/app/core/services/tesoreria/fondo-rendir.service";
import { ScreenshotService } from "src/app/core/services/screenshot.service";
import { CompensacionService } from "src/app/core/services/tesoreria/compensaciones.service";
import { Router } from "@angular/router";
import { tap, catchError } from 'rxjs/operators';
import { ArchivosService } from 'src/app/core/services/archivos.service'
import { of } from 'rxjs';

@Component({
  selector: "compensation-form",
  templateUrl: "./compensation-form.component.html",
  styleUrls: ["./compensation-form.component.scss"],
})
export class CompensationFormComponent implements OnInit {
  protected screenshotService = inject(ScreenshotService);
  private formBuilder = inject(UntypedFormBuilder);
  private _compensacionService = inject(CompensacionService);
  private _costCenter = inject(CentroCostosService);
  private _customersService = inject(ClienteService);
  private _typesPeople = inject(TiposPersonasService);
  private _responseHandlerService = inject(ResponseHandlerService);
  private _supplierService = inject(ProveedorService);
  private _employeesService = inject(EmpleadoService);
  private notificacionService = inject(NotificacionService);
  protected _utilityService = inject(UtilityService);
  private cobroService = inject(CobroService);
  private _anticipoProveedorService = inject(AnticipoProveedorService);
  private _anticipoClienteService = inject(AnticipoClienteService);
  private _supplierAdvanceService = inject(PagosService);
  private fondoRendirService = inject(FondoRendirService);
  private router = inject(Router);
  protected salesPendingCollection: ResponseDataStandard[] = [];
  //private collectionTotalAmount: number = 0;
  collectionTotalAmount: number = 0;
  isSelected: boolean = true;
  isStatusSubmit: boolean = false;
  isStatusData: boolean = false;
  isStatusDataNoOrigin: boolean = false;
  isEmptyOrigin: boolean = false;
  isEmptyNoOrigin: boolean = false;
  breadCrumbItems: object[];
  compensationForm: UntypedFormGroup;
  submitted: boolean = false;
  costCenterList: ResponseDataStandard[] = [];
  operatorListOrigin: ResponseDataStandard[] = [];
  operationListOrigin: ResponseDataStandard[] = [];
  clientListOrigin: ResponseDataStandard[] = [];

  operatorListNoOrigin: ResponseDataStandard[] = [];
  operationListNoOrigin: ResponseDataStandard[] = [];
  clientListNoOrigin: ResponseDataStandard[] = [];

  supplierList: ResponseDataStandard[] = [];
  employeeList: ResponseDataStandard[] = [];
  selectedClientType: string;
  selectedClientTypeNoOrigin: string;
  selectedOperatorType: string;
  typeOperator: string = "";
  typeOperatorNoOrigin: string = "";
  itemsClientGeneralOrigin: any = [];
  itemsOperatiorGeneralOrigin: any = [];
  itemsClientGeneralNoOrigin: any = [];
  itemsOperatorGeneralNoOrigin: any = [];
  itemsOperatiorGeneralNoOrigin: any = [];
  personalOriginId: string = "";
  operationOriginId: string = "";
  operationNoOriginId: string = "";
  personalNoOriginId: string = "";
  clientData: any;
  listMovesOrigin: ResponseDataStandard[] = [];
  listMovesNoOrigin: ResponseDataStandard[] = [];
  labelOperationOrigin: string = "";
  labelPersonOrigin: string = "";
  labelOperationNoOrigin: string = "";
  codeDesabled: string;
  operationDesabled: string;
  dataOrigin = {
    tipoPersonaId: "",
    personaReferenciaId: "",
    operacionId: "",
  };
  dataNoOrigin = {
    tipoPersonaId: "",
    personaReferenciaId: "",
    operacionId: "",
  };
  constructor(
		public archivosService: ArchivosService
  ) {}

  itemMapperClient = {
    EMPLEADO: this.clientListOrigin,
    PROVEEDOR: this.supplierList,
    CLIENTE: this.employeeList,
  };

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Compensaciones" },
      { label: "Nueva Compensación", active: true },
    ];
    this.setForm();
    this.getCostCenter();
    this.getTypePeople();
    this.getClients();
    this.getSuppliers();
    this.getEmployees();
  }

  updateClientListOrigin() {
    this.itemsClientGeneralOrigin =
      this.itemMapperClient[this.selectedClientType] || [];
  }
  updateClientListNoOrigin(data: any) {
    this.clientListNoOrigin = this.itemMapperClient[data] || [];
  }

  updateOperatorListOrigin(data: any) {
    this.itemsOperatiorGeneralOrigin = data;
    this.itemsOperatiorGeneralNoOrigin = data;
  }
  updateOperatorListNoOrigin(data: any) {
    this.itemsOperatorGeneralNoOrigin = data;
  }

  setForm() {
    this.compensationForm = this.formBuilder.group({
      id: "",
      fechaCompensacion: [""],
      fecha: ["", [Validators.required]],
      centroCostoId: ["", [Validators.required]],
      montoOrigin: [0],
      montoNoOrigin: [0],
      montoTotal: [0],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      datosOrigen: this.formBuilder.group({
        tipoPersonaId: [""],
        personaReferenciaId: [""],
        operacionId: [""],
      }),
      datosContraparte: this.formBuilder.group({
        tipoPersonaId: [""],
        personaReferenciaId: [""],
        operacionId: [""],
      }),
      movimientoOrigen: this.formBuilder.group({
        movimientoReferenciaId: [""],
        montoMovimiento: [""],
        planCuotas: [[]],
      }),
      movimientosContraparte: [this.formBuilder.array([])],
    });
    this.datosOrigen.get("personaReferenciaId").disable();
    this.datosOrigen.get("operacionId").disable();
    this.datosContraparte.get("personaReferenciaId").disable();
    this.datosContraparte.get("operacionId").disable();
  }
  get form() {
    return this.compensationForm.controls;
  }

  get datosOrigen() {
    return this.compensationForm.get("datosOrigen") as FormGroup;
  }

  get datosContraparte() {
    return this.compensationForm.get("datosContraparte") as FormGroup;
  }

  get movimientoOrigen() {
    return this.compensationForm.get("movimientoOrigen") as FormGroup;
  }

  get movimientosContraparte() {
    return this.compensationForm.get("movimientosContraparte") as FormArray;
  }

  getSClientCredit = (clientId: string, origin: boolean = true): void => {
    this.isEmptyOrigin = false;
    this.cobroService
      ?.getSalesPendingByClientId(
        clientId,
        0,
        1000,
        "nroFacturaRecibo",
        true,
        true
      )
      ?.subscribe({
        next: (response: ApiResponseStandard) => {
          if (origin) {
            this.listMovesOrigin =
              this._responseHandlerService?.handleResponseAsArray(response);
            this.isEmptyOrigin = this.listMovesOrigin.length == 0;
            this.isStatusData = false;
            this.isStatusDataNoOrigin = false;
          } else {
            this.listMovesNoOrigin =
              this._responseHandlerService?.handleResponseAsArray(response);
            this.isEmptyNoOrigin = this.listMovesNoOrigin.length == 0;
            this.isStatusData = false;
            this.isStatusDataNoOrigin = false;
          }
        },
        error: (error: ErrorResponseStandard) => {
          this.notificacionService?.alertError(error);
        },
      });
  };

  getClientAdvanced = (clientId: string, origin: boolean = true) => {
    this.isEmptyOrigin = false;
    this._anticipoClienteService.findAnticipoCliente(1000, 1,false,'',clientId).subscribe({
      next: (data: ApiResponseStandard) => {
        if (origin) {
          this.listMovesOrigin =
            this._responseHandlerService?.handleResponseAsArray(data);
          this.isEmptyOrigin = this.listMovesOrigin.length == 0;
          this.isStatusData = false;
          this.isStatusDataNoOrigin = false;
        } else {
          this.listMovesNoOrigin =
            this._responseHandlerService?.handleResponseAsArray(data);
          this.isEmptyNoOrigin = this.listMovesNoOrigin.length == 0;
          this.isStatusData = false;
          this.isStatusDataNoOrigin = false;
        }
      },
      error: (err) => this.notificacionService.alertError(err),
    });
  };

  getSupplierAdvance = (proveedorId: string, origin: boolean = true) => {
    this.isEmptyOrigin = false;
    this._anticipoProveedorService.findAnticipoProveedor(1000, 1, "id",false,'',proveedorId).subscribe(
      (data) => {
        if (origin) {
          this.listMovesOrigin =
            this._responseHandlerService?.handleResponseAsArray(data);
          this.isEmptyOrigin = this.listMovesOrigin.length == 0;
          this.isStatusData = false;
          this.isStatusDataNoOrigin = false;
        } else {
          this.listMovesNoOrigin =
            this._responseHandlerService?.handleResponseAsArray(data);
          this.isEmptyNoOrigin = this.listMovesNoOrigin.length == 0;
          this.isStatusData = false;
          this.isStatusDataNoOrigin = false;
        }
      },
      (error) => this.notificacionService.alertError(error)
    );
  };

  getSupplierCredit = (idProveedor: string, origin: boolean = true) => {
    this.isEmptyOrigin = false;
    this._supplierAdvanceService.comprasPorProveedor(1000,0,true,idProveedor).subscribe(
      (data) => {
        if (origin) {
          this.listMovesOrigin =
            this._responseHandlerService?.handleResponseAsArray(data);
          this.isEmptyOrigin = this.listMovesOrigin.length == 0;
          this.isStatusData = false;
          this.isStatusDataNoOrigin = false;
        } else {
          this.listMovesNoOrigin =
            this._responseHandlerService?.handleResponseAsArray(data);
          this.isEmptyNoOrigin = this.listMovesNoOrigin.length == 0;
          this.isStatusData = false;
          this.isStatusDataNoOrigin = false;
        }
      },
      (error) => this.notificacionService.alertError(error)
    );
  };

  getEmployeeFundRenderOrRefund = (
    employeeId: string,
    origin: boolean = true
  ) => {
    this.isEmptyOrigin = false;
    this.fondoRendirService.fondosRendirEmpleado(employeeId).subscribe(
      (data) => {
        if (origin) {
          this.listMovesOrigin =
            this._responseHandlerService?.handleResponseAsArray(data);
          this.isEmptyOrigin = this.listMovesOrigin.length == 0;
          this.isStatusData = false;
          this.isStatusDataNoOrigin = false;
        } else {
          this.listMovesNoOrigin =
            this._responseHandlerService?.handleResponseAsArray(data);
          this.isEmptyNoOrigin = this.listMovesNoOrigin.length == 0;
          this.isStatusData = false;
          this.isStatusDataNoOrigin = false;
        }
      },
      (error) => this.notificacionService.alertError(error)
    );
  };

  onChangeOrigin = (event) => {
    if (event != undefined) {
      this.updateTotalAmountOrigin();
      this.dataOrigin.tipoPersonaId = event.id;
      this.selectedClientType = event?.codigo;
      this.selectedOperatorType = event?.operaciones;
      //this.getLabelPerson(this.selectedClientType);
      this.updateClientListOrigin();
      this.updateOperatorListOrigin(this.selectedOperatorType);
      this.updateOperatorListNoOrigin(event.tipoPersonasContrapartes);
      this.typeOperator = event?.codigo;
      this.datosOrigen.patchValue({
        personaReferenciaId: "",
        operacionId: "",
      });
      this.datosOrigen.get("personaReferenciaId").enable();
      this.datosOrigen.get("operacionId").disable();
      this.listMovesOrigin = [];
    } else {
      this.datosOrigen.patchValue({
        personaReferenciaId: "",
        operacionId: "",
      });
      this.datosOrigen.get("personaReferenciaId").disable();
      this.datosOrigen.get("operacionId").disable();
    }
  };

  evaluateCode = (code: string) => {
    if (code == "CLIENTE") {
      this.codeDesabled = "Proveedor";
    }
  };

  onChangeNoOrigin = (event) => {
    if (event != undefined) {
      //this.updateClientListNoOrigin();
      //this.updateOperatorListOrigin(this.selectedOperatorType);
      this.updateTotalAmountNoOrigin();
      this.selectedClientTypeNoOrigin = event.codigo;
      this.dataNoOrigin.tipoPersonaId = event.id;
      this.updateClientListNoOrigin(event?.codigo);
      this.typeOperatorNoOrigin = event?.codigo;
      this.datosContraparte.patchValue({
        personaReferenciaId: "",
        operacionId: "",
      });
      this.datosContraparte.get("personaReferenciaId").enable();
      this.datosContraparte.get("operacionId").disable();
      this.listMovesNoOrigin = [];
    } else {
      this.datosContraparte.patchValue({
        personaReferenciaId: "",
        operacionId: "",
      });
      this.datosContraparte.get("personaReferenciaId").disable();
      this.datosContraparte.get("operacionId").disable();
    }
  };
  onChangeClientOrigin = (event) => {
    if (event != undefined) {
      this.dataOrigin.personaReferenciaId = event.id;
      this.personalOriginId = event.id;
      this.clientData = event;
      this.updateTotalAmountOrigin();
      this.datosOrigen.patchValue({
        operacionId: "",
      });
      this.datosOrigen.get("operacionId").enable();
    } else {
      this.datosOrigen.patchValue({
        operacionId: "",
      });
      this.datosOrigen.get("operacionId").disable();
    }
  };

  onChangeClientNoOrigin = (event) => {
    if (event != undefined) {
      this.updateTotalAmountNoOrigin();
      this.personalNoOriginId = event.id;
      this.dataNoOrigin.personaReferenciaId = event.id;
      this.datosContraparte.patchValue({
        operacionId: "",
      });
      this.datosContraparte.get("operacionId").enable();
    } else {
      this.datosContraparte.patchValue({
        operacionId: "",
      });
      this.datosContraparte.get("operacionId").disable();
    }
  };

  onChangeOperationOrigin = (event) => {
    if (event != undefined) {
      this.labelOperationOrigin = event?.nombre;
      this.dataOrigin.operacionId = event.id;
      this.isStatusData = true;
      this.operationOriginId = event.id;
      this.updateTotalAmountOrigin();
      if (event.codigo == "CREDITO" && this.typeOperator == "CLIENTE") {
        this.getSClientCredit(this.personalOriginId);
      }
      if (event.codigo == "ANTICIPO" && this.typeOperator == "CLIENTE") {
        this.getClientAdvanced(this.personalOriginId);
      }
      if (event.codigo == "CREDITO" && this.typeOperator == "PROVEEDOR") {
        this.getSupplierCredit(this.personalOriginId);
      }
      if (event.codigo == "ANTICIPO" && this.typeOperator == "PROVEEDOR") {
        this.getSupplierAdvance(this.personalOriginId);
      }
      if (
        (event.codigo == "FONDO_RENDIR" || event.codigo == "REEMBOLSO") &&
        this.typeOperator == "EMPLEADO"
      ) {
        this.getEmployeeFundRenderOrRefund(this.personalOriginId);
      }
    }
  };

  onChangeOperationNoOrigin = (event) => {
    if (event != undefined) {
      this.labelOperationNoOrigin = event?.nombre;
      this.dataNoOrigin.operacionId = event.id;
      this.isStatusDataNoOrigin = true;
      this.updateTotalAmountNoOrigin();
      this.operationNoOriginId = event.id;
      if (event.codigo == "CREDITO" && this.typeOperatorNoOrigin == "CLIENTE") {
        this.getSClientCredit(this.personalNoOriginId, false);
      }
      if (
        event.codigo == "ANTICIPO" &&
        this.typeOperatorNoOrigin == "CLIENTE"
      ) {
        this.getClientAdvanced(this.personalNoOriginId, false);
      }
      if (
        event.codigo == "CREDITO" &&
        this.typeOperatorNoOrigin == "PROVEEDOR"
      ) {
        this.getSupplierCredit(this.personalNoOriginId, false);
      }
      if (
        event.codigo == "ANTICIPO" &&
        this.typeOperatorNoOrigin == "PROVEEDOR"
      ) {
        this.getSupplierAdvance(this.personalNoOriginId, false);
      }
      if (
        (event.codigo == "FONDO_RENDIR" || event.codigo == "REEMBOLSO") &&
        this.typeOperatorNoOrigin == "EMPLEADO"
      ) {
        this.getEmployeeFundRenderOrRefund(this.personalNoOriginId, false);
      }
    }
  };

  private getTypePeople = () => {
    this._typesPeople.getAll().subscribe({
      next: (data) => {
        this.operatorListOrigin = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  private getCostCenter = () => {
    this._costCenter.habilitados().subscribe({
      next: (data: ApiResponseStandard) => {
        this.costCenterList =
          this._responseHandlerService?.handleResponseAsArray(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  private getClients = () => {
    this._customersService.getAllByKeyword("", false).subscribe({
      next: (data) => {
        this.clientListOrigin = this._responseHandlerService
          ?.handleResponseAsArray(data)
          .map((element) => ({
            ...element,
            nameGeneral: this.getNameGeneralClient(element),
          }));
        this.itemMapperClient.CLIENTE = this.clientListOrigin;
      },
      error: (error: ErrorResponseStandard) => {
        this.notificacionService?.alertError(error);
      },
    });
  };

  private getSuppliers = () => {
    this._supplierService.getProveedores().subscribe({
      next: (data: ApiResponseStandard) => {
        this.supplierList = this._responseHandlerService
          ?.handleResponseAsArray(data)
          .map((element) => ({
            ...element,
            nameGeneral: this.getNameGeneralSupplier(element),
          }));

        this.itemMapperClient.PROVEEDOR = this.supplierList;
      },
      error: (error: ErrorResponseStandard) =>
        this.notificacionService.alertError(error),
    });
  };

  private getEmployees = () => {
    this._employeesService.listarHabilitados().subscribe({
      next: (data: ApiResponseStandard) => {
        this.employeeList = this._responseHandlerService
          ?.handleResponseAsArray(data)
          .map((element) => ({
            ...element,
            nameGeneral: this.getNameGeneralEmployee(element),
          }));
        this.itemMapperClient.EMPLEADO = this.employeeList;
      },
      error: (error: ErrorResponseStandard) =>
        this.notificacionService.alertError(error),
    });
  };

  getSalesPendingCollectionList = (
    responseList: ResponseDataStandard[]
  ): void => {
    this.salesPendingCollection = responseList;
  };

  getCollectionTotalAmount = (collectionTotal: number): void => {
    this.collectionTotalAmount = collectionTotal;
  };

  confirmAndContinueSaving = async (): Promise<void> => {
    this.submitted = true;
    this.isStatusSubmit = true;
    if (
      this.compensationForm.get("montoOrigin").value !=
      this.compensationForm.get("montoNoOrigin").value
    ) {
      this.notificacionService.alertErrorOnlyMessage(
        "El total del origen es distinto al total de la contraparte"
      );
      this.isStatusSubmit = false;
      return;
    }
    /*     if (this.validateAmountsEqualToZero()) {
      return;
    } */
    if (
      this.compensationForm.get("montoOrigin").value == 0 ||
      this.compensationForm.get("montoNoOrigin").value == 0
    ) {
      this.notificacionService.alertErrorOnlyMessage(
        "El total del origen y de la contraparte deben ser mayor a cero"
      );
      this.isStatusSubmit = false;
      return;
    }
    if (!this.compensationForm.valid) {
      this.isStatusSubmit = false;
      return;
    }
    const dataImg = await this.screenshotService?.takeScreenshot(
      "accountFormModalBodyDiv"
    );
    this.notificacionService?.confirmAndContinueAlert(dataImg, (response) => {
      if (response) {
        this.compensationForm.patchValue({
          fechaCompensacion: this.form["fecha"].value,
        });
        this.compensationForm.patchValue({
          montoTotal: Number(this.form["montoOrigin"].value),
        });
        this.compensationForm.get("datosOrigen").patchValue(this.dataOrigin);
        this.compensationForm
          .get("datosContraparte")
          .patchValue(this.dataNoOrigin);
        const movimientoContraparte = this.compensationForm.get(
          "movimientosContraparte"
        ).value;
        this.compensationForm.patchValue({
          movimientosContraparte: movimientoContraparte.filter(
            (element) => element.checked
          ),
        });
        //console.log("DATA SEND: ", this.compensationForm.getRawValue());
        this.saveForm(this.compensationForm.getRawValue());
      }
      this.isStatusSubmit = false;
    });
  };

  saveForm = (data: any) => {
    this._compensacionService.register(data).subscribe({
      next: (response) => {
        this.notificacionService?.successStandar("Registro exitoso.");
        this.isStatusSubmit = false;
        this.descargarComprobante(response['data']['id']);
        this.router.navigateByUrl("/compensacion");
      },
      error: (err) => {
        this.notificacionService.alertError(err);
        this.isStatusSubmit = false;
      },
    });
  };

  descargarComprobante(id) {
    this._compensacionService.generarComprobante(id).pipe(
      tap((data) => {
        this.archivosService.generar64aPDF(data['data'].content, data['data'].name);
      }),
      catchError((error) => {
        this.notificacionService.alertError(error);
        return of(null);
      })
    ).subscribe();
	}

  validateDifferentAmounts = () => {
    if (
      this.compensationForm.get("montoOrigin").value !=
      this.compensationForm.get("montoNoOrigin").value
    ) {
      this.notificacionService.alertErrorOnlyMessage(
        "El total del origen es distinto al total de la contraparte"
      );
      this.isStatusSubmit = false;
      return false;
    }
    return true;
  };
  validateAmountsEqualToZero = () => {
    if (
      this.compensationForm.get("montoOrigin").value == 0 ||
      this.compensationForm.get("montoNoOrigin").value == 0
    ) {
      this.notificacionService.alertErrorOnlyMessage(
        "El total del origen y de la contraparte deben ser mayor a cero"
      );
      this.isStatusSubmit = false;
      return false;
    }
    return true;
  };

  getClassDifferentAmounts = () => {
    return (
      this.compensationForm.get("montoOrigin").value !=
      this.compensationForm.get("montoNoOrigin").value
    );
  };
  getClassEqualAmounts = () => {
    return (
      this.compensationForm.get("montoOrigin").value ==
        this.compensationForm.get("montoNoOrigin").value &&
      this.compensationForm.get("montoOrigin").value != 0 &&
      this.compensationForm.get("montoNoOrigin").value != 0
    );
  };
  getClassEqualToZero = () => {
    return (
      this.compensationForm.get("montoOrigin").value == 0 ||
      this.compensationForm.get("montoNoOrigin").value == 0
    );
  };

  getNameGeneralClient = (data: any) => data.razonSocial;

  getNameGeneralSupplier = (data: any) => data.razonSocial;

  getNameGeneralEmployee = (data: any) => data.nombre;

  getLabelPerson = (code: string) => {
    switch (code) {
      case "EMPLEADO":
        return "Empleados";
      case "PROVEEDOR":
        return "Proveedores";
      case "CLIENTE":
        return "Clientes";
      default:
        return "Clientes";
    }
  };

  updateTotalAmountOrigin = (totalAmount: number = 0) => {
    this.compensationForm.patchValue({
      montoOrigin: totalAmount,
    });
  };
  updateTotalAmountNoOrigin = (totalAmount: number = 0) => {
    this.compensationForm.patchValue({
      montoNoOrigin: totalAmount,
    });
  };
}
