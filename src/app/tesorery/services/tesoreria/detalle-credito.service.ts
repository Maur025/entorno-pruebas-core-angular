import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleCreditoService {

  apiName: string = 'detalleCredito';
  entitys: string = 'Detalle Credito';

  apiUrl: string = '';
  prefix: string = '';

  constructor(private http: HttpClient, private apiService: ConsumoApiService) { }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  filter(size: number = 100, page: number = 1, sortBy: string = 'id', descending: false, keyword: any, filtros: any) {
    return this.apiService.tesoreria.post(this.prefix + `/${this.apiName}/filter?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}`, filtros);
  }

  pagoCredito(datos: any) {
    return this.apiService.tesoreria.post(this.prefix + `/${this.apiName}/pago`, datos);
  }

}
