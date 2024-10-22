import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevengadoVentaService {

  constructor(private apiService: ConsumoApiService) {}
  apiName: string = "devengado-venta";
  apiUrl: string = "";
  prefix: string = "";

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  getAll = (
    size: number = 100,
    page: number = 0,
    sortBy: string = "id",
    descending: boolean = false,
    keyword: string = ""
  ): Observable<ApiResponseStandard> => {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;
    return this.apiService?.tesoreria?.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${
        page - 1
      }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  };

}
