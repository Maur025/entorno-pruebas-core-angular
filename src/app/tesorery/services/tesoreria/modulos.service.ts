import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConsumoApiService } from "src/app/core/services/consumoApi.service";

@Injectable({
  providedIn: "root",
})
export class ModulosService {
  apiName = "modulos";
  prefix = "";

  constructor(
    private http: HttpClient,
    private consumoApiService: ConsumoApiService
  ) {}

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }
  register(datos: any) {
    return this.consumoApiService.tesoreria.post(
      this.prefix + `/${this.apiName}`,
      datos
    );
  }
  update(datos: any): Observable<any> {
    return this.consumoApiService.tesoreria.put(
      this.prefix + `/${this.apiName}/${datos.id}`,
      datos
    );
  }
  find(id: string = "") {
    return this.consumoApiService.tesoreria.get(
      this.prefix + `/${this.apiName}/${id}`
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
    return this.consumoApiService.tesoreria.get(
      this.prefix +
        `/${this.apiName}?size=${size}&page=${
          page - 1
        }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  }
  delete(id: string | number): Observable<any> {
    return this.consumoApiService.tesoreria.delete(
      this.prefix + `/${this.apiName}/${id}`
    );
  }
  habilitar(datos: any, id: string | number): Observable<any> {
    datos["Anticipos"] = "habilitar";
    return this.consumoApiService.tesoreria.put(
      this.prefix + `/${this.apiName}/${datos.id}`,
      datos
    );
  }
  deshabilitar(datos: any, id: string | number): Observable<any> {
    datos["Anticipos"] = "deshabilitar";
    return this.consumoApiService.tesoreria.put(
      this.prefix + `/${this.apiName}/${datos.id}`,
      datos
    );
  }
  habilitados() {
    return this.consumoApiService.tesoreria.get(
      `${this.prefix}/${this.apiName}/listado`
    );
  }
  getConfigurables() {
    return this.consumoApiService.tesoreria.get(
      `${this.prefix}/${this.apiName}/listado/configurables`
    );
  }
}
