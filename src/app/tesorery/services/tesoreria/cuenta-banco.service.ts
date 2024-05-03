import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service'
import { ApiResponseStandard } from 'src/app/shared/interface/commonApiResponse'
import { ResponseDataStandard } from 'src/app/shared/interface/commonListInterfaces'

@Injectable({
	providedIn: 'root',
})
export class CuentaBancoService {
	apiName: string = 'cuentaBanco'
	entitys: string = 'CuentaBanco'

	apiUrl: string = ''
	prefix: string = ''

	constructor(private apiService: ConsumoApiService) {}

	setPrefix(prefix: string) {
		this.prefix = prefix
	}

	register = (datos: object): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.post(
			`${this.apiUrl}${this.prefix}/${this.apiName}`,
			datos
		)
	}

	update = (datos: ResponseDataStandard): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.put(
			`${this.apiUrl}${this.prefix}/${this.apiName}/${datos.id}`,
			datos
		)
	}

	find = (id: string = ''): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.get(
			`${this.apiUrl}${this.prefix}/${this.apiName}/${id}`
		)
	}

	getAll = (
		size: number = 100,
		page: number = 1,
		sortBy: string = 'id',
		descending: false,
		keyword: string = ''
	): Observable<ApiResponseStandard> => {
		size = size <= 0 ? 100 : size
		return this.apiService.tesoreria.get(
			`${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
		)
	}

	delete = (id: string | number): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.delete(
			`${this.apiUrl}${this.prefix}/${this.apiName}/${id}`
		)
	}

	habilitar = (id: string | number): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.get(
			`${this.apiUrl}${this.prefix}/${this.apiName}/${id}/habilita`
		)
	}

	deshabilitar = (
		datos: ResponseDataStandard
	): Observable<ApiResponseStandard> => {
		datos[this.entitys] = 'deshabilitar'
		return this.apiService.tesoreria.put(
			`${this.apiUrl}${this.prefix}/${this.apiName}/${datos.id}`,
			datos
		)
	}

	getCuentasBanco = (
		size: number = 100,
		page: number = 1,
		sortBy: string = 'id',
		descending: false,
		keyword: string = '',
		id: string | number
	): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria.get(
			`${this.apiUrl}${this.prefix}/${this.apiName}/banco/${id}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
		)
	}
}
