import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  contabilidadApiUrl = environment.apiUrlContabilidad;

  constructor(private http: HttpClient) { }

  getAll(size=1, page=1){
    console.log(this.contabilidadApiUrl + `/variables?page=${page}&size=${size}`);
    return this.http.get(this.contabilidadApiUrl + `/variables?page=${page}&size=${size}`);
  }

  register(variables: any){
    return this.http.post(this.contabilidadApiUrl + `/variables`, variables);
  }
  update(variable: any){
    return this.http.put(this.contabilidadApiUrl+ `/variables/`+variable.id, variable);
  }
  delete(variable_id){
    return this.http.delete(this.contabilidadApiUrl+`/variables/`+ variable_id);
  }

  destroy(variable_id){
    return this.http.delete(this.contabilidadApiUrl+`/variables/`+ variable_id);
  }
  search(size=1, page=1, criterioBuscar: any){
    return this.http.get(this.contabilidadApiUrl+`/variables?page=${page}&size=${size}&keyword=${criterioBuscar}`);
  }
}
