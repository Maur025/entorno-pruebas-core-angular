import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service'
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response'

@Injectable({
	providedIn: 'root',
})
export class ProveedorService {
	apiName: string = 'proveedor'
	entitys: string = 'Proveedor'
	apiUrl: string = ''
	prefix: string = ''
	constructor(
		private http: HttpClient,
		private apiService: ConsumoApiService
	) {}

	setPrefix(prefix: string) {
		this.prefix = prefix
	}

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
