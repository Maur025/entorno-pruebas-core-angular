import { Observable } from "rxjs";

export interface IConsumer {
    get(url: string, params: any): Observable<any>;
    post(url: string, params: any): Observable<any>;
    put(url: string, params: any): Observable<any>;
    delete(url: string, params: any): Observable<any>;

}