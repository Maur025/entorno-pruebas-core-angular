import keycloakConfig from './keycloak.config';

export const environment = {
  production: true,
  appUrl: 'https://sandbox-kbi-empresa.kernotec.com/contabilidad/#/',
  apiUrlContabilidad :'http://localhost:8080',
  defaultUrl:'',
  keycloak: keycloakConfig
};
