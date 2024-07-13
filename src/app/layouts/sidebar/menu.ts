import { MenuItem } from './menu.model'

export const MENU: MenuItem[] = [
	{
		id: 1,
		label: 'TESORERIA',
		isTitle: true,
	},
	{
		id: 11,
		label: 'Inicio',
		link: 'inicio',
		icon: 'bx bx-home',
	},
	{
		id: 12,
		label: 'Aperturas y Cierres',
		link: 'gestion/aperturaCierre',
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
		link: 'banco',
	},

	{
		id: 22,
		label: 'Cajas',
		icon: 'mdi mdi-cash-register',
		link: 'caja',
	},
	{
		id: 23,
		label: 'Empleado - Responsable',
		icon: 'mdi mdi-account-group',
		link: 'empleado',
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
				link: 'anticipo',
			},
			{
				id: 312,
				label: 'Cliente',
				link: 'anticipo/cliente',
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
				link: 'fondo/operativos',
			},
			{
				id: 322,
				label: 'Fondos a Rendir',
				link: 'fondo/rendir',
			},
		],
	},
	{
		id: 4,
		label: 'INTEGRACIÓN MÓDULOS',
		isTitle: true,
	},
]
