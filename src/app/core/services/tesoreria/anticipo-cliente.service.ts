import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";

@Injectable({
  providedIn: "root",
})
export class AnticipoClienteService {
  constructor(private apiService: ConsumoApiService) {}
  apiName: string = "anticipos-cliente";
  apiUrl: string = "";
  prefix: string = "";

  getAll(
    size: number = 100,
    page: number = 1,
    sortBy: string = "id",
    descending: false,
    keyword: any = ""
  ) {
    size = size <= 0 ? 100 : size;
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  }

  crearAnticipo(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}`,
      datos
    );
  }

  /* crearDevolucionAnticipo(datos: any) {
    return this.apiService.tesoreria.post(`${this.apiUrl}${this.prefix}/${this.apiName}/devolucion`, datos);
  }
  */
  findAnticipoCliente(idClient) {
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${idClient}`
    );
  }
}
