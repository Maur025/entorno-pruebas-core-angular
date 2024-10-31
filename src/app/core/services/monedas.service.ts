import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiServicio } from './apiservicio';


@Injectable({
  providedIn: 'root'
})
export class MonedasService implements ApiServicio {
  getAll(size: number, page: number, sortBy: string, descending: boolean): Observable<any>;
  getAll(size: number, page: number): Observable<any>;
  getAll(size: unknown, page: unknown, sortBy?: unknown, descending?: unknown): Observable<any> {
    throw new Error('Method not implemented.');
  }
  search(size: number, page: number, sortBy: string, descending: boolean, search: string, searchColumns: string): Observable<any>;
  search(per_page: number, page: number, search?: string, orderColumn?: string, order?: string, searchColumns?: string): Observable<any>;
  search(per_page: unknown, page: unknown, search?: unknown, orderColumn?: unknown, order?: unknown, searchColumns?: unknown): Observable<any> {
    throw new Error('Method not implemented.');
  }
  register(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  destroy(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
  update(data: any, id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
