import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesComprasService {

  apiName:string = 'transacciones/compras';
  entitys:string = 'transacciones compras';

  apiUrl:string = '' ;
  prefix:string = '';

  constructor(private http: HttpClient, private apiService : ConsumoApiService) { }

  setPrefix(prefix: string){
    this.prefix = prefix;
  }

  habilitadosAnticipos() {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/anticipos`);
  }

  getMovimientoFondoOperativo(datos) {
    return this.apiService.tesoreria.post(this.prefix + `/${this.apiName}/fondoOperativo/movimiento/generate`, datos);
  }

  getMovimientoFondoRendir(datos) {
    return this.apiService.tesoreria.post(this.prefix + `/${this.apiName}/fondoRendir/movimiento/generate2`, datos);
  }

  getFormaPago(datos) {
    return this.apiService.tesoreria.post(this.prefix + `/${this.apiName}/formaPago/generate`, datos);
  }

}
