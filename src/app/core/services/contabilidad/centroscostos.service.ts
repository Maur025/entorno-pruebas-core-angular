import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentrosCostosService {
  contabilidadApiKerno = environment.contabilidadApiKerno;

  constructor(private http: HttpClient) { }

  getCentroCostos() {
    return this.http.get(this.contabilidadApiKerno + `/centro_costos/listado`);
  }
}
