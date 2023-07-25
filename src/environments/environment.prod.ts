import keycloakConfig from './keycloak.config';
export const environment = {
  production: true,
  tesoreriaApiKerno: 'http://localhost:8082',
  comprasApiKerno: 'http://localhost:8080',
  contabilidadApiKerno: 'http://localhost:8081',
  inventariosApiKerno: 'http://localhost:8000/api/v1',
  authUrl: 'http://localhost:4200/#/account/login?returnUrl='+'http://localhost:4200/#',
  appUrl: 'http://localhost:4200/',
  authShareUrl: 'http://localhost:4200/',
  keycloak: keycloakConfig,
};
