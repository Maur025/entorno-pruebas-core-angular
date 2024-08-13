import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancoService {

  constructor(private apiService: ConsumoApiService) {}

  apiName: string = 'banco/cuenta_banco'
	apiUrl: string = ''
	prefix: string = ''

	register(datos: any) {
		return this.apiService.tesoreria.post(`${this.apiUrl}${this.prefix}/${this.apiName}/movimiento-inicio`, datos);
	  }

  getCuentasBanco = (
		size: number = 100,
		page: number = 1,
		sortBy: string = 'id',
		descending: boolean = false,
		keyword: string = '',
		id: string | number
	): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.get(
			`${this.apiUrl}${this.prefix}/${this.apiName}/banco/${id}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
		)
	}

}
