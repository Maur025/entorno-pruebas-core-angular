import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";

const routes: Routes = [
  {
    path: "",
    component: InicioComponent,
  },
  {
    path: "gestion",
    loadChildren: () =>
      import("./gestion/gestion.module").then((m) => m.GestionModule),
  },
  {
    path: "bancos",
    loadChildren: () =>
      import("./bancos/bancos.module").then((m) => m.BancosModule),
  },
  {
    path: "cajas",
    loadChildren: () =>
      import("./cajas/cajas.module").then((m) => m.CajasModule),
  },
  {
    path: "pagos",
    loadChildren: () =>
      import("./pagos/pagos.module").then((m) => m.PagosModule),
  },
  {
    path: "pagos-varios",
    loadChildren: () =>
      import("./pagos-varios/pagos-varios.module").then(
        (m) => m.PagosVariosModule
      ),
  },
  {
    path: "fondo-operativo",
    loadChildren: () =>
      import("./fondo-operativo/fondo-operativo.module").then(
        (m) => m.FondoOperativoModule
      ),
  },
  {
    path: "fondo-rendir",
    loadChildren: () =>
      import("./fondo-rendir/fondo-rendir.module").then(
        (m) => m.FondoRendirModule
      ),
  },
  {
    path: "anticipo-proveedor",
    loadChildren: () =>
      import("./anticipo-proveedor/anticipo-proveedor.module").then(
        (m) => m.AnticipoProveedorModule
      ),
  },
  {
    path: "anticipo-cliente",
    loadChildren: () =>
      import("./anticipo-cliente/anticipo-cliente.module").then(
        (m) => m.AnticipoClienteModule
      ),
  },
  {
    path: "cobros",
    loadChildren: () =>
      import("./cobro/cobro.module").then((m) => m.CobroModule),
  },
  {
    path: "devengado-proveedor",
    loadChildren: () =>
      import("./devengado-proveedor/devengado-proveedor.module").then(
        (m) => m.DevengadoProveedorModule
      ),
  },
  {
    path: "cobros-varios",
    loadChildren: () =>
      import("./cobros-varios/cobros-varios.module").then(
        (m) => m.CobrosVariosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppTesoreriaRoutingModule {}
