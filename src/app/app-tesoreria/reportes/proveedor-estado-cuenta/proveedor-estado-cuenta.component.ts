import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/core/services/archivos.service';
import { ProveedoresReportService } from 'src/app/core/services/tesoreria/reportes/proveedores-report.service';
import { FuncionesComponent } from '../../funciones.component';

@Component({
  selector: 'app-proveedor-estado-cuenta',
  templateUrl: './proveedor-estado-cuenta.component.html',
  styleUrls: ['./proveedor-estado-cuenta.component.scss']
})
export class ProveedorEstadoCuentaComponent extends FuncionesComponent implements OnInit{

  breadCrumbItems: object[];
  filtroFecha:any;
  filtros={};
  conDetalle: boolean = false;
  submitted: boolean = false;

  constructor(
    private proveedoresReportService: ProveedoresReportService,
    private archivoService: ArchivosService
    ){super()}

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: "Reportes" },
			{ label: "Estados de cuentas de Proveedores", active: true },
		]
  }

  getFechas(date){
    this.filtroFecha = date;
  }

  exportarDatos(tipo){
    if(this.filtroFecha !== undefined){
    this.filtros['fechaDesde'] = this.filtroFecha[0];
    this.filtros['fechaHasta'] = this.filtroFecha[1];
    this.proveedoresReportService.estadoCuentas(false, tipo, this.filtros).subscribe(data=>{
      let content = data['data']['content'];
      let name = 'Proveedores_estados_de_cuentas';
      if (tipo === 'XLSX') {
        let extencion = 'xlsx';
        this.archivoService.generar64aExcel(content, `${name}.${extencion}`);
      } else if (tipo === 'PDF') {
        let extencion = 'pdf';
        this.archivoService.generar64aPDFByNewWindow(content, `${name}.${extencion}`);
      }
    });
  }
  this.submitted = true;



  }
}
