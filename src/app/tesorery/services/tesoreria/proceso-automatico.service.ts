import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConsumoApiService } from "src/app/core/services/consumoApi.service";

@Injectable({
  providedIn: "root",
})
export class ProcesoAutomaticoService {
  apiName: string = "procesoAutomatico";
  entitys: string = "Proceso Automatico";

  apiUrl: string = "";
  prefix: string = "";
  constructor(
    private http: HttpClient,
    private apiService: ConsumoApiService
  ) {}

  setPrefix(prefix: string) {
    this.prefix = prefix;
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

  find(id: string = "") {
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}`
    );
  }

  getAll(
    size: number = 100,
    page: number = 1,
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

  delete(id: string | number): Observable<any> {
    return this.apiService.tesoreria.delete(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}`
    );
  }

  habilitar(id: string | number): Observable<any> {
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}/habilita`
    );
  }

  deshabilitar(datos: any, id: string | number): Observable<any> {
    datos[this.entitys] = "deshabilitar";
    return this.apiService.tesoreria.put(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${datos.id}`,
      datos
    );
  }

  habilitados() {
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/listarHabilitados`
    );
  }
}
