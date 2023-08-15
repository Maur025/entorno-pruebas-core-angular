import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'tipodato', loadChildren: () => import('./tipodato/tipodato.module').then(m => m.TipodatoModule  )},

{ path: 'tabla', loadChildren: () => import('./tabla/tabla.module').then(m => m.TablaModule  )},

{ path: 'creditopagos', loadChildren: () => import('./creditopagos/creditopagos.module').then(m => m.CreditopagosModule  )},

{ path: 'formapago', loadChildren: () => import('./formapago/formapago.module').then(m => m.FormapagoModule  )},

{ path: 'tipointeres', loadChildren: () => import('./tipointeres/tipointeres.module').then(m => m.TipointeresModule  )},

{ path: 'credito', loadChildren: () => import('./credito/credito.module').then(m => m.CreditoModule  )},

{ path: 'deudor', loadChildren: () => import('./deudor/deudor.module').then(m => m.DeudorModule  )},

{ path: 'acreedor', loadChildren: () => import('./acreedor/acreedor.module').then(m => m.AcreedorModule  )},

{ path: 'tipopago', loadChildren: () => import('./tipopago/tipopago.module').then(m => m.TipopagoModule  )},

{ path: 'tiempointeres', loadChildren: () => import('./tiempointeres/tiempointeres.module').then(m => m.TiempointeresModule  )},

{ path: 'cuotastiempo', loadChildren: () => import('./cuotastiempo/cuotastiempo.module').then(m => m.CuotastiempoModule  )},

{ path: 'creditoestado', loadChildren: () => import('./creditoestado/creditoestado.module').then(m => m.CreditoestadoModule  )},

{ path: 'estadocredito', loadChildren: () => import('./estadocredito/estadocredito.module').then(m => m.EstadocreditoModule  )},

{ path: 'contactobanco', loadChildren: () => import('./contactobanco/contactobanco.module').then(m => m.ContactobancoModule  )},

{ path: 'banco', loadChildren: () => import('./banco/banco.module').then(m => m.BancoModule  )},

{ path: 'cuentabanco', loadChildren: () => import('./cuentabanco/cuentabanco.module').then(m => m.CuentabancoModule  )},

{ path: 'entidadestipoentidad', loadChildren: () => import('./entidadestipoentidad/entidadestipoentidad.module').then(m => m.EntidadestipoentidadModule  )},

{ path: 'fondoformacobro', loadChildren: () => import('./fondoformacobro/fondoformacobro.module').then(m => m.FondoformacobroModule  )},

{ path: 'formacobro', loadChildren: () => import('./formacobro/formacobro.module').then(m => m.FormacobroModule  )},

{ path: 'entidadcontactos', loadChildren: () => import('./entidadcontactos/entidadcontactos.module').then(m => m.EntidadcontactosModule  )},

{ path: 'entidades', loadChildren: () => import('./entidades/entidades.module').then(m => m.EntidadesModule  )},

{ path: 'tipoentidad', loadChildren: () => import('./tipoentidad/tipoentidad.module').then(m => m.TipoentidadModule  )},

{ path: 'cajaresponsables', loadChildren: () => import('./cajaresponsables/cajaresponsables.module').then(m => m.CajaresponsablesModule  )},

{ path: 'cajahorarios', loadChildren: () => import('./cajahorarios/cajahorarios.module').then(m => m.CajahorariosModule  )},

{ path: 'caja', loadChildren: () => import('./caja/caja.module').then(m => m.CajaModule  )},

{ path: 'fondocentrodecostos', loadChildren: () => import('./fondocentrodecostos/fondocentrodecostos.module').then(m => m.FondocentrodecostosModule  )},

{ path: 'fondo', loadChildren: () => import('./fondo/fondo.module').then(m => m.FondoModule  )},

{ path: 'fondoresponsables', loadChildren: () => import('./fondoresponsables/fondoresponsables.module').then(m => m.FondoresponsablesModule  )},

{ path: 'centrodecostos', loadChildren: () => import('./centrodecostos/centrodecostos.module').then(m => m.CentrodecostosModule  )},

{ path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule  )},

{ path: 'contactogrupo', loadChildren: () => import('./contactogrupo/contactogrupo.module').then(m => m.ContactogrupoModule  )},

{ path: 'grupo', loadChildren: () => import('./grupo/grupo.module').then(m => m.GrupoModule  )},

{ path: 'moneda', loadChildren: () => import('./moneda/moneda.module').then(m => m.MonedaModule  )},

{ path: 'tipoidentificacion', loadChildren: () => import('./tipoidentificacion/tipoidentificacion.module').then(m => m.TipoidentificacionModule  )},

{ path: 'fondotipo', loadChildren: () => import('./fondotipo/fondotipo.module').then(m => m.FondotipoModule  )},

{ path: 'horarios', loadChildren: () => import('./horarios/horarios.module').then(m => m.HorariosModule  )},

{ path: 'horariosdia', loadChildren: () => import('./horariosdia/horariosdia.module').then(m => m.HorariosdiaModule  )},

{ path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule  )},

{ path: 'contacto', loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule  )},

{ path: 'dias', loadChildren: () => import('./dias/dias.module').then(m => m.DiasModule  )},

{ path: 'monedas', loadChildren: () => import('./monedas/monedas.module').then(m => m.MonedasModule  )},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
