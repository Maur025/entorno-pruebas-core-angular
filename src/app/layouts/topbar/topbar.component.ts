import { Component, OnInit, Output, EventEmitter, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
//import { AuthenticationService } from "../../core/services/auth.service";
import { AuthenticationService } from "../../core/services/auth.service";
// import { EntornoService } from "src/app/core/services/backoffice/entorno.service";
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from "src/environments/environment";

import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';


@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  element;
  flagvalue;
  valueset;
  modulo_icon: any;
  usuario_sesion: any;
  logDatos: any;
  usuario_kc :any;
  private empresaDatos = new BehaviorSubject<string>('');

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(
    @Inject(DOCUMENT) private document: any,
    public  authService: AuthenticationService,
    // private entornoService: EntornoService,
    public notif: NotificacionService,
    private readonly keycloak: KeycloakService,
    private auth: AuthenticationService
  ) {
    // this.modulo_icon = this.entornoService
    //   .getModulo()
    //   .subscribe((data) => (this.modulo_icon = data));
    this.usuario_sesion = this.auth.currentUserValue();
    this.authService.getLogUserObservable().subscribe(value => {
      this.logDatos=value;
    });
  }

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  async ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;

    let us: any = this.keycloak.getKeycloakInstance().idTokenParsed;
    //console.log("us",us);
    this.usuario_kc = us;
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    //error en llamar a nombre de empresa, solucionar creando un observable en una nueva variable

  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  irPerfil(){
    window.open(environment.authShareUrl + "perfil");
  }
  /**
   * Logout the user
   */
  logout() {
    //this.authService.logout();
    this.removeDatas();
    this.keycloak.logout();
  }

  removeDatas(){
    localStorage.removeItem('variables_configuracion');
    localStorage.removeItem('digitos_decimales');
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle("fullscreen-enable");
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
