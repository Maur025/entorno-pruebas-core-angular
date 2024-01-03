import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CuentaListaComponent } from './cuenta/cuenta-lista/cuenta-lista.component';
import { CuentaFormularioComponent } from './cuenta/cuenta-formulario/cuenta-formulario.component';
import { CuentasBancoComponent } from './cuentas-banco/cuentas-banco.component';

const routes: Routes = [
  /* ruta de bancos*/
  {path:"", component: ListaComponent},
  {path:'id/:id', component: FormularioComponent},
  {path:'nuevo', component: FormularioComponent},
  {path:'cuentas/:id', component: CuentasBancoComponent},

  /* ruta de cuentas-banco*/
  {path:'cuentaBanco', component: CuentaListaComponent},
  {path:'cuentaBanco/id/:id', component: CuentaFormularioComponent},
  {path:'cuentaBanco/nuevo', component: CuentaFormularioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancoRoutingModule { }
