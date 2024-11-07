import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesReportService {

  constructor(private apiService: ConsumoApiService) {}

  estadoCuentas(conDetalle: Boolean,fileType:string,  filtros: any) {
    return this.apiService.tesoreria.post(`/clientes/report/estado/${conDetalle}/${fileType}`,
      filtros
    );
  }

}
