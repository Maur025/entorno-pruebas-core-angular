import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response';
import { ConsumoApiService } from '../consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

	constructor(private apiService: ConsumoApiService) {}
	apiName: string = 'proveedor'
	apiUrl: string = ''
	prefix: string = ''

	searchProveedor(keyword: any) {
		return this.apiService.compras.post(
			`${this.apiUrl}${this.prefix}/${this.apiName}/filter`,
			{ keyword: keyword }
		)
	}

	habilitados = (): Observable<ApiResponseStandard> => {
		return this.apiService.compras.get(
			`${this.apiUrl}${this.prefix}/${this.apiName}/habilitados`
		)
	}

	getAndFindProveedor(
		page: number = 0,
		size: number = 50,
		sortBy: string = 'id',
		descending: boolean = false,
		keyword: string = ''
	) {
		return this.apiService.compras.get(
			`${this.apiUrl}${this.prefix}/tesorery/proveedores/habilitados?page=${page}&size=${size}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
		)
	}
}
