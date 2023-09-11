

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { DefaultComponent } from './default/default.component';
import { PaneldecontrolComponent } from './paneldecontrol/paneldecontrol.component';

const routes: Routes = [
{ path: 'actividadeconomica', loadChildren: () => import('./actividadeconomica/actividadeconomica.module').then(m => m.ActividadeconomicaModule  )},

{ path: 'tipodedato', loadChildren: () => import('./tipodedato/tipodedato.module').then(m => m.TipodedatoModule  )},

{ path: 'entidadestipoentidad', loadChildren: () => import('./entidadestipoentidad/entidadestipoentidad.module').then(m => m.EntidadestipoentidadModule  )},

{ path: 'entidadcontactos', loadChildren: () => import('./entidadcontactos/entidadcontactos.module').then(m => m.EntidadcontactosModule  )},

{ path: 'tipoentidad', loadChildren: () => import('./tipoentidad/tipoentidad.module').then(m => m.TipoentidadModule  )},

{ path: 'entidades', loadChildren: () => import('./entidades/entidades.module').then(m => m.EntidadesModule  )},

{ path: 'tipoidentificacion', loadChildren: () => import('./tipoidentificacion/tipoidentificacion.module').then(m => m.TipoidentificacionModule  )},

{ path: 'moneda', loadChildren: () => import('./moneda/moneda.module').then(m => m.MonedaModule  )},

{ path: 'contactogrupo', loadChildren: () => import('./contactogrupo/contactogrupo.module').then(m => m.ContactogrupoModule  )},

{ path: 'contactobanco', loadChildren: () => import('./contactobanco/contactobanco.module').then(m => m.ContactobancoModule  )},

{ path: 'cuentabanco', loadChildren: () => import('./cuentabanco/cuentabanco.module').then(m => m.CuentabancoModule  )},

{ path: 'lineacreditobanco', loadChildren: () => import('./lineacreditobanco/lineacreditobanco.module').then(m => m.LineacreditobancoModule  )},

{ path: 'lineacredito', loadChildren: () => import('./lineacredito/lineacredito.module').then(m => m.LineacreditoModule  )},

{ path: 'cuenta', loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule  )},

{ path: 'contacto', loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule  )},

{ path: 'banco', loadChildren: () => import('./banco/banco.module').then(m => m.BancoModule  )},

{ path: 'bancomediostransferencia', loadChildren: () => import('./bancomediostransferencia/bancomediostransferencia.module').then(m => m.BancomediostransferenciaModule  )},

{ path: 'tipopago', loadChildren: () => import('./tipopago/tipopago.module').then(m => m.TipopagoModule  )},

{ path: 'tipopagomedios', loadChildren: () => import('./tipopagomedios/tipopagomedios.module').then(m => m.TipopagomediosModule  )},
{ path: 'parametros', loadChildren: () => import('./parametros/parametros.module').then(m => m.ParametrosModule  )},

{ path: 'mediotransferencia', loadChildren: () => import('./mediotransferencia/mediotransferencia.module').then(m => m.MediotransferenciaModule  )},

    { path: "", component: DefaultComponent },
    { path: 'dashboard', component: DefaultComponent },
    { path: '', component: PaneldecontrolComponent },

    { path: 'configuracion', loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule )},
    { path: 'procedimientos', loadChildren: () => import('./procedimientos/procedimientos.module').then(m => m.ProcedimientosModule )},
    //{ path: 'clientes', loadChildren: () => import('./parametricas/clientes/clientes.module').then(m => m.ClientesModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class TesoreriaRoutingModule { }
