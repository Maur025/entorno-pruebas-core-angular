import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apiservicio } from './apiservicio';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService implements Apiservicio {
  comprasApiKerno = environment.comprasApiKerno;
  datos:any;
  total:number;
  paginaActual = 1;
  porPagina = 10;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.comprasApiKerno + `/proveedor`);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(this.comprasApiKerno + `/proveedor/${id}/contacto`);
  }

  search(size: number = 10, page: number = 0, search: string = '', orderColumn = 'id', order = 'desc') {
    if(orderColumn == 'id' || !orderColumn){
      order = 'desc'
    }

    return this.http.get(this.comprasApiKerno + `/proveedor?page=${page-1}&size=${size}&sortBy=${orderColumn}&descending=false&keyword=${search}`);
  }

  find(id: string | number): Observable<any> {
    return this.http.get(this.comprasApiKerno + `/proveedor/${id}`);
  }

  register(data: any) {
    return this.http.post(this.comprasApiKerno + `/proveedor`, data);
  }

  exportRegister(tipo: any, params: any){
    return this.http.post(this.comprasApiKerno + `/proveedor/reporte/exportar/${tipo}`, params,{responseType: 'blob' as 'json'});
  }

  update(data: any): Observable<any> {
    return this.http.put(this.comprasApiKerno + `/proveedor/${data.id}`, data);
  }

  filter(filterData, per_page: number = 1, page: number = 1, orderColumn = 'id', order = 'desc') {
    return this.http.get(this.comprasApiKerno + `/proveedor?page=${page}&size=${per_page}&filtro=true&sortBy=${orderColumn}&descending=false&order=${order}&datos=` + JSON.stringify(filterData));
  }
  exportar() {
    return this.http.get(this.comprasApiKerno + `/proveedor/exportar/plantilla`,{responseType: 'blob' as 'json'});
  }

  importar(data: any) {
    return this.http.post(this.comprasApiKerno + `/proveedor/importar/plantilla`, data);
  }

  habilitar(id: string | number){
    return this.http.get(this.comprasApiKerno + `/proveedor/habilita/${id}`);
  }
  registerContacto(id:any, data: any) {
    return this.http.post(this.comprasApiKerno + `/proveedor/${id}/contacto`, data);
  }

  registerProveedorContactos(data: any) {
    return this.http.post(this.comprasApiKerno + `/proveedor/contacto`, data);
  }
  getListaProveedores() {
    return this.http.get(this.comprasApiKerno + `/proveedor/habilitados`);
  }
  updateContato(id: any,data: any): Observable<any> {
    return this.http.put(this.comprasApiKerno + `/proveedor/${id}/contacto`, data);
  }
  habilitarContacto(id: string | number){
    return this.http.get(this.comprasApiKerno + `/proveedor/contacto/habilita/${id}`);
  }
}
