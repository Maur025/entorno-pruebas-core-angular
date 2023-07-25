import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})

/**
 * PAges-404 component
 */
export class Page404Component implements OnInit {

  constructor(
    private readonly keycloak: KeycloakService, ) { }

  ngOnInit(): void {

    let us: any = this.keycloak.getKeycloakInstance().idTokenParsed;
    //console.log("us",us);
  }

}
