import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompensationListComponent } from "./compensation-list/compensation-list.component";
import { CompensationFormComponent } from "./compensation-form/compensation-form.component";

const routes: Routes = [
  {
    path: "",
    component: CompensationListComponent,
  },
  {
    path: "registro",
    component: CompensationFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompensacionesRoutingModule {}
