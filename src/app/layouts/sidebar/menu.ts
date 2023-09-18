import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
{
    id: 1,
    label: 'Pagos',
    link : 'parametros/pagos',
    icon: 'fas fa-hand-holding-usd',
},

{
    id: 1,
    label: 'Créditos',
    link : 'parametros/credito',
    icon: 'far fa-handshake',
},

{
    id: 1,
    label: 'Crédito - Pagos',
    link : 'parametros/creditopagos',
    icon: 'far fa-handshake',
},

{
    id: 1,
    label: 'Crédito - Estado',
    link : 'parametros/creditoestado',
    icon: 'fas fa-spell-check',
},

{
    id: 1,
    label: 'Tiempo-Interés',
    link : 'parametros/tiempointeres',
    icon: 'fas fa-clock',
},
{
    id: 1,
    label: 'Tipo de Interés',
    link : 'parametros/tipointeres',
    icon: 'fas fa-percentage',
},

{
    id: 1,
    label: 'Contacto - Grupo',
    link : 'parametros/contactogrupo',
    icon: 'fas fa-user-friends',
},

{
    id: 1,
    label: 'Contactos',
    link : 'parametros/contacto',
    icon: 'fas fa-address-card',
},

{
    id: 1,
    label: 'Grupo de Contactos',
    link : 'parametros/grupo',
    icon: 'fas fa-users',
},

{
    id: 1,
    label: 'Entidades',
    link : 'parametros/entidades',
    icon: 'fas fa-users-cog',
},

{
    id: 1,
    label: 'Deudores',
    link : 'parametros/deudor',
    icon: 'fas fa-user-tag',
},

{
    id: 1,
    label: 'Acreedores',
    link : 'parametros/acreedor',
    icon: 'fas fa-user-tag',
},

{
    id: 1,
    label: 'Tipos de Identificación',
    link : 'parametros/tipoidentificacion',
    icon: 'far fa-credit-card',
},

{
    id: 1,
    label: 'Tipos de Entidad',
    link : 'parametros/entidadestipoentidad',
    icon: 'fas fa-user-friends',
},



{
    id: 1,
    label: 'Tipo de Pago - Via',
    link : 'parametros/tipopagovia',
    icon: 'fas fa-money-bill',
},

{
    id: 1,
    label: 'Tipos de pago',
    link : 'parametros/tipopago',
    icon: 'fas fa-money-check-alt',
},

{
    id: 1,
    label: 'Pagos - Medios de transferencia',
    link : 'parametros/tipopagomedios',
    icon: 'fas fa-money-bill-wave',
},

{
    id: 1,
    label: 'Tipos de pago',
    link : 'parametros/tipopago',
    icon: 'far fa-dot-circle',
},

{
    id: 1,
    label: 'Vías de Pago',
    link : 'parametros/vias',
    icon: 'far fa-dot-circle',
},

{
    id: 1,
    label: 'Medios de transferencia',
    link : 'parametros/mediotransferencia',
    icon: 'fas fa-exchange-alt',
},

{
    id: 1,
    label: 'Formas de Pago',
    link : 'parametros/formapago',
    icon: 'fas fa-hand-holding-usd',
},


{
    id: 1,
    label: 'Cuotas Tiempo',
    link : 'parametros/cuotastiempo',
    icon: 'fas fa-wrench',
},

{
    id: 1,
    label: 'Monedas',
    link : 'configuracion/moneda',
    icon: 'fas fa-money-check-alt',
},

{
    id: 1,
    label: 'Variables de Configuración',
    link : 'parametros/variablesconfiguracion',
    icon: 'fas fa-list-ul',
},

{
    id: 31,
    label: 'Tipos de Datos',
    link : 'parametros/tipodato',
    icon: 'fas fa-dice-d6',
},
/*
{
    id: 2,
    label: 'actividadeconomica',
    link : 'actividadeconomica',
    icon: 'bx-home-circle',
},

{
    id: 2,
    label: 'tipodedato',
    link : 'tipodedato',
    icon: 'bx-home-circle',
},


{
    id: 2,
    label: 'Bancos',
    link : 'banco',
    icon: 'bx-home-circle',
},
{
    id: 2,
    label: 'Líneas de créditos',
    link : 'configuracion/lineacredito',
    icon: 'bx-home-circle',
},
{
  id: 2,
  label: "Créditos",
  link: "configuracion/credito",
  icon: "bx-home-circle",
},
{
  id: 3,
  label: "Procedimientos",
  link: "procedimientos",
  subItems: [
    {
      id: 31,
      label: "Registro de línea de crédito",
      link: "procedimientos/lineacredito",
      icon: "bx-home-circle",
    },
  ],
},
  {
    id: 2,
    label: "Procesos Bancarios",
    icon: "bx-home-circle",
    subItems: [
      {
        id: 2,
        label: "Desembolso de préstamo",
        link: "#",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Cobro de anticipo a cliente",
        link: "#",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Cobro de anticipo a proveedor",
        link: "#",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Cobro de préstamos a terceros",
        link: "#",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Cobro de rendimientos en inversión",
        link: "#",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Depósitos no identificados",
        link: "#",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Operaciones Pendientes",
        link: "#",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Pago a proveedores",
        link: "#",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Cobro a leasing",
        link: "#",
        icon: "bx-home-circle",
      },
    ],
  },

  {
    id: 2,
    label: "Fondos",
    link: "configuracion/fondo",
    icon: "bx-home-circle",
  },
  {
    id: 2,
    label: "Caja Chica",
    link: "configuracion/caja",
    icon: "bx-home-circle",
  },

  {
    id: 10,
    label: "Configuraciones",
    icon: "bx-home-circle",
    subItems: [
      {
          id: 2,
          label: 'Contactos',
          link : 'entidadcontactos',
          icon: 'bx-home-circle',
      },
      {
        id: 2,
        label: 'Tipos de pago',
        link : 'tipopago',
        icon: 'bx-home-circle',
      },
    ],
  },
  {
    id: 20,
    label: "Parámetros",
    icon: "bx-home-circle",
    subItems: [
      {
          id: 2,
          label: 'Medios de Transferencia',
          link : 'mediotransferencia',
          icon: 'bx-home-circle',
      },
      {
        id: 2,
        label: "Tipo de Interés",
        link: "configuracion/tipointeres",
        icon: "bx-home-circle",
      },

      {
          id: 2,
          label: 'Entidades',
          link : 'entidades',
          icon: 'bx-home-circle',
      },

      {
        id: 2,
        label: "Forma de Pago",
        link: "configuracion/formapago",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Monedas",
        link: "moneda",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Días de horario",
        link: "configuracion/horariosdia",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: 'Tipo de Identificacion',
        link : 'tipoidentificacion',
        icon: 'bx-home-circle',
    },
      {
        id: 2,
        label: "Grupo de contactos",
        link: "grupo",
        icon: "bx-home-circle",
      },

      {
        id: 2,
        label: "Tipos de Fondo",
        link: "configuracion/fondotipo",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Tipos de Entidades",
        link: "tipoentidad",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Formas de Cobro",
        link: "configuracion/formacobro",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Tipo de Pago",
        link: "configuracion/tipopago",
        icon: "bx-home-circle",
      },

      {
        id: 2,
        label: "Periodos de Cuotas",
        link: "configuracion/cuotastiempo",
        icon: "bx-home-circle",
      },

      {
        id: 2,
        label: "Periodos de Interés",
        link: "configuracion/tiempointeres",
        icon: "bx-home-circle",
      },
    ],
  },*/
];
