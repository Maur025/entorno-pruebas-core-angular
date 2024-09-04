import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FondoOperativoService {
  constructor(private apiService: ConsumoApiService) {}

  apiName: string = "fondoOperativo";
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

  update(datos: any): Observable<any> {
    return this.apiService.tesoreria.put(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${datos.id}`,
      datos
    );
  }

  aperturarFondo(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/apertura`,
      datos
    );
  }

  reposicionFondo(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/reposiciones`,
      datos
    );
  }

  cierreFondo(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/cierres`,
      datos
    );
  }

  getMontoPorRendir(fondoOperativoId) {
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${fondoOperativoId}/monto/porRendir`
    );
  }

  movimientoFondoRendir(fondoOperativoId, filtros) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/detail/${fondoOperativoId}`,
      filtros
    );
  }
}
