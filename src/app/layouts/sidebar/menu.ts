import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "General",
    isTitle: true,
  },
  {
    id: 10,
    label: "Inicio",
    icon: "mdi mdi-view-dashboard",
    link: "",
  },
  {
    id: 10,
    label: "Apertura/Cierre",
    icon: "mdi mdi-calendar",
    link: "gestion/apertura-cierre",
  },
  {
    id: 10,
    label: "Empleados",
    icon: "mdi mdi-card-account-details",
    link: "gestion/empleado",
  },
  {
    id: 1,
    label: "TESORERIA",
    isTitle: true,
  },
  {
    id: 42,
    label: "Bancos",
    icon: "bx bxs-bank",
    link: "bancos",
  },
  {
    id: 42,
    label: "Cajas",
    icon: "mdi mdi-archive",
    link: "cajas",
  },
  {
    id: 42,
    label: "Fondos",
    icon: "mdi mdi-cube",
    subItems: [
      {
        id: 321,
        label: "Fondos Operativos",
        link: "/fondo-operativo",
      },
      {
        id: 322,
        label: "Fondos a Rendir",
        link: "/fondo-rendir",
      },
    ],
  },
  {
    id: 9,
    label: "MOVIMIENTOS",
    isTitle: true,
  },
  {
    id: 42,
    label: "Proveedores",
    icon: "bx bxs-collection",
    subItems: [
      {
        id: 322,
        label: "Anticipos",
        link: "/anticipo-proveedor",
      },
      {
        id: 321,
        label: "Pagos",
        link: "/pagos",
      },
      {
        id: 321,
        label: "Devengados",
        link: "/devengado-proveedor",
      },
    ],
  },
  {
    id: 42,
    label: "Clientes",
    icon: "bx bxs-collection",
    subItems: [
      {
        id: 43,
        label: "Anticipos",
        link: "/anticipo-cliente",
      },
      {
        id: 44,
        label: "Cobros",
        link: "/cobros",
      },
    ],
  },
  /*  {
		id: 1,
		label: 'antiguo',
		isTitle: true,
	},

	{
		id: 1,
		label: 'TESORERIA',
		isTitle: true,
	},
	{
		id: 11,
		label: 'Inicio',
		link: '/inicio',
		icon: 'bx bx-home',
	},
	{
		id: 12,
		label: 'Aperturas y Cierres',
		link: '/gestion/aperturaCierre',
		icon: 'bx bx-calendar-check',
	},
	{
		id: 2,
		label: 'GESTIÓN',
		isTitle: true,
	},
	{
		id: 21,
		label: 'Bancos',
		icon: 'bx bxs-bank',
		link: '/banco',
	},

	{
		id: 22,
		label: 'Cajas',
		icon: 'mdi mdi-cash-register',
		link: '/caja',
	},
	{
		id: 23,
		label: 'Empleado - Responsable',
		icon: 'mdi mdi-account-group',
		link: '/empleado',
	},
	{
		id: 3,
		label: 'REGISTRAR',
		isTitle: true,
	},
	{
		id: 31,
		label: 'Anticipos',
		icon: 'mdi mdi-cash-multiple',
		subItems: [
			{
				id: 311,
				label: 'Proveedor',
				link: '/anticipo',
			},
			{
				id: 312,
				label: 'Cliente',
				link: '/anticipo/cliente',
			},
		],
	},
	{
		id: 32,
		label: 'Fondos',
		icon: 'mdi mdi-safe',
		subItems: [
			{
				id: 321,
				label: 'Fondos Operativos',
				link: '/fondo/operativos',
			},
			{
				id: 322,
				label: 'Fondos a Rendir',
				link: '/fondo/rendir',
			},
		],
	},
	{
		id: 4,
		label: 'OPERACIONES FINANCIERAS',
		isTitle: true,
	},
	{
		id: 41,
		label: 'Efectuar Pago',
		icon: 'mdi mdi-cash-minus',
		link: '/operacion_financiera/efectuar_pago',
	},
	{
		id: 42,
		label: 'Efectuar Cobro',
		icon: 'mdi mdi-cash-plus',
		link: '/operacion_financiera/efectuar_cobro',
	}, */
];
