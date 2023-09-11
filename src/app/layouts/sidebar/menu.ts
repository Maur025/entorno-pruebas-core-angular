import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
{
    id: 31,
    label: 'Tipos de Datos',
    link : 'parametros/tipodato',
    icon: 'fas fa-hashtag',
},
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
  },
];
