import { Injectable } from "@angular/core";
import { AperturaCierreService } from "./apertura-cierre.service";
import { map, Observable } from "rxjs";
import { ApiResponseStandard } from "src/app/shared/interface/common-api-response";
import { ResponseDataStandard } from "src/app/shared/interface/common-list-interface";
import { ResponseHandlerService } from "../response-handler.service";

@Injectable({
  providedIn: "root",
})
export class AperturaEnabledDatesService {
  constructor(
    private aperturasCierresService: AperturaCierreService,
    private responseHandlerService: ResponseHandlerService
  ) {}

  getEnabledDateList = (): Observable<Date[]> => {
    return this.aperturasCierresService
      ?.filterRecords(12, 0, "id", false, "", { aperturado: true })
      .pipe(
        map((response: ApiResponseStandard) => {
          const enabledDateList: Date[] = [];
          const responseData: ResponseDataStandard[] =
            this.responseHandlerService?.handleResponseAsArray(response);

          responseData?.forEach((monthData) => {
            let initialDay: Date = new Date(monthData?.fechaIni);
            initialDay = new Date(initialDay.setDate(initialDay.getDate() - 1));
            const endDate: Date = new Date(monthData.fechaFin);

            while (initialDay <= endDate) {
              enabledDateList.push(initialDay);
              initialDay = new Date(
                initialDay.setDate(initialDay.getDate() + 1)
              );
            }
          });
          return enabledDateList;
        })
      );
  };
}
