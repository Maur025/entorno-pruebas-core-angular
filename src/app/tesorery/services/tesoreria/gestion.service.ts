import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service'
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response'

@Injectable({
	providedIn: 'root',
})
export class GestionService {
	protected readonly API_NAME: string = 'gestion'

	protected prefix: string = ''

	constructor(private apiService: ConsumoApiService) {}

	setPrefix = (prefix: string): void => {
		this.prefix = prefix
	}

	getRecordsEnabled = (): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria?.get(
			`${this.prefix}/${this.API_NAME}/habilitados`
		)
	}
}
