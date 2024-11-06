import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaComponent } from "./lista/lista.component";
import { ListaAnticiposClienteComponent } from "./lista-anticipos-cliente/lista-anticipos-cliente.component";

const routes: Routes = [
  {
    path: "",
    component: ListaComponent,
  },
  {
    path:":id/anticipos-list",
    component:ListaAnticiposClienteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnticipoClienteRoutingModule {}
