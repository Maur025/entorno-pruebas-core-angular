import { Observable } from "rxjs/internal/Observable";


/**
 * interface que se aplica como  servicio genérico en la herramienta tabla para obtener,buscar y filtrar datos
 *
 * @export
 * @interface Apiservicio
 */
export interface Apiservicio {

  getAll(size: number, page: number): Observable<any>;

  register(data: any): Observable<any>;

  delete (id: string|number): Observable<any>;

  update (data: any, id:null|number|null): Observable<any>;

  search(per_page: number, page: number, search: string, orderColumn:string, order:string): Observable<any>;

  filter(filterData, per_page: number, page: number, orderColumn: string, order: string): Observable<any>;

  exportRegister(tipo: any, params: any): Observable<any>;

  importar(datas: any): Observable<any>;
}
