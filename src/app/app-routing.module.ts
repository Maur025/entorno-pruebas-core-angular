import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// import { AuthGuard } from "./auth/auth.guard";
import { HandleKeycloakAuthGuard } from "core-keycloak";
import { LayoutComponent } from "./layouts/layout.component";
import { Page404Component } from "./extrapages/page404/page404.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    loadChildren: () =>
      import("./app-tesoreria/app-tesoreria.module").then(
        (m) => m.AppTesoreriaModule
      ),
    canActivate: [HandleKeycloakAuthGuard],
    data: { roles: ["kbi-admin"] },
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./extrapages/extrapages.module").then((m) => m.ExtrapagesModule),
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
