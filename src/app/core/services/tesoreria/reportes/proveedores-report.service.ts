import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresReportService {

  constructor(private apiService: ConsumoApiService) {}

  estadoCuentas(conDetalle: Boolean,fileType:string,  filtros: any) {
    return this.apiService.tesoreria.post(`/proveedor/report/estado/${conDetalle}/${fileType}`,
      filtros
    );
  }
}
