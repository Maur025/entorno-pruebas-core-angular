import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class CentroCostosService {

  apiName:string = 'centro_costo';
  entitys:string = 'Centro Costos';

  apiUrl:string = '' ;
  prefix:string = '';

  constructor(private http: HttpClient, private apiService : ConsumoApiService) { }

  setPrefix(prefix: string){
    this.prefix = prefix;
  }

  habilitados() {
    return this.apiService.config.get(`${this.apiUrl}${this.prefix}/${this.apiName}/habilitados`);
  }
}
