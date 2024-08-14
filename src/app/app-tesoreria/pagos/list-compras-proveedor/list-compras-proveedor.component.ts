import { Component} from '@angular/core';
@Component({
  selector: 'list-compras-proveedor',
  templateUrl: './list-compras-proveedor.component.html',
  styleUrls: ['./list-compras-proveedor.component.scss']
})
export class ListComprasProveedorComponent {

  comprasProveedor: any[]=[];
  nombreProveedor: string="";

}
