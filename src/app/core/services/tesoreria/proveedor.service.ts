import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';
import { Observable } from 'rxjs';
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private apiService : ConsumoApiService) { }

  apiName:string = 'proveedor';
  apiUrl:string = '' ;
  prefix:string = '';

	getProveedores = (): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}`);
	}

}
