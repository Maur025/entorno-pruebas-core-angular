

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
{ path: 'pagos', loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule  )},

{ path: 'credito', loadChildren: () => import('./credito/credito.module').then(m => m.CreditoModule  )},

{ path: 'creditopagos', loadChildren: () => import('./creditopagos/creditopagos.module').then(m => m.CreditopagosModule  )},

{ path: 'creditoestado', loadChildren: () => import('./creditoestado/creditoestado.module').then(m => m.CreditoestadoModule  )},

{ path: 'contacto', loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule  )},

{ path: 'contactogrupo', loadChildren: () => import('./contactogrupo/contactogrupo.module').then(m => m.ContactogrupoModule  )},

{ path: 'grupo', loadChildren: () => import('./grupo/grupo.module').then(m => m.GrupoModule  )},

{ path: 'deudor', loadChildren: () => import('./deudor/deudor.module').then(m => m.DeudorModule  )},

{ path: 'tipoidentificacion', loadChildren: () => import('./tipoidentificacion/tipoidentificacion.module').then(m => m.TipoidentificacionModule  )},

{ path: 'tipoentidad', loadChildren: () => import('./tipoentidad/tipoentidad.module').then(m => m.TipoentidadModule  )},

{ path: 'entidadestipoentidad', loadChildren: () => import('./entidadestipoentidad/entidadestipoentidad.module').then(m => m.EntidadestipoentidadModule  )},

{ path: 'entidades', loadChildren: () => import('./entidades/entidades.module').then(m => m.EntidadesModule  )},

{ path: 'acreedor', loadChildren: () => import('./acreedor/acreedor.module').then(m => m.AcreedorModule  )},

{ path: 'tipopagovia', loadChildren: () => import('./tipopagovia/tipopagovia.module').then(m => m.TipopagoviaModule  )},

{ path: 'tipopagomedios', loadChildren: () => import('./tipopagomedios/tipopagomedios.module').then(m => m.TipopagomediosModule  )},

{ path: 'tipopago', loadChildren: () => import('./tipopago/tipopago.module').then(m => m.TipopagoModule  )},

{ path: 'vias', loadChildren: () => import('./vias/vias.module').then(m => m.ViasModule  )},

{ path: 'mediotransferencia', loadChildren: () => import('./mediotransferencia/mediotransferencia.module').then(m => m.MediotransferenciaModule  )},

{ path: 'formapago', loadChildren: () => import('./formapago/formapago.module').then(m => m.FormapagoModule  )},

{ path: 'tipointeres', loadChildren: () => import('./tipointeres/tipointeres.module').then(m => m.TipointeresModule  )},

{ path: 'tiempointeres', loadChildren: () => import('./tiempointeres/tiempointeres.module').then(m => m.TiempointeresModule  )},

{ path: 'cuotastiempo', loadChildren: () => import('./cuotastiempo/cuotastiempo.module').then(m => m.CuotastiempoModule  )},

{ path: 'variablesconfiguracion', loadChildren: () => import('./variablesconfiguracion/variablesconfiguracion.module').then(m => m.VariablesconfiguracionModule  )},

{ path: 'tipodato', loadChildren: () => import('./tipodato/tipodato.module').then(m => m.TipodatoModule  )},


];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
