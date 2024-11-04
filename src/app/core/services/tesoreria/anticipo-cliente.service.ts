import { Injectable } from "@angular/core";
import { ConsumoApiService } from "../consumoApi.service";

@Injectable({
  providedIn: "root",
})
export class AnticipoClienteService {
  constructor(private apiService: ConsumoApiService) {}
  apiName: string = "anticipos-cliente";
  apiUrl: string = "";
  prefix: string = "";

  getAll(
    size: number = 100,
    page: number = 1,
    sortBy: string = "id",
    descending: false,
    keyword: any = ""
  ) {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}?size=${size}&page=${
        page - 1
      }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  }

  crearAnticipo(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}`,
      datos
    );
  }

  crearDevolucionAnticipo(datos: any) {
    return this.apiService.tesoreria.post(
      `${this.apiUrl}${this.prefix}/${this.apiName}/devoluciones`,
      datos
    );
  }

  findAnticipoCliente(
    size: number = 100,
    page: number = 1,
    sortBy: string = "id",
    descending: false,
    keyword: any = "",
    clienteId
  ) {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/con-saldo/${clienteId}?size=${size}&page=${
        page - 1
      }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  }


  importarSaldosIniciales(file) {
    return this.apiService.tesoreria.post(
      this.prefix + `/${this.apiName}/importar/saldos-iniciales`,
      file
    );
  }

  generarComprobante(id: any) {
		return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/${id}/pdf`
		)
	}

  generarComprobanteDevolucion(id: any) {
		return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/devoluciones/${id}/pdf`
		)
	}
}
