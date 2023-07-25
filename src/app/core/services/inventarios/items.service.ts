import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  inventarioApiKerno = environment.inventariosApiKerno;
  datos:any;
  total:number;
  paginaActual = 1;
  porPagina = 10;

  constructor(private http: HttpClient) { }

  buscarPorCodigoNombre(filterText) {
    return this.http.get(this.inventarioApiKerno + `/items/buscar?search=${filterText}`);
  }
}
