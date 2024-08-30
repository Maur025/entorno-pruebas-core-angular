import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class FondoRendirService {
  constructor(private apiService : ConsumoApiService) { }

  apiName:string = 'fondoRendir';
  apiUrl:string = '' ;
  prefix:string = '';

  getAll(size: number = 100, page: number = 0, sortBy:string = 'id', descending:false, keyword:any = '') {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/listar?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`);
  }

  desembolso(datos: any) {
    return this.apiService.tesoreria.post(`${this.apiUrl}${this.prefix}/${this.apiName}`, datos);
  }

  fondosRendirEmpleado(empleadoId ) {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/detail/empleado/${empleadoId}`);
  }

  getListaFondoRendirEmpleado(size: number = 100, page: number = 0, sortBy:string = 'id', descending:false, keyword:any = '', empleadoId) {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/desembolsos/empleado/${empleadoId}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`);
  }

  pagoReembolso(datos: any) {
    return this.apiService.tesoreria.post(`${this.apiUrl}${this.prefix}/${this.apiName}/pago_reembolso`, datos);
  }

  pagoDevolucion(datos: any) {
    return this.apiService.tesoreria.post(`${this.apiUrl}${this.prefix}/${this.apiName}/pago/devolucion_empresa`, datos);
  }
}
