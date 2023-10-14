import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsumoApiService } from './consumoApi.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentosService {

  contabilidadApiUrl = '';

  constructor(private http: HttpClient,private apiService:ConsumoApiService) { }

  getAll(size=1, page=1){
    return this.apiService.tesoreria.get(this.contabilidadApiUrl+ `/tipo_documentos?page=${page}&size=${size}`);
  }

  register(documento){
    return this.apiService.tesoreria.post(this.contabilidadApiUrl+ `/tipo_documentos`, documento);
  }

  update(documento){
    return this.apiService.tesoreria.put(this.contabilidadApiUrl+`/tipo_documentos/`+documento.id, documento);
  }

  delete(documento_id){
    return this.apiService.tesoreria.delete(this.contabilidadApiUrl+`/tipo_documentos/`+documento_id);
  }

  destroy(documento_id){
    return this.apiService.tesoreria.delete(this.contabilidadApiUrl+`/tipo_documentos/`+documento_id);
  }

  search(size=1, page=1, criterioBuscar: any){
    return this.apiService.tesoreria.get(this.contabilidadApiUrl+ `/tipo_documentos?page=${page}&size=${size}&keyword=${criterioBuscar}`);
  }
}
