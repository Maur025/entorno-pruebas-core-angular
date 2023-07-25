import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/**
 * Servicio temporal hasta tener el de backend
 *
 * @export
 * @class CiudadesService
 */
@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  public datos: any = [];
  datosArray: any = [];
  cargado = false;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.datos = [];
      this.datosArray= data;
      data.states.forEach((e,i)=>{
        this.datos[e.id] = e.name;
      });
      this.cargado = true;
    });
  }

  public getArray() {
    return new Promise((resolve,reject) => {
      this.obtenerTodo().subscribe(data => {
        resolve(data);
      });
    });
  }

  public getCiudad(id: number) {
    if (this.datos.length > 0)
      return this.datos[id];
    return id;
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/data/states.json");
  }

  obtenerTodo() {
    return this.http.get("./assets/data/states.json");
  }
}
