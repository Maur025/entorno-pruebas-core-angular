import { Component, inject, OnInit } from "@angular/core";
import {
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

@Component({
  selector: "compensation-form",
  templateUrl: "./compensation-form.component.html",
  styleUrls: ["./compensation-form.component.scss"],
})
export class CompensationFormComponent implements OnInit {
  private formBuilder = inject(UntypedFormBuilder);
  private _costCenter = inject(CentroCostosService);
  private _customersService = inject(ClienteService);
  private _typesPeople = inject(TiposPersonasService);
  private _responseHandlerService = inject(ResponseHandlerService);
  private _supplierService = inject(ProveedorService);
  private _employeesService = inject(EmpleadoService);
  private notificacionService = inject(NotificacionService);
  protected _utilityService = inject(UtilityService);
  private cobroService = inject(CobroService);
  protected salesPendingCollection: ResponseDataStandard[] = [];
  //private collectionTotalAmount: number = 0;
  collectionTotalAmount: number = 0;
  isSelected: boolean = true;
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
  selectedOperatorType: string;
  itemsClientGeneralOrigin: any = [];
  itemsOperatiorGeneralOrigin: any = [];
  itemsClientGeneralNoOrigin: any = [];
  itemsOperatorGeneralNoOrigin: any = [];
  itemsOperatiorGeneralNoOrigin: any = [];
  personalOriginId: string = "";
  personalNoOriginId: string = "";
  clientData: any;
  listMovesOrigin: ResponseDataStandard[] = [];

  constructor() {}

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
    //console.log("General ", this.itemsClientGeneralOrigin);
  }
  updateClientListNoOrigin(data: any) {
    this.clientListNoOrigin = this.itemMapperClient[data] || [];
    //console.log("General ", this.itemsClientGeneralOrigin);
  }

  updateOperatorListOrigin(data: any) {
    this.itemsOperatiorGeneralOrigin = data;
    this.itemsOperatiorGeneralNoOrigin = data;
    //console.log("General Operator", this.itemsClientGeneralOrigin);
  }
  updateOperatorListNoOrigin(data: any) {
    console.log(data);
    this.itemsOperatorGeneralNoOrigin = data;
    //console.log("General Operator", this.itemsClientGeneralOrigin);
  }

  setForm() {
    this.compensationForm = this.formBuilder.group({
      id: "",
      fechaCompensacion: ["", Validators.required],
      fecha: [""],
      centroCostoId: ["", [Validators.required]],
      montoPagado: ["", [Validators.required]],
      montoTotal: [0, [Validators.required]],
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
      movimientoOrigen: ["", [Validators.required]],
      movimientosContraparte: [
        this.formBuilder.array([]),
        [Validators.required],
      ],
    });
  }
  get form() {
    return this.compensationForm.controls;
  }

  getSalesPendingByClientId = (clientId: string): void => {
    this.cobroService
      ?.getSalesPendingByClientId(clientId, 0, 20, "razonSocial", false, true)
      ?.subscribe({
        next: (response: ApiResponseStandard) => {
          console.log(
            this._responseHandlerService?.handleResponseAsArray(response)
          );
          this.listMovesOrigin =
            this._responseHandlerService?.handleResponseAsArray(response);
        },
        error: (error: ErrorResponseStandard) => {
          this.notificacionService?.alertError(error);
        },
      });
  };

  onChangeOrigin = (event) => {
    if (event != null) {
      this.selectedClientType = event?.codigo;
      this.selectedOperatorType = event?.operaciones;
      this.updateClientListOrigin();
      this.updateOperatorListOrigin(this.selectedOperatorType);
      this.updateOperatorListNoOrigin(event.tipoPersonasContrapartes);
    }
  };

  onChangeNoOrigin = (event) => {
    if (event != null) {
      //this.updateClientListNoOrigin();
      //this.updateOperatorListOrigin(this.selectedOperatorType);
      this.updateClientListNoOrigin(event?.codigo);
      console.log("event contraparte: ", event);
    }
  };
  onChangeClientOrigin = (event) => {
    this.salesPendingCollection = [];
    this.personalOriginId = event.id;
    this.clientData = event;
    this.getSalesPendingByClientId(event.id);
    console.log("client: ", event);
  };

  onChangeClientNoOrigin = (event) => {
    this.personalNoOriginId = event.id;
    console.log("client: ", event);
  };

  private getTypePeople = () => {
    this._typesPeople.getAll().subscribe({
      next: (data) => {
        console.log(data);
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
        console.log("DATA CC: ", this.costCenterList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  private getClients = () => {
    this._customersService.getAllByKeyword("", false).subscribe({
      next: (data) => {
        console.log("clients", data);
        this.clientListOrigin =
          this._responseHandlerService?.handleResponseAsArray(data);
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
        console.log("supplier", data);
        this.supplierList =
          this._responseHandlerService?.handleResponseAsArray(data);
        this.itemMapperClient.PROVEEDOR = this.supplierList;
      },
      error: (error: ErrorResponseStandard) =>
        this.notificacionService.alertError(error),
    });
  };

  private getEmployees = () => {
    this._employeesService.listarHabilitados().subscribe({
      next: (data: ApiResponseStandard) => {
        console.log("employees: ", data);
        this.employeeList =
          this._responseHandlerService?.handleResponseAsArray(data);
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

  confirmAndContinueSaving = () => {};
}
