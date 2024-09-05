import { ConsumoApiService } from "src/app/core/services/consumoApi.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponseStandard } from "src/app/shared/interface/common-api-response";

@Injectable({
  providedIn: "root",
})
export class EmpleadoService {
  apiName: string = "empleado";
  apiUrl: string = "";
  prefix: string = "";
  constructor(private apiService: ConsumoApiService) {}

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  getAll = (
    size: number = 100,
    page: number = 1,
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
