import { Injectable } from "@angular/core";
import * as ApiRutas from "src/assets/config/config.json";
import { Observable, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ConsumerApi } from "./ApiConfigJson/ConsumerApi";

@Injectable({
  providedIn: "root",
})
export class ConsumoApiService {
  /* parametros json */
  public url_json: string = "assets/config/config.json";
  private key_config: string = "configApi";
  private key_compras: string = "comprasApi";
  private key_tesoreria: string = "tesoreriaApi";
  private key_contabilidad: string = "contabilidadApi";
  private key_ventas: string = "ventasApi";

  /*Objetos para peticion*/
  public config: ConsumerApi;
  public compras: ConsumerApi;
  public tesoreria: ConsumerApi;
  public contabilidad: ConsumerApi;
  public ventas: ConsumerApi;

  constructor(private http: HttpClient) {
    this.config = new ConsumerApi(this.http, this.url_json, this.key_config);
    this.compras = new ConsumerApi(this.http, this.url_json, this.key_compras);
    this.tesoreria = new ConsumerApi(
      this.http,
      this.url_json,
      this.key_tesoreria
    );
    this.contabilidad = new ConsumerApi(
      this.http,
      this.url_json,
      this.key_contabilidad
    );
    this.ventas = new ConsumerApi(this.http, this.url_json, this.key_ventas);
  }
}
