import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NotificacionService } from "src/app/core/services/notificacion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CuentaBancoService } from "src/app/tesorery/services/tesoreria/cuenta-banco.service";
import { BancoService } from "src/app/tesorery/services/tesoreria/banco.service";

import { CuentaFormularioComponent } from '../cuenta/cuenta-formulario/cuenta-formulario.component';

@Component({
  selector: 'app-cuentas-banco',
  templateUrl: './cuentas-banco.component.html',
  styleUrls: ['./cuentas-banco.component.scss']
})
export class CuentasBancoComponent implements OnInit {
  @ViewChild('appFormCuenta') appFormCuenta: CuentaFormularioComponent;

  breadCrumbItems: Array<{}>;
  breadCrumbTitle: string = 'Adminstrar Banco';
  titulo = "Cuentas del Banco : ";
  id: any;

  constructor(
    public CuentaBancoService: CuentaBancoService,
    public bancoService: BancoService,
    public notificacionService: NotificacionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Bancos' }, { label: 'Administrar Bancos' }, { label: ' Administrar Cuentas', active: true }];
    if (this.route.snapshot.params["id"]) {
      this.id = this.route.snapshot.params["id"];
      this.bancoService.find(this.id).subscribe(data => {
        this.titulo = this.titulo + data.content.nombre;
      }, (error) => {
        this.notificacionService.alertError(error);
      });
    }
  }
}
