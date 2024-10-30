import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, NavigationEnd} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { NotificacionService } from '../core/services/notificacion.service';
import { AuthService } from './service/auth.service';
@Injectable()
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    public notif: NotificacionService,
    protected router: Router, private authService:AuthService, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }


  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (!this.authenticated) {
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const requiredRoles = route.data.roles;
      //console.log("requiredRoles", requiredRoles);
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    //console.log("kc roles",this.roles);
    if (requiredRoles.every((role) => this.roles.includes(role)))
      return true;
    else
      this.router.navigate(['/sinacceso']);
  }

}
