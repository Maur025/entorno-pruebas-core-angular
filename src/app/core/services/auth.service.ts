import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { Auth } from '../models/auth.models';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  /* auth service cuando esta con la autenticacion de laravel */
  contabilidadApiUrl = 'cambiar_ruta_por_la_url_enviroment';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserKNB')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(email: string, password: string) {
    return this.http.post<any>(this.contabilidadApiUrl + `/login`, { email, password })
      .pipe(map(user => {
        if (user && user.authorisation && user.status == 'success') {
          localStorage.setItem('currentUserKNB', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(email: string, password: string) {
    // return getFirebaseBackend().registerUser(email, password).then((response: any) => {
    //     const user = response;
    //     return user;
    // });
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    // return getFirebaseBackend().forgetPassword(email).then((response: any) => {
    //     const message = response.data;
    //     return message;
    // });
  }
  updateUserLocal(name, email) {
    let local = this.currentUserSubject.value;
    let usuario = {
      status: local['status'],
      user: {
        id: local['user']['id'],
        name: name,
        email: email,
        estado: local['user']['estado'],
        nombre_completo: local['user']['nombre_completo'],
        nro_documento: local['user']['nro_documento'],
      },

      authorisation: {
        token: local['authorisation']['token'],
        type: local['authorisation']['type']
      }
    }
    localStorage.setItem('currentUserKNB', JSON.stringify(usuario));
  }
  /**
   * Logout the user
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserKNB');
    localStorage.removeItem('gestionActualKNB');
    this.currentUserSubject.next(null);
    /* window.open(environment.authAppUrl, "_self"); */ //crear otro authAppUrl que sea con el keycloak
  }
}
