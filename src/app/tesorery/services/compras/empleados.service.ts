import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsumoApiService } from 'src/app/core/services/consumoApi.service';


@Injectable({
    providedIn: 'root'
  })
  export class EmpleadosService {

    apiName:string = 'empleado';
    entitys:string = 'Bancos';
    apiUrl:string = '' ;
    prefix:string = '';
    constructor(private http: HttpClient, private apiService : ConsumoApiService) { }

    setPrefix(prefix: string){
      this.prefix = prefix;
    }

    searchEmpleado(keyword :any ){
      return this.apiService.compras.get(`${this.apiUrl}${this.prefix}/${this.apiName}/search?keyword=${keyword}`);
    }
  }
