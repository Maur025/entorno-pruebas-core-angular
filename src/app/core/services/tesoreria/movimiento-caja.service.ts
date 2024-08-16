import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { ApiResponseStandard } from "src/app/shared/interface/common-api-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MovimientoCajaService {
  constructor(private apiService: ConsumoApiService) {}

  apiName: string = "movimientoCaja";
  apiUrl: string = "";
  prefix: string = "";

  movimientosPorCaja=(
		size: number = 100,
		page: number = 0,
		sortBy: string = 'id',
		descending: boolean = false,
		keyword: string = '',
		id: string | number
	): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.get(
			`${this.apiUrl}${this.prefix}/${this.apiName}/${id}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
		)
	}

  movimientoApertura(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/saldo_inicial`,
      datos
    );
  }
}
