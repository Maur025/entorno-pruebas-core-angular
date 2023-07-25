/**
 * Here you can add the configuration related to keycloak
 * So we can use this common config for diffrent environment
 */
import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'https://sandbox-id.kernotec.com/',
  //url: 'http://172.20.50.60:8080/',
  realm: 'kernobi',
  clientId: 'kbi-compras-ui',
};

export default keycloakConfig;
