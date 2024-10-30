import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service'
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response'

@Injectable({
	providedIn: 'root',
})
export class TesoreriaProveedorService {
	protected apiName: string = 'proveedor'

	constructor(private apiService: ConsumoApiService) {}

	getProviderById = (id: string): Observable<ApiResponseStandard> => {
		return this.apiService?.tesoreria?.get(`/${this.apiName}/${id}`)
	}

	getEnabledRecords = (): Observable<ApiResponseStandard> => {
		return this.apiService?.tesoreria?.get(`/${this.apiName}/habilitados`)
	}
}
