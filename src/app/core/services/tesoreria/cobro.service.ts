import { Injectable } from '@angular/core'
import { ConsumoApiService } from '../consumoApi.service'
import { Observable } from 'rxjs'
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response'

@Injectable({
	providedIn: 'root',
})
export class CobroService {
	protected resource: string = 'cobros'
	protected prefix: string = ''

	constructor(protected apiService: ConsumoApiService) {}

	getClientsByKeyword = (
		size: number,
		page: number,
		sortBy: string,
		descending: boolean,
		keyword: string = null
	): Observable<ApiResponseStandard> => {
		let queryParams: string = `?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}`
		if (keyword) {
			queryParams += `&keyword=${keyword}`
		}
		return this.apiService?.tesoreria?.get(
			`${this.prefix}/${this.resource}/clientes${queryParams}`
		)
	}

	getSalesPendingByClientId = (
		clientId: string,
		page: number = 0,
		size: number = 20,
		sortBy: string = 'razonSocial',
		descending: boolean = false,
		isOnlyWithBalance: boolean = false
	): Observable<ApiResponseStandard> => {
		let queryParams: string = `?page=${page}&size=${size}&sortBy=${sortBy}&descending=${descending}`
		if (isOnlyWithBalance != null) {
			queryParams += `&isOnlyWithBalance=${isOnlyWithBalance}`
		}
		return this.apiService?.tesoreria?.get(
			`${this.prefix}/${this.resource}/clientes/${clientId}/ventas${queryParams}`
		)
	}

	savePendingCollection = (data: object): Observable<ApiResponseStandard> => {
		return this.apiService?.tesoreria?.post(
			`${this.prefix}/${this.resource}`,
			data
		)
	}
}
