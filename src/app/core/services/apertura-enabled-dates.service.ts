import { inject, Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap } from "rxjs";
import { AperturaCierreService } from "./tesoreria/apertura-cierre.service";
import { ResponseHandlerService } from "./response-handler.service";
import { ApiResponseStandard } from "src/app/shared/interface/common-api-response";
import { ResponseDataStandard } from "src/app/shared/interface/common-list-interface";
import { GestionService } from "./tesoreria/gestion.service";
/* import { ResponseHandlerService } from '../response-handler.service'
import { ApiResponseStandard } from 'src/app/shared/interfaces/common-api-response'
import { ResponseDataStandard } from 'src/app/shared/interfaces/common-list-Interfaces' */

@Injectable({
  providedIn: "root",
})
export class AperturaEnabledDatesService {
  private _gestionService = inject(GestionService);
  constructor(
    private aperturasCierresService: AperturaCierreService,
    private responseHandlerService: ResponseHandlerService
  ) {}

  getEnabledDateList() {
    // Consumir DataService para obtener datos
    return this._gestionService.getRecordsEnabled().pipe(
      switchMap((data) => {
        // Procesar los datos si es necesario antes de enviarlos
        return this.aperturasCierresService
          ?.getAperturaCierreHabilitados(data?.data[0]?.id)
          .pipe(
            map((response: ApiResponseStandard) => {
              let enabledDateList: any[] = [];
              const responseData: ResponseDataStandard[] =
                this.responseHandlerService?.handleResponseAsArray(response);
              responseData?.forEach((monthData) => {
                let startDay: Date = new Date(monthData?.fechaIni);
                const endDate: Date = new Date(monthData.fechaFin);
                enabledDateList = [
                  ...enabledDateList,
                  ...this.getDaysInRange(startDay, endDate),
                ];
              });
              return enabledDateList;
            })
          );
      })
    );
  }

  /*   getGestion = () => {
    this._gestionService.getRecordsEnabled().subscribe({
      next: (data) => {
        console.log("gestión: ", data);
        this.gestionId?.next(data?.data[0]?.id);
      },
    });
  }; */

  /*   getEnabledDateList = (): Observable<Date[]> => {
    return this.aperturasCierresService
      ?.getAperturaCierreHabilitados(this.gestionId.getValue())
      .pipe(
        map((response: ApiResponseStandard) => {
          let enabledDateList: any[] = [];
          const responseData: ResponseDataStandard[] =
            this.responseHandlerService?.handleResponseAsArray(response);
          responseData?.forEach((monthData) => {
            let startDay: Date = new Date(monthData?.fechaIni);
            const endDate: Date = new Date(monthData.fechaFin);
            enabledDateList = [
              ...enabledDateList,
              ...this.getDaysInRange(startDay, endDate),
            ];
          });
          return enabledDateList;
        })
      );
  }; */

  getDaysInRange = (startDate: Date, endDate: Date): Date[] => {
    const daysArray: Date[] = [];
    let currentDate: Date = new Date(startDate);
    while (currentDate <= endDate) {
      daysArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return daysArray;
  };
}
