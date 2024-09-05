import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { ApiResponseStandard } from "src/app/shared/interface/common-api-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmpleadoService {
  constructor(private apiService: ConsumoApiService) {}
  apiName: string = "empleado";
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


  register = (datos: object): Observable<ApiResponseStandard> => {
    return this.apiService?.tesoreria?.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}`,
      datos
    );
  };

  update = (datos: { id: string }): Observable<ApiResponseStandard> => {
    return this.apiService?.tesoreria?.put(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${datos.id}`,
      datos
    );
  };

  find = (id: string = ""): Observable<ApiResponseStandard> => {
    return this.apiService?.tesoreria?.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}`
    );
  };
  delete = (id: string | number): Observable<ApiResponseStandard> => {
    return this.apiService?.tesoreria?.delete(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}`
    );
  };

  habilitar = (id: string | number): Observable<ApiResponseStandard> => {
    return this.apiService?.tesoreria?.patch(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}`
    );
  };
  listarHabilitados = (): Observable<ApiResponseStandard> => {
    return this.apiService?.tesoreria?.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/listar_habilitados`
    );
  };
}
