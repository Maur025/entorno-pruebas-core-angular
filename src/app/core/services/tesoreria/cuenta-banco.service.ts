import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { ApiResponseStandard } from "src/app/shared/interface/common-api-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CuentaBancoService {
  constructor(private apiService: ConsumoApiService) {}

  apiName: string = "banco/cuenta_banco";
  apiUrl: string = "";
  prefix: string = "";

  register(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/movimiento-inicio`,
      datos
    );
  }

  getCuentasBanco = (
    size: number = 100,
    page: number = 0,
    sortBy: string = "id",
    descending: boolean = false,
    keyword: string = "",
    id: string | number
  ): Observable<ApiResponseStandard> => {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}?size=${size}&page=${
        page - 1
      }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  };

  registerTransferencia(cuentaBancoOrigenId, cuentaBancoDestinoId, datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${cuentaBancoOrigenId}/transferencias/cuentas-banco/${cuentaBancoDestinoId}`,
      datos
    );
  }
}
