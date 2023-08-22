import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
{
    id: 2,
    label: 'Líneas de créditos',
    link : 'configuracion/lineacredito',
    icon: 'bx-home-circle',
},


  {
      id: 2,
      label: 'Bancos',
      link : 'configuracion/banco',
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

  /* {
    id: 2,
    label: 'Tipo Entidad- Entidad',
    link : 'configuracion/entidadestipoentidad',
    icon: 'bx-home-circle',
}, */

  {
    id: 2,
    label: "Fondos",
    link: "configuracion/fondo",
    icon: "bx-home-circle",
  },

  /* {
    id: 2,
    label: 'Fondo - Forma de Cobro',
    link : 'configuracion/fondoformacobro',
    icon: 'bx-home-circle',
},
 */

  /* {
    id: 2,
    label: 'Tipo Entidad - Entidades',
    link : 'configuracion/tipoentidad',
    icon: 'bx-home-circle',
}, */

  /* {
    id: 2,
    label: 'Entidad - Contactos',
    link : 'configuracion/entidadcontactos',
    icon: 'bx-home-circle',
}, */

  {
    id: 2,
    label: "Entidades",
    link: "configuracion/entidades",
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
        label: 'Bancos',
        link : 'configuracion/banco',
        icon: 'bx-home-circle',
      },
      {
        id: 2,
        label: "Contactos",
        link: "configuracion/contacto",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Usuarios",
        link: "configuracion/usuarios",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Centro de Costos",
        link: "configuracion/centrodecostos",
        icon: "bx-home-circle",
      },

      {
        id: 2,
        label: "Horarios ",
        link: "configuracion/horarios",
        icon: "bx-home-circle",
      },

      {
        id: 2,
        label: "Fondos",
        link: "configuracion/fondo",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Deudores",
        link: "configuracion/deudor",
        icon: "bx-home-circle",
      },

      {
        id: 2,
        label: "Acreedores",
        link: "configuracion/acreedor",
        icon: "bx-home-circle",
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
        label: "Tipo de Interés",
        link: "configuracion/tipointeres",
        icon: "bx-home-circle",
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
        link: "configuracion/moneda",
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
        label: "Tipos de Identificación",
        link: "configuracion/tipoidentificacion",
        icon: "bx-home-circle",
      },
      {
        id: 2,
        label: "Grupo de contactos",
        link: "configuracion/grupo",
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
        link: "configuracion/tipoentidad",
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
