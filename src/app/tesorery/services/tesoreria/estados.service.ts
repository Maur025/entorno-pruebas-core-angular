import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  apiName:string = 'estados';
  entitys:string = 'Estado';

  apiUrl:string = '' ;
  prefix:string = '';

  constructor(private http: HttpClient, private apiService : ConsumoApiService) { }

  setPrefix(prefix: string){
    this.prefix = prefix;
  }

  habilitadosFondos() {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/fondos`);
  }
}