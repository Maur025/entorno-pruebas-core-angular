import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsumoApiService } from './consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  contabilidadApiUrl = '';

  constructor(private http: HttpClient,private apiService:ConsumoApiService) { }

  getAll(size=1, page=1){
    console.log(this.contabilidadApiUrl + `/variables?page=${page}&size=${size}`);
    return this.apiService.tesoreria.get(this.contabilidadApiUrl + `/variables?page=${page}&size=${size}`);
  }

  register(variables: any){
    return this.apiService.tesoreria.post(this.contabilidadApiUrl + `/variables`, variables);
  }
  update(variable: any){
    return this.apiService.tesoreria.put(this.contabilidadApiUrl+ `/variables/`+variable.id, variable);
  }
  delete(variable_id){
    return this.apiService.tesoreria.delete(this.contabilidadApiUrl+`/variables/`+ variable_id);
  }

  destroy(variable_id){
    return this.apiService.tesoreria.delete(this.contabilidadApiUrl+`/variables/`+ variable_id);
  }
  search(size=1, page=1, criterioBuscar: any){
    return this.apiService.tesoreria.get(this.contabilidadApiUrl+`/variables?page=${page}&size=${size}&keyword=${criterioBuscar}`);
  }
}
