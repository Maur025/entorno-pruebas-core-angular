import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  constructor(private apiService : ConsumoApiService) { }

  apiName:string = 'pago';
  apiUrl:string = '' ;
  prefix:string = '';

  getAll(size: number = 100, page: number = 0, sortBy:string = 'id', descending:false, keyword:any = '') {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`);
  }

  register(datos: any) {
    return this.apiService.tesoreria.post(`${this.apiUrl}${this.prefix}/${this.apiName}`, datos);
  }

  comprasPorProveedor(idProveedor){
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/${idProveedor}`);
  }

}
