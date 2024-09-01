import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { Observable } from "rxjs";
import { ApiResponseStandard } from "src/app/shared/interface/common-api-response";

@Injectable({
  providedIn: "root",
})
export class VentasService {
  constructor(private apiService: ConsumoApiService) {}
  apiName: string = "clientes";
  apiUrl: string = "";
  prefix: string = "";

  getVentas = (
    page: number = 0,
    size: number = 100,
    sortBy: string = "id",
    descending: boolean = false
  ): Observable<ApiResponseStandard> => {
    return this.apiService.ventas.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/?page=${page}&size=${size}&sortBy=${sortBy}&descending=${descending}`
    );
  };
}
