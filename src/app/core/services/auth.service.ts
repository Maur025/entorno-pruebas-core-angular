import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, Log } from '../models/auth.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private logUserSubject: any;
    public logUser: Observable<Log>;
    private logEmpSubject: any;
    public logEmp: Observable<Log>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserKNB')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.logUserSubject = new BehaviorSubject<Log>(JSON.parse(localStorage.getItem('logUserComKNB')));
        this.logUser = this.logUserSubject.asObservable();
    }

    public reload(){

      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserKNB')));
      this.currentUser = this.currentUserSubject.asObservable();
    }
    public  currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public  logUserValue(): User {
        let loguser = JSON.parse(localStorage.getItem('logUserComKNB'));
        if (loguser)
          return loguser;
        return this.logUserSubject.value;
    }

    public getLogUserObservable(): Observable<string> {
        return this.logUserSubject.asObservable();
    }

    public  logEmpValue(): any {
        if(localStorage.getItem('logEmpComKNB')){
            return JSON.parse(localStorage.getItem('logEmpComKNB'));
        }
        return null;
    }

    /**
     * Logout the user
     */
    /*logout() {
        localStorage.clear();
        this.currentUserSubject.next(null);
        window.open(environment.authUrl,"_self");
    }*/

    /*setLog(data:any, user:any){
        localStorage.setItem('logUserComKNB', JSON.stringify(data));
        this.logUserSubject.next(data);
       // this.logUserSubject.complete();
        localStorage.setItem('currentUserKNB', JSON.stringify(user));
        this.currentUserSubject.next(user);
       // this.currentUserSubject.complete();
        console.log("this.logUserSubject",this.logUserSubject);
        console.log("this.logUserSubject.value",this.logUserSubject.value);
        //localStorage.removeItem('logEmpComKNB');
    }*/

    setEmp(data:any){
        localStorage.setItem('logEmpComKNB', JSON.stringify(data));
    }

    removeEmp(){
        localStorage.removeItem('logEmpComKNB');
    }
    public removeDatas(){
        localStorage.clear();
        localStorage.removeItem('logEmpComKNB');
    }
}
