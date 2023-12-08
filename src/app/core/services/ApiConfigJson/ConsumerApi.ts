import {IConsumer} from "./IConsumer";
import {Observable, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
export class ConsumerApi implements IConsumer {
  public key_json: string;
  public url_json: string;
  constructor(private http: HttpClient,url_json:string,key_json:string,) {
    this.key_json=key_json;
    this.url_json=url_json;
  }
  delete(url: string, params: any=[]): Observable<any> {
    return this.getConfig().pipe(switchMap((data) => this.http.delete(data[this.key_json] + `${url}`, params)));
  }
  get(url: string, params: any=[]): Observable<any> {
    return this.getConfig().pipe(switchMap((data) => this.http.get(data[this.key_json] + `${url}`, params)));
  }
  post(url: string, params: any=[]): Observable<any> {
    return this.getConfig().pipe(switchMap((data) => this.http.post(data[this.key_json] + `${url}`, params)));
  }
  put(url: string, params: any=[]): Observable<any> {
    return this.getConfig().pipe(switchMap((data) => this.http.put(data[this.key_json] + `${url}`, params)));
  }
  private getConfig(): Observable<any> {
    return this.http.get<any>(this.url_json);
  }

}