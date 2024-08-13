import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private apiService : ConsumoApiService) { }

  apiName:string = 'banco';
  apiUrl:string = '' ;
  prefix:string = '';

  habilitados(){
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/listarHabilitados`);
  }

}
