import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/**
 * Servicio temporal hasta tener el de backend
 *
 * @export
 * @class PaisesService
 */
@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  public paisesT:any;

  constructor(private http:HttpClient) {
    this.getJSON().subscribe(data => {
      this.paisesT = data;
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/data/countries.json");
  }

  public obtenerTodo(){
    return this.http.get("./assets/data/countries.json");
  }
}
