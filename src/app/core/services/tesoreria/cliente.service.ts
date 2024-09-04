import { Injectable } from '@angular/core'
import { ConsumoApiService } from '../consumoApi.service'
import { Observable } from 'rxjs'
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response'

@Injectable({
	providedIn: 'root',
})
export class ClienteService {
	protected prefix: string = ''
	protected resource: string = 'clientes'

	constructor(protected apiService: ConsumoApiService) {}

	getAllByKeyword = (
		keyword: string = null,
		isDeleted: boolean = null
	): Observable<ApiResponseStandard> => {
		let queryParams = ''
		if (keyword) {
			queryParams += `?keyword=${keyword}`
		}
		if (isDeleted) {
			queryParams += `${queryParams ? '&' : '?'}isDeleted=${isDeleted}`
		}
		return this.apiService?.tesoreria?.get(
			`${this.prefix}/${this.resource}/unpaginated${queryParams}`
		)
	}
}
