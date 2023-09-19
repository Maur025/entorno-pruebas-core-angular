

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { DefaultComponent } from './default/default.component';
import { PaneldecontrolComponent } from './paneldecontrol/paneldecontrol.component';

const routes: Routes = [
{ path: 'cajabancotransferencia', loadChildren: () => import('./cajabancotransferencia/cajabancotransferencia.module').then(m => m.CajabancotransferenciaModule  )},

{ path: 'cajabancomedio', loadChildren: () => import('./cajabancomedio/cajabancomedio.module').then(m => m.CajabancomedioModule  )},

{ path: 'anticipo', loadChildren: () => import('./anticipo/anticipo.module').then(m => m.AnticipoModule  )},

{ path: 'movimientocuenta', loadChildren: () => import('./movimientocuenta/movimientocuenta.module').then(m => m.MovimientocuentaModule  )},

{ path: 'medioformapago', loadChildren: () => import('./medioformapago/medioformapago.module').then(m => m.MedioformapagoModule  )},

{ path: 'anticipomovimientocuenta', loadChildren: () => import('./anticipomovimientocuenta/anticipomovimientocuenta.module').then(m => m.AnticipomovimientocuentaModule  )},

{ path: 'tipomovimiento', loadChildren: () => import('./tipomovimiento/tipomovimiento.module').then(m => m.TipomovimientoModule  )},

{ path: 'contactobanco', loadChildren: () => import('./contactobanco/contactobanco.module').then(m => m.ContactobancoModule  )},

{ path: 'lineacreditobanco', loadChildren: () => import('./lineacreditobanco/lineacreditobanco.module').then(m => m.LineacreditobancoModule  )},

{ path: 'lineacredito', loadChildren: () => import('./lineacredito/lineacredito.module').then(m => m.LineacreditoModule  )},

{ path: 'cuentabanco', loadChildren: () => import('./cuentabanco/cuentabanco.module').then(m => m.CuentabancoModule  )},

{ path: 'banco', loadChildren: () => import('./banco/banco.module').then(m => m.BancoModule  )},

{ path: 'bancomediostransferencia', loadChildren: () => import('./bancomediostransferencia/bancomediostransferencia.module').then(m => m.BancomediostransferenciaModule  )},

{ path: 'solicitudes', loadChildren: () => import('./solicitudes/solicitudes.module').then(m => m.SolicitudesModule  )},

{ path: 'centrodecostos', loadChildren: () => import('./centrodecostos/centrodecostos.module').then(m => m.CentrodecostosModule  )},

{ path: 'tiposolicitud', loadChildren: () => import('./tiposolicitud/tiposolicitud.module').then(m => m.TiposolicitudModule  )},

{ path: 'caja', loadChildren: () => import('./caja/caja.module').then(m => m.CajaModule  )},

{ path: 'cajahorarios', loadChildren: () => import('./cajahorarios/cajahorarios.module').then(m => m.CajahorariosModule  )},

{ path: 'horarios', loadChildren: () => import('./horarios/horarios.module').then(m => m.HorariosModule  )},

{ path: 'horariosdia', loadChildren: () => import('./horariosdia/horariosdia.module').then(m => m.HorariosdiaModule  )},

{ path: 'dias', loadChildren: () => import('./dias/dias.module').then(m => m.DiasModule  )},

{ path: 'fondo', loadChildren: () => import('./fondo/fondo.module').then(m => m.FondoModule  )},

{ path: 'fondocentrodecostos', loadChildren: () => import('./fondocentrodecostos/fondocentrodecostos.module').then(m => m.FondocentrodecostosModule  )},

{ path: 'fondoformacobro', loadChildren: () => import('./fondoformacobro/fondoformacobro.module').then(m => m.FondoformacobroModule  )},

{ path: 'fondoresponsables', loadChildren: () => import('./fondoresponsables/fondoresponsables.module').then(m => m.FondoresponsablesModule  )},

{ path: 'fondotipo', loadChildren: () => import('./fondotipo/fondotipo.module').then(m => m.FondotipoModule  )},

{ path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule  )},

{ path: 'tipocobromedios', loadChildren: () => import('./tipocobromedios/tipocobromedios.module').then(m => m.TipocobromediosModule  )},

{ path: 'tipocobrovia', loadChildren: () => import('./tipocobrovia/tipocobrovia.module').then(m => m.TipocobroviaModule  )},

{ path: 'deudorcuenta', loadChildren: () => import('./deudorcuenta/deudorcuenta.module').then(m => m.DeudorcuentaModule  )},

