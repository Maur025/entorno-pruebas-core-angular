import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, NavigationEnd} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { ConfiguracionesService } from 'src/app/core/services/compras/configuraciones.service';
import { NotificacionService } from '../core/services/notificacion.service';
@Injectable()
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    public notif: NotificacionService,
    public configServices: ConfiguracionesService,
    protected router: Router,
    protected keycloakAngular: KeycloakService)
  {
    super(router, keycloakAngular);
  }


  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    this.configServices.verificarVarConfiguracion();
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

    if (requiredRoles.every((role) => this.roles.includes(role)))
      return true;
    else
      this.router.navigate(['/sinacceso']);
  }

}
