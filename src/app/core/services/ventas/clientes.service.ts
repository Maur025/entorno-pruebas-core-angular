import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  constructor(
    private http: HttpClient,
    private apiService: ConsumoApiService
  ) {}
  apiName: string = "clientes";
  entitys: string = "Clientes";
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
    return this.apiService.ventas
      .get(
        `${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${
          page - 1
        }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
      )
      .pipe(map((data: any) => data.data));
  }

  /*   getClientes = (
    page: number = 0,
    size: number = 100,
    sortBy: string = "id",
    descending: boolean = false
  ): Observable<ApiResponseStandard> => {
    return this.apiService.ventas.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}?page=${page}&size=${size}&sortBy=${sortBy}&descending=${descending}`
    );
  }; */
}
