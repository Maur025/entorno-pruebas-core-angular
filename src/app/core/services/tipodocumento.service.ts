import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiServicio } from './apiservicio';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {
  apiUrlContabilidad = environment.apiUrlContabilidad ;
  apiName = 'tipo_documentos';
  constructor(private http: HttpClient) { }

  restore(id: string | number): Observable<any> {
    return this.http.delete(this.apiUrlContabilidad + `/${this.apiName}/${id}`);
    }

  register(datos: any) {
    return this.http.post(this.apiUrlContabilidad + `/${this.apiName}`, datos);
  }

  update(datos: any, id: any): Observable<any> {
    return this.http.put(this.apiUrlContabilidad + `/${this.apiName}/${id}`, datos);
  }

  search(size: number, page: number,sortBy: string,descending: boolean, search: string, searchColumns: string): Observable<any>{
    return this.http.get(this.apiUrlContabilidad + `/${this.apiName}?size=${size}&page=${page}&sortBy=${sortBy}&descending=${descending}&search=${search}&searchColumns=${searchColumns}`);

  }

  getAll(size: number = 100, page: number = 1, sortBy: 'id', descending:false, keyword:any = '') {
    return this.http.get(this.apiUrlContabilidad + `/${this.apiName}?size=${size}&page=${page-1}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(this.apiUrlContabilidad + `/${this.apiName}/${id}`);
  }


  softdelete(datos: any): Observable<any> {
    datos['deleted'] = true;
    return this.http.put(this.apiUrlContabilidad + `/${this.apiName}/${datos.id}`, datos);
  }


  destroy(id: string | number): Observable<any> {
    return this.http.delete(this.apiUrlContabilidad + `/${this.apiName}/${id}`);
  }
}
