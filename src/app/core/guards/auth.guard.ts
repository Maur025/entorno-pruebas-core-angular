import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue();
    console.log("currentUser", currentUser);
   /*  if (currentUser != null) {
      console.log("verificando modulo y gestión");

      let gestionActualKNB = localStorage.getItem("gestionActualKNB");
      if (gestionActualKNB != null) {

        return true;
      } else {
        //recargando gestion
        this.authenticationService.verificarSeleccion().subscribe((result: any) => {
          console.log("result", result);
          if (result.data.modulo == null) {
            this.router.navigate(['/auth/eligeempresa']);
            return false;
          } else {
            return true;
          }
        });
        return true;
      }
    } else {
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    } */



    //window.open(environment.authUrl,"_self");
    return false;
  }
}
