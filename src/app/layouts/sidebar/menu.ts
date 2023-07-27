import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 10,
    label: 'Configuraciones',
    icon: 'bx-home-circle',
    subItems:[
    ]
  },
  {
    id: 20,
    label: 'Parámetros',
    icon: 'bx-home-circle',
    subItems:[
      {
        id: 21,
        label: 'Monedas',
        link : 'configuracion/monedas',
        icon: 'bx-home-circle',
      },
      {
          id: 2,
          label: 'Horarios',
          link : 'configuracion/horarios',
          icon: 'bx-home-circle',
      },

    ]
  },



];

