import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class MedioTransferenciaService {

  constructor(private apiService : ConsumoApiService) { }

  apiName:string = 'medioTransferencia';
  apiUrl:string = '' ;
  prefix:string = '';


  habilitados(){
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/listarHabilitados`);
  }

}
