import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apiservicio } from './apiservicio';

@Injectable({
  providedIn: 'root'
})
export class ContactosService implements Apiservicio {
  comprasApiKerno = environment.comprasApiKerno;
  datos:any;
  total:number;
  paginaActual = 1;
  porPagina = 10;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.comprasApiKerno + `/contacto?todos=true`);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(this.comprasApiKerno + `/contacto/${id}`);
  }

  search(per_page: number = 1, page: number = 1, search: string = '', orderColumn = 'id', order = 'desc') {
    if(orderColumn == 'id' || !orderColumn){
      order = 'desc'
    }

    return this.http.get(this.comprasApiKerno + `/contacto?pages=${page}&per_page=${per_page}&search=${search}&orderColumn=${orderColumn}&order=${order}`);
  }

  find(id: string | number): Observable<any> {
    return this.http.get(this.comprasApiKerno + `/contacto/${id}`);
  }

  register(data: any) {
    return this.http.post(this.comprasApiKerno + `/contacto`, data);
  }

  exportRegister(tipo: any, params: any){
    return this.http.post(this.comprasApiKerno + `/contacto/reporte/exportar/${tipo}`, params,{responseType: 'blob' as 'json'});
  }

  update(id:any, data: any): Observable<any> {
    return this.http.put(this.comprasApiKerno + `/proveedor/${id}/contacto`, data);
  }

  filter(filterData, per_page: number = 1, page: number = 1, orderColumn = 'id', order = 'desc') {
    return this.http.get(this.comprasApiKerno + `/contacto?page=${page}&per_page=${per_page}&filtro=true&orderColumn=${orderColumn}&order=${order}&datos=` + JSON.stringify(filterData));
  }
  exportar() {
    return this.http.get(this.comprasApiKerno + `/contacto/exportar/plantilla`,{responseType: 'blob' as 'json'});
  }

  importar(data: any) {
    return this.http.post(this.comprasApiKerno + `/contacto/importar/plantilla`, data);
  }
}
