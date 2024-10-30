import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class InicializacionesService {

  constructor(private apiService: ConsumoApiService) {}
  apiNameExport: string = "exportar/plantilla";
  apiNameImport: string = "importar/saldos-iniciales";
  apiUrl: string = "";
  prefix: string = "";

  importarInicializacionCliente(codigo, file){
    switch(codigo){
      case "COB_CLIENTE":
        return this.apiService.tesoreria.post(this.prefix + `/cobros/${this.apiNameImport}`, file);
        break;
      case "ANT_CLIENTE":
        return this.apiService.tesoreria.post(this.prefix + `/anticipos-cliente/${this.apiNameImport}`, file);
        break;
      default:
        console.error("No se encontro el codigo----->" + codigo);

    }
  }

  exportarPlantillaInicializacion(codigo, dataClient) {

    switch(codigo){
      case "COB_CLIENTE":
        return this.apiService.tesoreria.post(this.prefix + `/cobros/${this.apiNameExport}`, dataClient);
        break;
      case "ANT_CLIENTE":
        return this.apiService.tesoreria.post(this.prefix + `/anticipos-cliente/${this.apiNameExport}`, dataClient);
        break;
      default:
        console.error("No se encontro el codigo----->" + codigo);
    }
  }

  exportarPlantillaInicializacionProveedor(codigo, dataProveedor) {

    switch(codigo){
      case "ANT_PROVEEDOR":
        return this.apiService.tesoreria.post(this.prefix + `/anticipo_proveedor/${this.apiNameExport}`, dataProveedor);
        break;
      case "CRED_PROVEEDOR":
        return this.apiService.tesoreria.post(this.prefix + `/pago/${this.apiNameExport}`, dataProveedor);
        break;
      default:
        console.error("No se encontro el codigo----->" + codigo);
    }
  }

  importarInicializacionProveedor(codigo, file){
    console.log("SER + " + codigo);
    switch(codigo){
      case "ANT_PROVEEDOR":
        return this.apiService.tesoreria.post(this.prefix + `/anticipo_proveedor/${this.apiNameImport}`, file);
        break;
      case "CRED_PROVEEDOR":
        return this.apiService.tesoreria.post(this.prefix + `/pago/${this.apiNameImport}`, file);
        break;
      default:
        console.error("No se encontro el codigo----->" + codigo);

    }
  }
}
