import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentosService {

  contabilidadApiUrl = environment.apiUrlContabilidad;

  constructor(private http: HttpClient) { }

  getAll(size=1, page=1){
    return this.http.get(this.contabilidadApiUrl+ `/tipo_documentos?page=${page}&size=${size}`);
  }

  register(documento){
    return this.http.post(this.contabilidadApiUrl+ `/tipo_documentos`, documento);
  }

  update(documento){
    return this.http.put(this.contabilidadApiUrl+`/tipo_documentos/`+documento.id, documento);
  }

  delete(documento_id){
    return this.http.delete(this.contabilidadApiUrl+`/tipo_documentos/`+documento_id);
  }

  destroy(documento_id){
    return this.http.delete(this.contabilidadApiUrl+`/tipo_documentos/`+documento_id);
  }

  search(size=1, page=1, criterioBuscar: any){
    return this.http.get(this.contabilidadApiUrl+ `/tipo_documentos?page=${page}&size=${size}&keyword=${criterioBuscar}`);
  }
}
