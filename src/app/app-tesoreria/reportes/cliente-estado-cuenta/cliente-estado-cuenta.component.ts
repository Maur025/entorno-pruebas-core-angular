import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FuncionesComponent } from '../../funciones.component';
import { ClientesReportService } from 'src/app/core/services/tesoreria/reportes/clientes-report.service';
import { UntypedFormGroup } from '@angular/forms';
import { ArchivosService } from 'src/app/core/services/archivos.service';

@Component({
  selector: 'app-cliente-estado-cuenta',
  templateUrl: './cliente-estado-cuenta.component.html',
  styleUrls: ['./cliente-estado-cuenta.component.scss']
})
export class ClienteEstadoCuentaComponent extends FuncionesComponent implements OnInit{

  breadCrumbItems: object[];
  formReporCliente: UntypedFormGroup;
  filtroFecha:any;
  filtros={}

  constructor(
    private clientesReportService: ClientesReportService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    private archivoService: ArchivosService
    ){super()}

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: "Reportes" },
			{ label: "Estados de cuentas de Clientes", active: true },
		]
  }

  getFechas(date){
    console.log(date);
    this.filtroFecha = date;
  }

  exportarDatos(tipo){
    this.filtros['fechaDesde'] = this.filtroFecha[0];
    this.filtros['fechaHasta'] = this.filtroFecha[1];
    this.clientesReportService.estadoCuentas(false, tipo, this.filtros).subscribe(data=>{
      console.log("data"+data['data']['content']);
      let content = data['data']['content'];
      let name = 'Clientes_estado_de_cuentas';
      if (tipo === 'XLSX') {
        let extencion = 'xlsx';
        this.archivoService.generar64aExcel(content, `${name}.${extencion}`);
      } else if (tipo === 'PDF') {
        let extencion = 'pdf';
        this.archivoService.generar64aPDFByNewWindow(content, `${name}.${extencion}`);
      }
    });



  }

  getReportClient(){

  }

}
