import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoFondoOperativoService {
  constructor(private apiService : ConsumoApiService) { }

  apiName:string = 'fondoOperativo';
  apiUrl:string = '' ;
  prefix:string = '';

  listarEstadoFondo() {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/estados/fondo`);
  }

}
