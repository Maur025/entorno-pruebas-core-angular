import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { User, Log } from '../../core/models/auth.models';
import { ConfiguracionesService } from 'src/app/core/services/compras/configuraciones.service';

@Injectable()
export class AuthService {

  private logUserSubject: any;
  public logUser: Observable<Log>;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private keycloakService: KeycloakService,
    private configuracionesService: ConfiguracionesService,
  ){
    this.logUserSubject = new BehaviorSubject<Log>(JSON.parse(localStorage.getItem('logUserComKNB')));
    this.logUser = this.logUserSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserKNB')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.logUserSubject = new BehaviorSubject<Log>(JSON.parse(localStorage.getItem('logUserComKNB')));
    this.logUser = this.logUserSubject.asObservable();
  }

  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      const userDetails: KeycloakTokenParsed | undefined = this.keycloakService.getKeycloakInstance()
        .idTokenParsed;
      return userDetails;
    } catch (e) {
      console.error("Exception", e);
      return undefined;
    }
  }

  public  logEmpValue(): any {
    if(localStorage.getItem('logEmpComKNB')){
        return JSON.parse(localStorage.getItem('logEmpComKNB'));
    }
    return null;
  }
  setEmp(data:any){
      localStorage.setItem('logEmpComKNB', JSON.stringify(data));
  }

  public logUserValue(): User {
    let loguser = JSON.parse(localStorage.getItem('logUserComKNB'));
    if (loguser)
      return loguser;
    return this.logUserSubject.value;
  }

  public isLoggedIn() : Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile() : Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile();
  }

  public login() : void {
    this.keycloakService.login();
  }

  public logout() : void {
    localStorage.removeItem('variables_configuracion');
    localStorage.removeItem('digitos_decimales');
    this.keycloakService.logout(window.location.origin);
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }
}
