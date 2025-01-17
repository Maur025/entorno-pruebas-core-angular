import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TipodatoService {
  apiUrl = '' ;
  apiName = 'tipo_dato';
  prefix = '';
  constructor(private http: HttpClient,private apiService:ConsumoApiService) { }

  setPrefix(prefix: string){
    this.prefix = prefix;
  }

  register(datos: any) {
    return this.apiService.tesoreria.post(this.apiUrl + this.prefix+ `/${this.apiName}`, datos);
  }

  update(datos: any, id: any): Observable<any> {
    return this.apiService.tesoreria.put(this.apiUrl + this.prefix+ `/${this.apiName}/${id}`, datos);
  }

  find(id:string = '') {
    return this.apiService.tesoreria.get(this.apiUrl + this.prefix+ `/${this.apiName}/${id}`);
  }

  getAll(size: number = 100, page: number = 1, sortBy:string = 'id', descending:false, keyword:any = '') {
    return this.apiService.tesoreria.get(this.apiUrl + this.prefix+ `/${this.apiName}?size=${size}&page=${page-1}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`);
  }

  delete(id: string | number): Observable<any> {
    return this.apiService.tesoreria.delete(this.apiUrl + this.prefix+ `/${this.apiName}/${id}`);
  }

  habilitar(datos:any,id: string | number): Observable<any> {
    datos['Listado de Tipodato'] = 'habilitar';
    return this.apiService.tesoreria.put(this.apiUrl + this.prefix+ `/${this.apiName}/${datos.id}`, datos);
  }

  deshabilitar(datos:any,id: string | number): Observable<any> {
    datos['Listado de Tipodato'] = 'deshabilitar';
    return this.apiService.tesoreria.put(this.apiUrl + this.prefix+ `/${this.apiName}/${datos.id}`, datos);
  }
}
