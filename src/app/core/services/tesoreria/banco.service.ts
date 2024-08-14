import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private apiService : ConsumoApiService) { }

  apiName:string = 'banco';
  apiUrl:string = '' ;
  prefix:string = '';

  getAll(size: number = 100, page: number = 0, sortBy:string = 'id', descending:false, keyword:any = '') {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`);
  }

  register(datos: any) {
    return this.apiService.tesoreria.post(`${this.apiUrl}${this.prefix}/${this.apiName}`, datos);
  }

  update(datos: any): Observable<any> {
    return this.apiService.tesoreria.put(`${this.apiUrl}${this.prefix}/${this.apiName}/${datos.id}`, datos);
  }

  find(id:string) {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/${id}`);
  }

  habilitados(){
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/listarHabilitados`);
  }

}
