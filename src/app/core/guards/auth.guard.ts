import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { ConfiguracionService } from 'src/app/core/services/inventarios/configuracion.service';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { NotificacionService } from 'src/app/core/services/notificacion.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    public notif: NotificacionService,
    //public configServices: ConfiguracionService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (route.queryParams.token != undefined) {
      localStorage.setItem('currentUserKNB', atob(route.queryParams.token));
      this.authenticationService.reload();
      //window.location.href = environment.appUrl + '';
    }

    const currentUser = this.authenticationService.currentUserValue();
    if (currentUser) {
      // localStorage.removeItem('logUserInvKNB');
      return true;
    }
    //window.open(environment.authUrl, "_self");
    return true;
  }
}
