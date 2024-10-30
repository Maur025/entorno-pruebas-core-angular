import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TablaNewComponent } from 'src/app/shared/ui/tabla-new/tabla-new.component';
import { FuncionesComponent } from '../../funciones.component';
import { FondoRendirService } from 'src/app/core/services/tesoreria/fondo-rendir.service';
import { EstadosFondoRendir } from 'src/app/core/models/estados-tesoreria.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends FuncionesComponent implements OnInit{
  @ViewChild('tabla') tabla: TablaNewComponent;
  breadCrumbItems: object[];
  formato: any;
  modalRef?: BsModalRef;
  dataFondoRendir: any;
  operacion: any;
  protected onSubmitFormStatus: boolean = false;

  constructor(
    public fondoRendirService: FondoRendirService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    ){super()}

  ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: "Fondo a rendir" },
			{ label: "Gestión de fondo a rendir", active: true },
		]
    this.formato = this.getCabeceras();
  }

  private modalConfig: {
		ignoreBackdropClick: boolean
		keyboard: boolean
		class: string
	} = {
		ignoreBackdropClick: true,
		keyboard: false,
		class: 'modal-xl modal-scrollable',
	}

  getCabeceras() {
    return {
      cabeceras: {
        "acciones": this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
        "nombre": this.getOpcionesCabecera('Empleado', 12),
        "desembolso": this.getOpcionesCabecera('Asignado', 12),
        "descargo":this.getOpcionesCabecera('Rendido', 12),
        "saldoDesembolso": this.getOpcionesCabecera('Saldo Desembolso', 12),
        "reembolso":this.getOpcionesCabecera('Reembolso', 12),
        "pagoReembolso": this.getOpcionesCabecera('Pago Reembolso', 12),
        "saldoReembolso":this.getOpcionesCabecera('Saldo Reembolso', 12),
        "saldoNeto": this.getOpcionesCabecera('Saldo Neto', 12),
      }
    };
  }

  nuevoDesembolso(template){
		this.modalRef = this.modalService.show(template, this.modalConfig)
  }

  pagoReemblosoForm(descargo, template){
    this.operacion = EstadosFondoRendir.PAGO_REEMBOLSO;
    this.dataFondoRendir = descargo;
    this.modalRef = this.modalService.show(template,this.modalConfig);
  }

  pagoDevolucionForm(fondoRendir, template){
    this.operacion = EstadosFondoRendir.DEVOLUCION;
    this.dataFondoRendir = fondoRendir;
    this.modalRef = this.modalService.show(template,this.modalConfig);
  }

  verMovimientos(empleado, modalMovimientos){
		this.router.navigate(['./' + empleado.id + '/desembolso-list/', {}], {
			relativeTo: this.route,
		})
  }

  cerrarModal = (): void => {
		this.modalService.hide();
    this.tabla.obtenerDatos();
	}
}
