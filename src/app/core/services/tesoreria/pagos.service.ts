import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";

@Injectable({
  providedIn: "root",
})
export class PagosService {
  constructor(private apiService: ConsumoApiService) {}

  apiName: string = "pago";
  apiUrl: string = "";
  prefix: string = "";

  getAll(
    size: number = 100,
    page: number = 0,
    sortBy: string = "id",
    descending: false,
    keyword: any = ""
  ) {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${
        page - 1
      }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  }

  register(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}`,
      datos
    );
  }

  comprasPorProveedor(
    size: number = 20,
    page: number = 0,
    descending: boolean = true,
    idProveedor,
    filtros={}
  ) {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;

    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${idProveedor}
      ?page=${page - 1}&size=${size}&descending=${descending}`,
      filtros
    );
  }

  generarComprobante(id: any) {
		return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}/pdf`
		)
	}
}
