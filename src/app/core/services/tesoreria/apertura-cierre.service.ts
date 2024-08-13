import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class AperturaCierreService {

  constructor(private apiService: ConsumoApiService) {}

	protected prefix: string = '';
  apiUrl:string = '' ;
  apiName:string = 'apertura';

  getAperturaCierreHabilitados(gestionId:string){
    return this.apiService.tesoreria?.get(`${this.prefix}/${this.apiName}/listarAperturados?gestionId=${gestionId}`)
  }
}
