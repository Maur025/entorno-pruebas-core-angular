import { Injectable } from '@angular/core';
import { ConsumoApiService } from '../consumoApi.service';
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  constructor(private apiService: ConsumoApiService) {}
  apiName:string = 'gestion';
	protected prefix: string = ''

	setPrefix = (prefix: string): void => {
		this.prefix = prefix
	}

	getRecordsEnabled = (): Observable<ApiResponseStandard> => {
		return this.apiService.tesoreria?.get(`${this.prefix}/${this.apiName}/habilitados`);
	}
}
