import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ConsumoApiService } from "./consumoApi.service";

@Injectable({providedIn: 'root'})

export class CentroCostoService{

  contabilidadApiUrl = '';

  constructor(private http: HttpClient,private apiService:ConsumoApiService){

  }

  obtener(){
    return this.apiService.tesoreria.get(this.contabilidadApiUrl+'/centro_costos');
  }

  getAll(size=1, page=1){
    console.log(this.contabilidadApiUrl+ `/centro_costos?page=${page}&size=${size}`);
    return this.apiService.tesoreria.get(this.contabilidadApiUrl+ `/centro_costos?page=${page}&size=${size}`);
  }

  register(centro_costo: any){
    return this.apiService.tesoreria.post(this.contabilidadApiUrl + `/centro_costos`, centro_costo);
  }

  update(centro_costo: any){
    return this.apiService.tesoreria.put(this.contabilidadApiUrl + `/centro_costos/`+ centro_costo.id, centro_costo);
  }

  delete(centro_costo_id: any){
    return this.apiService.tesoreria.delete(this.contabilidadApiUrl + `/centro_costos/` + centro_costo_id);
  }

  destroy(id: any){
    return this.apiService.tesoreria.delete(this.contabilidadApiUrl + `/centroDeCostos/` + id);
  }

  search(size=1, page=1, criterioBuscar: any){
    console.log(this.contabilidadApiUrl+ `/centro_costos?page=${page}&size=${size}&keyword=${criterioBuscar}`);
    return this.apiService.tesoreria.get(this.contabilidadApiUrl+ `/centro_costos?page=${page}&size=${size}&keyword=${criterioBuscar}`);
  }

  exportarPlantilla(){
    return this.apiService.tesoreria.get(this.contabilidadApiUrl + `/centroDeCostos/exportar/plantilla`, {responseType: 'blob' as 'json'});
  }

  importarDatos(archivoExcel){
    return this.apiService.tesoreria.post(this.contabilidadApiUrl + `/centroDeCostos/importar/plantilla`, archivoExcel);
  }
}
