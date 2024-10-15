import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";
import { CobroService } from "src/app/core/services/tesoreria/cobro.service";
import {
  ApiResponseStandard,
  ErrorResponseStandard,
} from "src/app/shared/interface/common-api-response";
import { ResponseDataStandard } from "src/app/shared/interface/common-list-interface";
import { UtilityService } from "src/app/shared/services/utilityService.service";

@Component({
  selector: "app-sale-pending-collection-list",
  templateUrl: "./sale-pending-collection-list.component.html",
  styleUrls: ["./sale-pending-collection-list.component.scss"],
})
export class SalePendingCollectionListComponent implements OnInit {
  @Input() parentForm: UntypedFormGroup = null;
  @Input() clientData: ResponseDataStandard = { id: null };
  @Input() submitted: boolean = false;
  @Input() salesPendingCollectionList: ResponseDataStandard[] = [];

  @Output() fillSalesPendingCollection: EventEmitter<ResponseDataStandard[]> =
    new EventEmitter<ResponseDataStandard[]>();
  @Output() updateCollectionTotal: EventEmitter<number> =
    new EventEmitter<number>();

  protected quotaTotal: number = 0;
  constructor(
    protected utilityService: UtilityService,
    private cobroService: CobroService,
    private notificacionService: NotificacionService,
    private responseHandlerService: ResponseHandlerService,
    private untypedFormBuilder: UntypedFormBuilder
  ) {}

  get planCobrosArray(): UntypedFormArray {
    return this.parentForm.get("planCobros") as UntypedFormArray;
  }

  ngOnInit(): void {
    if (this.clientData?.id) {
      this.getSalesPendingByClientId();
    }
  }

  addCollectionPlanInArray = (collectionPlan: ResponseDataStandard): void => {
    this.planCobrosArray?.push(
      this.untypedFormBuilder?.group({
        planCobroId: [collectionPlan?.id || null, [Validators.required]],
        montoCobrado: [
          null,
          [
            Validators.required,
            Validators.max(collectionPlan?.saldoPendiente),
            Validators.min(0.0001),
          ],
        ],
      })
    );
  };

  removeCollectionPlanOfArray = (
    collectionPlan: ResponseDataStandard
  ): void => {
    this.planCobrosArray?.value?.forEach((rowCollectionPlan, index) => {
      if (rowCollectionPlan?.planCobroId === collectionPlan?.id) {
        this.planCobrosArray?.removeAt(index);
      }
    });

    this.totalCollectionCalculate();
  };

  getSalesPendingByClientId = (): void => {
    this.cobroService
      ?.getSalesPendingByClientId(
        this.clientData?.id?.toString(),
        0,
        1000,
        "razonSocial",
        false,
        true
      )
      ?.subscribe({
        next: (response: ApiResponseStandard) => {
          this.fillSalesPendingCollection.emit(
            this.responseHandlerService?.handleResponseAsArray(response)
          );
        },
        error: (error: ErrorResponseStandard) => {
          this.notificacionService?.alertError(error);
        },
      });
  };

  onChangeSaleCheckbox = (
    salePendingCollection: ResponseDataStandard,
    event: Event
  ): void => {
    const checkboxElement = event?.target as HTMLInputElement;
    salePendingCollection.selected = checkboxElement.checked;

    if (checkboxElement?.checked) {
      salePendingCollection?.planCobros?.forEach((rowPlanCobro, index) => {
        rowPlanCobro.checked = true;
        this.addCollectionPlanInArray(rowPlanCobro);
        this.setLabelDataInForm(
          rowPlanCobro,
          salePendingCollection,
          `Cuota ${index + 1}`
        );
      });
    } else {
      salePendingCollection?.planCobros?.forEach((rowPlanCobro) => {
        this.removeCollectionPlanOfArray(rowPlanCobro);
        rowPlanCobro.checked = false;
      });
    }
  };

  setLabelDataInForm = (
    collectionPlan: ResponseDataStandard,
    salePendingCollection: ResponseDataStandard,
    quotaName: string
  ): void => {
    this.planCobrosArray?.value?.forEach((rowPlanCobro, index) => {
      if (rowPlanCobro?.planCobroId === collectionPlan?.id) {
        setTimeout(() => {
          document.getElementById(`venta_${index}`).textContent = `FACTURA: ${
            salePendingCollection?.nroFacturaRecibo || "N/A"
          }`;
          document.getElementById(
            `cuota_${index}`
          ).textContent = `${quotaName} : ${
            collectionPlan?.saldoPendiente || 0
          }`;
        }, 50);
      }
    });
  };

  totalCollectionCalculate = (): void => {
    this.quotaTotal = 0;
    this.planCobrosArray?.value?.forEach((rowPlanCobro) => {
      this.quotaTotal += rowPlanCobro?.montoCobrado || 0;
    });
    this.updateCollectionTotal?.emit(this.quotaTotal);
  };

  onChangeCollectionPlanCheckBox = (
    status: boolean,
    index: number,
    collectionPlan: ResponseDataStandard,
    salePendingCollection: ResponseDataStandard
  ): void => {
    if (status) {
      salePendingCollection.checked = true;
      const quotaName: string = document?.getElementById(
        `nameCuota${index}`
      )?.textContent;
      this.addCollectionPlanInArray(collectionPlan);
      this.setLabelDataInForm(collectionPlan, salePendingCollection, quotaName);
    } else {
      this.removeCollectionPlanOfArray(collectionPlan);
    }
  };

  onClickToggleMoreInfo = (
    salePendingCollection: ResponseDataStandard
  ): void => {
    salePendingCollection.showForm = !salePendingCollection.showForm;
  };
}
