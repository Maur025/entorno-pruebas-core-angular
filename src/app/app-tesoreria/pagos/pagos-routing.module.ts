import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaComponent } from "./lista/lista.component";
import { PagoFormComponent } from "./pago-form/pago-form.component";

const routes: Routes = [
  { path: "", component: ListaComponent },
  { path: "pago-form", component: PagoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosRoutingModule {}
