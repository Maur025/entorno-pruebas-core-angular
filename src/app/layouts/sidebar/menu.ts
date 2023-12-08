import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [

{
    id: 1,
    label: 'Solicitudes',
    link : 'solicitudes',
    icon: 'fas fa-file-import',
},




{
    id: 1,
    label: 'Documentos Registrados',
    link : 'documento',
    icon: 'fas fa-file-alt',
},

{
  id: 10,
  label: 'Fondos',
  icon: 'fas fa-balance-scale-right',
  subItems : [
    {
      id: 11,
      label: 'Administrar Fondos',
      link : 'fondo',
      icon: 'fas fa-landmark',
    },
    {
      id: 12,
      label: 'Tipos de Fondo',
      link : 'fondotipo',
      icon: 'fas fa-calendar-check',
    },
  ]
},
{
  id: 20,
  label: 'Créditos',
  icon: 'fas fa-money-bill-wave',
  subItems : [
    {
        id: 21,
        label: 'Créditos',
        link : 'credito',
        icon: 'far fa-handshake',
    },
    {
        id: 22,
        label: 'Pagos',
        link : 'pagos',
        icon: 'fas fa-hand-holding-usd',
    },
    {
        id: 23,
        label: 'Cobros',
        link : 'cobros',
        icon: 'fas fa-hand-holding-usd',
    },
    {
        id: 24,
        label: 'Cuentas de deudores',
        link : 'deudorcuenta',
        icon: 'fas fa-user-tie',
    },

    {
        id: 25,
        label: 'Cuentas de Acreedores',
        link : 'acreedorcuenta',
        icon: 'fas fa-user-check',
    },


  ]
},
{
  id: 30,
  label: 'Cajas',
  icon: 'fas fa-kaaba',
  subItems : [
    {
        id: 31,
        label: 'Horarios',
        link : 'horarios',
        icon: 'fas fa-calendar-alt',
    },
    {
        id: 32,
        label: 'Administrar Cajas',
        link : 'caja',
        icon: 'fas fa-laptop-house',
    },

  ]
},
{
  id: 40,
  label: 'Bancos',
  icon: 'fas fa-kaaba',
  subItems : [

    {
      id: 41,
      label: 'Administrar bancos',
      link : 'banco',
      icon: 'fas fa-building',
    },

  ]
},
{
  id: 70,
  label: 'Movimientos',
  icon: 'fas fa-exchange-alt',
  subItems :[

    {
      id: 1,
      label: 'Anticipos',
      link : 'anticipo',
      icon: 'fas fa-edit',
    },

    {
      id: 1,
      label: 'Movimientos de Cuenta',
      link : 'movimientocuenta',
      icon: 'fas fa-exchange-alt',
    },

  ]
},
{
  id: 50,
  label: 'Configuración',
  icon: 'fas fa-tools',
  subItems : [
    {
        id: 51,
        label: 'Monedas',
        link : 'moneda',
        icon: 'fas fa-money-bill',
    },
    {
        id: 52,
        label: 'Formas de Pago',
        link : 'formapago',
        icon: 'fas fa-hand-holding-usd',
    },
    {
        id: 53,
        label: 'Medios de transferencia',
        link : 'mediotransferencia',
        icon: 'fas fa-exchange-alt',
    },
    {
        id: 54,
        label: 'Vías',
        link : 'vias',
        icon: 'fas fa-code-branch',
    },
      {
        id: 55,
        label: 'Tipos de pago',
        link : 'tipopago',
        icon: 'fas fa-money-check-alt',
    },
    {
        id: 56,
        label: 'Deudores',
        link : 'deudor',
        icon: 'fas fa-user-tag',
    },

    {
        id: 57,
        label: 'Acreedores',
        link : 'acreedor',
        icon: 'fas fa-user-tag',
    },
    {
        id: 58,
        label: 'Grupo de Contactos',
        link : 'grupo',
        icon: 'fas fa-users',
    },
    {
        id: 59,
        label: 'Contactos',
        link : 'contacto',
        icon: 'fas fa-address-card',
    },
    {
        id: 510,
        label: 'Tipo de Interés',
        link : 'tipointeres',
        icon: 'fas fa-percentage',
    },
    {
        id: 511,
        label: 'Formas de Cobro',
        link : 'formacobro',
        icon: 'far fa-dot-circle',
    },
    {
        id: 512,
        label: 'Tipo de Documento',
        link : 'documentotipo',
        icon: 'fas fa-newspaper',
    },
    {
        id: 513,
        label: 'tipodecuenta',
        link : 'tipodecuenta',
        icon: 'fas fa-bookmark',
    },
    {
        id: 514,
        label: 'Cuentas',
        link : 'cuenta',
        icon: 'fas fa-book-open',
    },
    {
        id: 515,
        label: 'Usuarios',
        link : 'usuarios',
        icon: 'fas fa-user-friends',
    },
    {
        id: 516,
        label: 'Tipo de Solicitudes',
        link : 'tiposolicitud',
        icon: 'far fa-file-alt',
    },
    {
        id: 517,
        label: 'Centros de Costos',
        link : 'centrodecostos',
        icon: 'fas fa-city',
    },






  ]
},
{
  id: 60,
  label: 'Parámetros',
  icon: 'fas fa-wrench',
  subItems : [
    {
        id: 61,
        label: 'Variables de Configuración',
        link : 'variablesconfiguracion',
        icon: 'fas fa-list-ul',
    },
    {
        id: 62,
        label: 'Tipos de Datos',
        link : 'tipodato',
        icon: 'fas fa-dice-d6',
    },
    {
        id: 63,
        label: 'Tipos de Entidad',
        link : 'tipoentidad',
        icon: 'fas fa-id-card',
    },
    {
        id: 64,
        label: 'Entidades',
        link : 'entidades',
        icon: 'fas fa-users-cog',
    },
    {
        id: 65,
        label: 'Tipos de Identificación',
        link : 'tipoidentificacion',
        icon: 'far fa-credit-card',
    },
    {
        id: 66,
        label: 'Estado de Créditos',
        link : 'estadocredito',
        icon: 'fas fa-ellipsis-h',
    },
    {
        id: 67,
        label: 'Tipo de movimiento',
        link : 'tipomovimiento',
        icon: 'fas fa-reply-all',
    },


  ]
},
/*
{
  id: 90,
  label: 'Dependencias',
  subItems : [
    {
        id: 91,
        label: 'Cuotas Tiempo',
        link : 'cuotastiempo',
        icon: 'fas fa-angle-double-right',
    },
    {
        id: 92,
        label: 'Tiempo-Interés',
        link : 'tiempointeres',
        icon: 'fas fa-clock',
    },
    {
        id: 93,
        label: 'Pagos - Medios de transferencia',
        link : 'tipopagomedios',
        icon: 'fas fa-money-bill-wave',
    },
    {
        id: 94,
        label: 'Tipo de Pago - Via',
        link : 'tipopagovia',
        icon: 'fas fa-money-bill',
    },
    {
        id: 95,
        label: 'Tipos de Entidad - Entidades',
        link : 'entidadestipoentidad',
        icon: 'fas fa-user-friends',
    },
    {
        id: 96,
        label: 'Contacto - Grupo',
        link : 'contactogrupo',
        icon: 'fas fa-user-friends',
    },
    {
        id: 97,
        label: 'Crédito - Estado',
        link : 'creditoestado',
        icon: 'fas fa-spell-check',
    },
    {
        id: 98,
        label: 'Crédito - Pagos',
        link : 'creditopagos',
        icon: 'far fa-handshake',
    },
    {
        id: 99,
        label: 'Tipo de Cobro - Via',
        link : 'tipocobrovia',
        icon: 'fas fa-hand-holding-usd',
    },
    {
        id: 910,
        label: 'Tipo de Cobro - Medios',
        link : 'tipocobromedios',
        icon: 'fas fa-hand-point-left',
    },
    {
        id: 911,
        label: 'Fondo - Responsables',
        link : 'fondoresponsables',
        icon: 'fas fa-user-check',
    },
    {
        id: 912,
        label: 'Fondo - Forma de cobro',
        link : 'fondoformacobro',
        icon: 'fab fa-cc-amex',
    },
    {
        id: 913,
        label: 'Fondo - Centro de Costos',
        link : 'fondocentrodecostos',
        icon: 'fas fa-building',
    },
    {
        id: 914,
        label: 'Días',
        link : 'dias',
        icon: 'fas fa-calendar',
    },
    {
        id: 915,
        label: 'Horarios - Días',
        link : 'horariosdia',
        icon: 'fas fa-calendar-check',
    },
    {
        id: 916,
        label: 'Horarios - Cajas',
        link : 'cajahorarios',
        icon: 'fas fa-user-tie',
    },
    {
        id: 917,
        label: 'Banco - Medios de Transferencia',
        link : 'bancomediostransferencia',
        icon: 'fas fa-arrows-alt-h',
    },
    {
        id: 918,
        label: 'Líneas de créditos - banco',
        link : 'lineacreditobanco',
        icon: 'far fa-credit-card',
    },
    {
        id: 919,
        label: 'Banco - Cuentas',
        link : 'cuentabanco',
        icon: 'fas fa-university',
    },
    {
        id: 920,
        label: 'Banco - Contactos',
        link : 'contactobanco',
        icon: 'fas fa-city',
    },
    {
        id: 921,
        label: 'Anticipo - movimiento cuenta',
        link : 'anticipomovimientocuenta',
        icon: 'fas fa-arrows-alt-v',
    },
    {
        id: 922,
        label: 'Medio - Forma de Pago',
        link : 'medioformapago',
        icon: 'far fa-credit-card',
    },

    {
        id: 923,
        label: 'Caja - banco - transferencia',
        link : 'cajabancotransferencia',
        icon: 'fas fa-hotel',
    },

    {
        id: 924,
        label: 'Caja - banco - Medio',
        link : 'cajabancomedio',
        icon: 'fas fa-hotel',
    },
  ]
},
*/

];
