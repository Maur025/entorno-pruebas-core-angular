import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";

@Injectable({
  providedIn: "root",
})
export class CompensacionService {
  constructor(private apiService: ConsumoApiService) {}

  apiName: string = "compensaciones";
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

  register(data: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}`,
      data
    );
  }

  comprasPorProveedor(idProveedor) {
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${idProveedor}`
    );
  }

  generarComprobante(id: any) {
		return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}/pdf`
		)
	}
}
