import { ProveedorService } from 'src/app/core/services/tesoreria/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionesComponent } from '../../funciones.component';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { Location } from '@angular/common';
import { AnticipoProveedorService } from 'src/app/core/services/tesoreria/anticipo-proveedor.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-lista-anticipos-proveedor',
  templateUrl: './lista-anticipos-proveedor.component.html',
  styleUrls: ['./lista-anticipos-proveedor.component.scss']
})
export class ListaAnticiposProveedorComponent extends FuncionesComponent implements OnInit {
  breadCrumbItems: object[];
  labelProveedor: string="";
  idProveedor: any;
  formato: any;
  modalRef?: BsModalRef;

  private modalConfig: {
		ignoreBackdropClick: boolean
		keyboard: boolean
		class: string
	} = {
		ignoreBackdropClick: true,
		keyboard: false,
		class: 'modal-xl modal-scrollable',
	}

  constructor(
    private route: ActivatedRoute,
    private proveedorService : ProveedorService,
    private notificacion:NotificacionService,
    public location: Location,
    public anticipoProveedor : AnticipoProveedorService,
    private modalService: BsModalService,

  ){
    super();
    this.idProveedor = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDataProveedor(this.idProveedor);
    this.formato = this.getCabeceras();
  }
  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('', 12),
        "referencia": this.getOpcionesCabecera('Referencia', 12),
        "fecha": this.getOpcionesCabecera('Fecha anticipo', 12),
        "centroCosto": this.getOpcionesCabecera('Centro de costos', 12),
        "montoAnticipo": this.getOpcionesCabecera('Monto Anticipo', 12),
        "montoAplicado": this.getOpcionesCabecera('Monto Anticipo-Aplicado', 12),
        "saldo": this.getOpcionesCabecera('Saldo', 12),
        "estadoContable": this.getOpcionesCabecera('Estado Contable', 12),
      }
    };
  }


  getDataProveedor(idProveedor){
    this.proveedorService.find(idProveedor).subscribe(data=>{
      this.labelProveedor = data['data']['razonSocial'];
      this.breadCrumbItems = [{ label: "Anticipo del Proveedor" },{ label: this.labelProveedor, active: true },]
    },error=>this.notificacion.alertError(error));
  }

  dataAnticipo: any;

  verMovimientos(anticipo, template){
    this.dataAnticipo=anticipo;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }


}
