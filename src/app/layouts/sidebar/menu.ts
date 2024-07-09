import { MenuItem } from './menu.model'

export const MENU: MenuItem[] = [
	{
		id: 1,
		label: 'TESORERIA',
		isTitle: true,
	},
	{
		id: 10,
		label: 'Bancos',
		icon: 'bx bxs-bank',
		link: 'banco',
	},

	{
		id: 11,
		label: 'Cajas',
		icon: 'mdi mdi-cash-register',
		link: 'caja',
	},
	{
		id: 20,
		label: 'Entidades',
		icon: 'mdi mdi-account-group',
		link: 'entidad',
	},
	{
		id: 30,
		label: 'Anticipos',
		icon: 'mdi mdi-cash-multiple',
		link: 'anticipo',
	},
	{
		id: 40,
		label: 'Fondos',
		icon: 'mdi mdi-safe',
		subItems: [
			{
				id: 401,
				label: 'Fondos Operativos',
				link: 'fondo/operativos',
			},
			/* {
        id: 402,
        label: 'Adm. Fondos de Caja',
        link: 'fondo/caja',
      }, */
			{
				id: 403,
				label: 'Fondos a Rendir',
				link: 'fondo/rendir',
			},
		],
	},
	/* {
		id: 60,
		label: 'Créditos',
		icon: 'fa-hand-holding-usd fas',
		subItems: [
			{
				id: 601,
				label: 'Proveedores',
				link: 'credito',
			},
			{
				id: 602,
				label: 'Clientes',
				link: 'credito',
			},
		],
	}, */
  {
		id: 50,
		label: 'Devengados',
		icon: 'mdi mdi-book-sync-outline',
		link: 'devengado',
	},
	{
		id: 4,
		label: 'Integración Módulos',
		isTitle: true,
	},
	{
		id: 7,
		label: 'Panel de Control',
		isTitle: true,
	},
	{
		id: 70,
		label: 'Configuración',
		icon: 'mdi mdi-cog',
		subItems: [
			{
				id: 701,
				label: 'Pagos al Contado',
				link: 'configuracion/pagoContado',
			},
			{
				id: 702,
				label: 'Procesos Automáticos',
				link: 'configuracion/procesosAutomaticos',
			},
			{
				id: 703,
				label: 'Apertura y Cierre',
				link: 'gestion/aperturaCierre',
			},
		],
	},
]
