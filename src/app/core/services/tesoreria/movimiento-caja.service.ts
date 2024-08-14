import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";

@Injectable({
  providedIn: "root",
})
export class MovimientoCajaService {
  constructor(private apiService: ConsumoApiService) {}

  apiName: string = "movimientoCaja";
  apiUrl: string = "";
  prefix: string = "";

  movimientoApertura(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/saldo_inicial`,
      datos
    );
  }
}
