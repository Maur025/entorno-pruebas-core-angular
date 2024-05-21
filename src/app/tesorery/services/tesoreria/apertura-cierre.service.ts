import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service'
import { ApiResponseStandard } from 'src/app/shared/interface/commonApiResponse'

@Injectable({
	providedIn: 'root',
})
export class AperturaCierreService {
	protected readonly API_NAME: string = 'apertura'

	protected prefix: string = ''

	constructor(private apiService: ConsumoApiService) {}

	setPrefix = (prefix: string): void => {
		this.prefix = prefix
	}

	filterRecords = (
		size: number = 20,
		page: number = 1,
		sortBy: string = 'createAt',
		descending: boolean = false,
		keyword: string = '',
		filterData: object = null
	): Observable<ApiResponseStandard> => {
		const queryParams = `size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}`

		return this.apiService.tesoreria?.post(
			`${this.prefix}/${this.API_NAME}/filter?${queryParams}`,
			filterData
		)
	}

	toggleStatus = (data: object): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria?.post(
			`${this.prefix}/${this.API_NAME}/habilita`,
			data
		)
	}
}
