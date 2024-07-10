import { IConsumer } from "./IConsumer";
import { Observable, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
export class ConsumerApi implements IConsumer {
  public key_json: string;
  public url_json: string;
  constructor(private http: HttpClient, url_json: string, key_json: string,) {
    this.key_json = key_json;
    this.url_json = url_json;
  }
  delete(url: string, params: any = []): Observable<any> {
    return this.getConfig().pipe(switchMap((data) => this.http.delete(`${this.getURI(data)}${url}`, params)));
  }
  get(url: string, params: any = []): Observable<any> {
    return this.getConfig().pipe(switchMap((data) => this.http.get(`${this.getURI(data)}${url}`, params)));
  }
  post(url: string, params: any = []): Observable<any> {
    return this.getConfig().pipe(switchMap((data) => this.http.post(`${this.getURI(data)}${url}`, params)));
  }
  put(url: string, params: any = []): Observable<any> {
    return this.getConfig().pipe(switchMap((data) => this.http.put(`${this.getURI(data)}${url}`, params)));
  }
  patch(url: string, params: any = []): Observable<any> {
		return this.getConfig().pipe(switchMap(data =>this.http?.patch(`${data[this.key_json]}${url}`, params)))
  }
  private getConfig(): Observable<any> {
    return this.http.get<any>(this.url_json);
  }
  private getURI(data: any) {
    let path = data[this.key_json];
    if (!environment.production) {
      path = path.substring(path.search('/api/'),path.length);
    }
    return path;
  }

}
