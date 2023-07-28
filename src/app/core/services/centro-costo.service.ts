import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})

export class CentroCostoService{

  contabilidadApiUrl = environment.apiUrlContabilidad;

  constructor(private http: HttpClient){}
  obtener(){
    return this.http.get(this.contabilidadApiUrl+'/centro_costos');
  }

/*   getAll(per_page=1, page=1){
    return this.http.get(this.contabilidadApiUrl+ `/centro_costos?page=${page}&per_page=${per_page}`);
  } */

  getAll(size=1, page=1){
    console.log(this.contabilidadApiUrl+ `/centro_costos?page=${page}&size=${size}`);
    return this.http.get(this.contabilidadApiUrl+ `/centro_costos?page=${page}&size=${size}`);
  }

  register(centro_costo: any){
    return this.http.post(this.contabilidadApiUrl + `/centro_costos`, centro_costo);
  }

  update(centro_costo: any){
    return this.http.put(this.contabilidadApiUrl + `/centro_costos/`+ centro_costo.id, centro_costo);
  }

  delete(centro_costo_id: any){
    return this.http.delete(this.contabilidadApiUrl + `/centro_costos/` + centro_costo_id);
  }

  destroy(id: any){
    return this.http.delete(this.contabilidadApiUrl + `/centroDeCostos/` + id);
  }

  search(size=1, page=1, criterioBuscar: any){
    console.log(this.contabilidadApiUrl+ `/centro_costos?page=${page}&size=${size}&keyword=${criterioBuscar}`);
    return this.http.get(this.contabilidadApiUrl+ `/centro_costos?page=${page}&size=${size}&keyword=${criterioBuscar}`);
  }

  exportarPlantilla(){
    return this.http.get(this.contabilidadApiUrl + `/centroDeCostos/exportar/plantilla`, {responseType: 'blob' as 'json'});
  }

  importarDatos(archivoExcel){
    return this.http.post(this.contabilidadApiUrl + `/centroDeCostos/importar/plantilla`, archivoExcel);
  }
}
