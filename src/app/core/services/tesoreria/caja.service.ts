import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private apiService : ConsumoApiService) { }

  apiName:string = 'caja';
  apiUrl:string = '' ;
  prefix:string = '';

  habilitados(){
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/listarHabilitados`);
  }

}
