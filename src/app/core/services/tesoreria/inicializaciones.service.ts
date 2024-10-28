import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class InicializacionesService {

  constructor(private apiService: ConsumoApiService) {}
  apiName: string = "exportar/plantilla";
  apiUrl: string = "";
  prefix: string = "";

  exportarPlantillaInicializacion(codigo, dataClient) {

    switch(codigo){
      case "COB_CLIENTE":
        return this.apiService.tesoreria.post(this.prefix + `/cobros/${this.apiName}`, dataClient);
        break;
      case "ANT_CLIENTE":
        return this.apiService.tesoreria.post(this.prefix + `/anticipos-cliente/${this.apiName}`, dataClient);
        break;
      default:
        console.error("No se encontro el codigo----->" + codigo);

    }

    //return this.apiService.tesoreria.post(this.prefix + `/${this.apiName}/exportar/plantilla`, dataClient);
  }
}
