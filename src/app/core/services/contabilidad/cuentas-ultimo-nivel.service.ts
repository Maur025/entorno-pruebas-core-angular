import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CuentasUltimoNivelService {
  constructor(
    private http: HttpClient,
    private apiService: ConsumoApiService
  ) {}
  apiName: string = "integration/tesoreria";
  apiUrl: string = "";
  prefix: string = "";
  getAll(isDeleted: false) {
    return this.apiService.contabilidad
      .get(
        `${this.apiUrl}${this.prefix}/${this.apiName}/cuentas/unpaginated?isDeleted=${isDeleted}`
      )
      .pipe(map((data) => data.data));
  }
}
