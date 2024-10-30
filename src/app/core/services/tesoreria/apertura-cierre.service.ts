import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { Observable } from "rxjs";
import { ApiResponseStandard } from "src/app/shared/interface/common-api-response";

@Injectable({
  providedIn: "root",
})
export class AperturaCierreService {
  constructor(private apiService: ConsumoApiService) {}

  protected prefix: string = "";
  apiUrl: string = "";
  apiName: string = "apertura";

  filterRecords = (
    size: number = 20,
    page: number = 0,
    sortBy: string = "createAt",
    descending: boolean = false,
    keyword: string = "",
    filterData: object = null
  ): Observable<ApiResponseStandard> => {
    const queryParams = `size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}`;
    return this.apiService.tesoreria?.post(
      `${this.prefix}/${this.apiName}/filter?${queryParams}`,
      filterData
    );
  };

  toggleStatus = (data: object): Observable<ApiResponseStandard> => {
    return this.apiService.tesoreria?.post(
      `${this.prefix}/${this.apiName}/habilita`,
      data
    );
  };

  getAperturaCierreHabilitados(gestionId: string) {
    return this.apiService.tesoreria?.get(
      `${this.prefix}/${this.apiName}/listarAperturados?gestionId=${gestionId}`
    );
  }
}
