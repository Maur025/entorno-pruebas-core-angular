import { ProveedorService } from 'src/app/core/services/tesoreria/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionesComponent } from '../../funciones.component';

@Component({
  selector: 'app-lista-anticipos-proveedor',
  templateUrl: './lista-anticipos-proveedor.component.html',
  styleUrls: ['./lista-anticipos-proveedor.component.scss']
})
export class ListaAnticiposProveedorComponent extends FuncionesComponent implements OnInit {
  breadCrumbItems: object[];
  labelProveedor: string="";
  idProveedor: any;

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private proveedorService: ProveedorService

  ){
    super();
    this.idProveedor = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

  }


}
