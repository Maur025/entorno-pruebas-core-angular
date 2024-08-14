import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class CentroCostosService {

  constructor(private apiService : ConsumoApiService) { }
  apiName:string = 'centroCosto';
  apiUrl:string = '' ;
  prefix:string = '';

  habilitados() {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/listarHabilitados`);
  }
}
