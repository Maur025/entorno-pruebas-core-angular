import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { User, Log } from '../../core/models/auth.models';

@Injectable()
export class AuthService {

  private logUserSubject: any;
  public logUser: Observable<Log>;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private keycloakService: KeycloakService) {
    this.logUserSubject = new BehaviorSubject<Log>(JSON.parse(localStorage.getItem('logUserInvKNB')));
    this.logUser = this.logUserSubject.asObservable();

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserKNB')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.logUserSubject = new BehaviorSubject<Log>(JSON.parse(localStorage.getItem('logUserInvKNB')));
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
    if(localStorage.getItem('logEmpInvKNB')){
        return JSON.parse(localStorage.getItem('logEmpInvKNB'));
    }
    return null;
  }
  setEmp(data:any){
      localStorage.setItem('logEmpInvKNB', JSON.stringify(data));
  }

  public logUserValue(): User {
    let loguser = JSON.parse(localStorage.getItem('logUserInvKNB'));
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
    this.keycloakService.logout(window.location.origin);
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }
}
