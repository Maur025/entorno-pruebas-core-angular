import { inject, Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TiposPersonasService {
  constructor(private apiService: ConsumoApiService) {}
  apiName: string = "tipos-personas";
  apiUrl: string = "";
  prefix: string = "";

  getAll(isDeleted: boolean = false) {
    return this.apiService.tesoreria
      .get(
        `${this.apiUrl}${this.prefix}/${this.apiName}/unpaginated?isDeleted=${isDeleted}`
      )
      .pipe(map((data) => data.data));
  }
}
