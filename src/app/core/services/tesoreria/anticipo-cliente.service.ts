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

  getListClientes(
    size: number = 100,
    page: number = 1,
    sortBy: string = "id",
    descending: false,
    keyword: any = ""
  ) {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/listar-clientes?size=${size}&page=${
        page - 1
      }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  }

  getListAnticipoClientes(
    size: number = 100,
    page: number = 1,
    sortBy: string = "id",
    descending: false,
    keyword: any = "",
    clienteId: number | string,
  ) {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/anticipos/${clienteId}?size=${size}&page=${
        page - 1
      }&sortBy=${sortBy}&descending=${descending}&keyword=${keyword}`
    );
  }

  detalleAnticipoCliente(
    size: number = 20,
    page: number = 0,
    descending: boolean = true,
    anticipoClienteId
  ) {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;

    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/detalle/${anticipoClienteId}
      ?page=${page - 1}&size=${size}&descending=${descending}`
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
    descending: boolean,
    keyword: any = "",
    clienteId
  ) {
    size = size <= 0 ? 100 : size;
    page = page <= 0 ? 1 : page;
    return this.apiService.tesoreria.get(
      `${this.apiUrl}${this.prefix}/${this.apiName}/con-saldo/${clienteId}?size=${size}&page=${
        page - 1
      }&descending=${descending}&keyword=${keyword}`
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
