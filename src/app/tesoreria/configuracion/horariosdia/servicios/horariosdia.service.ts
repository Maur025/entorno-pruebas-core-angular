import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HorariosdiaService {
  apiUrl = environment.apiUrl ;
  apiName = 'horarios_dia';
  prefix = '';
  isFake=true;
  fakeData:any = {
    content : [],
    pagination:{
      "pages": 1,
      "rowsNumber": 0
    }
  };
  constructor(private http: HttpClient) { }

  setPrefix(prefix: string){
    this.prefix = prefix;
  }

  register(datos:any): Observable<any> {
    if (this.isFake) return new Observable<any>((observer) => {
      this.fakeData.content.push(datos);
      this.fakeData.pagination.rowsNumber = this.fakeData.content.count;
      observer.next(datos);
      observer.complete();
    });
    else return this.http.post(this.apiUrl + this.prefix+ `/${this.apiName}`, datos);
  }

  update(datos: any, id: any): Observable<any> {
    return this.http.put(this.apiUrl + this.prefix+ `/${this.apiName}/${id}`, datos);
  }

  find(id:string = '') {
    return this.http.get(this.apiUrl + this.prefix+ `/${this.apiName}/${id}`);
  }

  getAll(size: number = 100, page: number = 1, sortBy:string = 'id', descending:false, keyword:any = '') {
    if (this.isFake) return new Observable((observer) => {
      console.log("obteniendo");
      observer.next(this.fakeData);
      observer.complete();
    });
    else return this.http.get(this.apiUrl + this.prefix+ `/${this.apiName}?size=${size}&page=${page-1}&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(this.apiUrl + this.prefix+ `/${this.apiName}/${id}`);
  }

  habilitar(datos:any,id: string | number): Observable<any> {
    datos['Listado de Horarios'] = 'habilitar';
    return this.http.put(this.apiUrl + this.prefix+ `/${this.apiName}/${datos.id}`, datos);
  }

  deshabilitar(datos:any,id: string | number): Observable<any> {
    datos['Listado de Horarios'] = 'deshabilitar';
    return this.http.put(this.apiUrl + this.prefix+ `/${this.apiName}/${datos.id}`, datos);
  }
}