{ path: 'acreedorcuenta', loadChildren: () => import('./acreedorcuenta/acreedorcuenta.module').then(m => m.AcreedorcuentaModule  )},

{ path: 'cuenta', loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule  )},

{ path: 'tipodecuenta', loadChildren: () => import('./tipodecuenta/tipodecuenta.module').then(m => m.TipodecuentaModule  )},

{ path: 'documento', loadChildren: () => import('./documento/documento.module').then(m => m.DocumentoModule  )},

{ path: 'documentotipo', loadChildren: () => import('./documentotipo/documentotipo.module').then(m => m.DocumentotipoModule  )},

{ path: 'cobros', loadChildren: () => import('./cobros/cobros.module').then(m => m.CobrosModule  )},

{ path: 'formacobro', loadChildren: () => import('./formacobro/formacobro.module').then(m => m.FormacobroModule  )},

{ path: 'pagos', loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule  )},

{ path: 'creditopagos', loadChildren: () => import('./creditopagos/creditopagos.module').then(m => m.CreditopagosModule  )},

{ path: 'tipointeres', loadChildren: () => import('./tipointeres/tipointeres.module').then(m => m.TipointeresModule  )},

{ path: 'credito', loadChildren: () => import('./credito/credito.module').then(m => m.CreditoModule  )},

{ path: 'creditoestado', loadChildren: () => import('./creditoestado/creditoestado.module').then(m => m.CreditoestadoModule  )},

{ path: 'estadocredito', loadChildren: () => import('./estadocredito/estadocredito.module').then(m => m.EstadocreditoModule  )},

{ path: 'contacto', loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule  )},

{ path: 'contactogrupo', loadChildren: () => import('./contactogrupo/contactogrupo.module').then(m => m.ContactogrupoModule  )},

{ path: 'grupo', loadChildren: () => import('./grupo/grupo.module').then(m => m.GrupoModule  )},

{ path: 'tipoidentificacion', loadChildren: () => import('./tipoidentificacion/tipoidentificacion.module').then(m => m.TipoidentificacionModule  )},

{ path: 'deudor', loadChildren: () => import('./deudor/deudor.module').then(m => m.DeudorModule  )},

{ path: 'acreedor', loadChildren: () => import('./acreedor/acreedor.module').then(m => m.AcreedorModule  )},

{ path: 'entidades', loadChildren: () => import('./entidades/entidades.module').then(m => m.EntidadesModule  )},

{ path: 'tipoentidad', loadChildren: () => import('./tipoentidad/tipoentidad.module').then(m => m.TipoentidadModule  )},

{ path: 'entidadestipoentidad', loadChildren: () => import('./entidadestipoentidad/entidadestipoentidad.module').then(m => m.EntidadestipoentidadModule  )},

{ path: 'tipopagovia', loadChildren: () => import('./tipopagovia/tipopagovia.module').then(m => m.TipopagoviaModule  )},

{ path: 'tipopago', loadChildren: () => import('./tipopago/tipopago.module').then(m => m.TipopagoModule  )},

{ path: 'tipopagomedios', loadChildren: () => import('./tipopagomedios/tipopagomedios.module').then(m => m.TipopagomediosModule  )},

{ path: 'vias', loadChildren: () => import('./vias/vias.module').then(m => m.ViasModule  )},

{ path: 'mediotransferencia', loadChildren: () => import('./mediotransferencia/mediotransferencia.module').then(m => m.MediotransferenciaModule  )},

{ path: 'formapago', loadChildren: () => import('./formapago/formapago.module').then(m => m.FormapagoModule  )},

{ path: 'tiempointeres', loadChildren: () => import('./tiempointeres/tiempointeres.module').then(m => m.TiempointeresModule  )},

{ path: 'cuotastiempo', loadChildren: () => import('./cuotastiempo/cuotastiempo.module').then(m => m.CuotastiempoModule  )},

{ path: 'moneda', loadChildren: () => import('./moneda/moneda.module').then(m => m.MonedaModule  )},

{ path: 'variablesconfiguracion', loadChildren: () => import('./variablesconfiguracion/variablesconfiguracion.module').then(m => m.VariablesconfiguracionModule  )},

{ path: 'tipodato', loadChildren: () => import('./tipodato/tipodato.module').then(m => m.TipodatoModule  )},


    { path: "", component: DefaultComponent },
    { path: 'dashboard', component: DefaultComponent },
    { path: '', component: PaneldecontrolComponent },

    //{ path: 'clientes', loadChildren: () => import('./parametricas/clientes/clientes.module').then(m => m.ClientesModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class TesoreriaRoutingModule { }
