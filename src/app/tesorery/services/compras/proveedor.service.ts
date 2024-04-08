import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service';


@Injectable({
    providedIn: 'root'
  })
  export class ProveedorService {

    apiName:string = 'proveedor';
    entitys:string = 'Proveedor';
    apiUrl:string = '' ;
    prefix:string = '';
    constructor(private http: HttpClient, private apiService : ConsumoApiService) { }

    setPrefix(prefix: string){
      this.prefix = prefix;
    }

    searchProveedor(keyword :any ){
      return this.apiService.compras.post(`${this.apiUrl}${this.prefix}/${this.apiName}/filter`, {keyword:keyword});
    }

    habilitados(){
      return this.apiService.compras.get(`${this.apiUrl}${this.prefix}/${this.apiName}/habilitados`);
    }

  }
