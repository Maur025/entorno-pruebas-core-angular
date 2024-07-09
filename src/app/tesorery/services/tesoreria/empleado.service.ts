import { ConsumoApiService } from 'src/app/core/services/consumoApi.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  apiName: string = 'empleado'
	apiUrl: string = ''
	prefix: string = ''
	constructor(private apiService: ConsumoApiService) {}

	setPrefix(prefix: string) {
		this.prefix = prefix
	}

	getAll(
		size: number = 100,
		page: number = 1,
		sortBy: string = 'id',
		descending: false,
		keyword: any = ''
	) {
		size = size <= 0 ? 100 : size
		return this.apiService.tesoreria.get(
			`${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${page -1}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
		)
	}

  register(datos: any) {
    return this.apiService.tesoreria.post(`${this.apiUrl}${this.prefix}/${this.apiName}`, datos);
  }

  update(datos: any): Observable<any> {
    return this.apiService.tesoreria.put(`${this.apiUrl}${this.prefix}/${this.apiName}/${datos.id}`, datos);
  }

  find(id:string = '') {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/${id}`);
  }
  delete(id: string | number): Observable<any> {
    return this.apiService.tesoreria.delete(`${this.apiUrl}${this.prefix}/${this.apiName}/${id}`);
  }

  habilitar(id: string | number): Observable<any> {
    return this.apiService.tesoreria.patch(`${this.apiUrl}${this.prefix}/${this.apiName}/${id}`);
  }
  listarHabilitados() {
    return this.apiService.tesoreria.get(`${this.apiUrl}${this.prefix}/${this.apiName}/listar_habilitados`);
  }


}
