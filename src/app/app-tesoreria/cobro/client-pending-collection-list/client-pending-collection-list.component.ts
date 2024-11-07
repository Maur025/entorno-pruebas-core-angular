import { Component, OnInit } from '@angular/core'
import { FuncionesComponent } from '../../funciones.component'
import { CobroService } from 'src/app/core/services/tesoreria/cobro.service'
import { Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
	selector: 'app-client-pending-collection-list',
	templateUrl: './client-pending-collection-list.component.html',
	styleUrls: ['./client-pending-collection-list.component.scss'],
})
export class ClientPendingCollectionListComponent
	extends FuncionesComponent
	implements OnInit
{
  titulo = "Cobros Cliente"
  tituloLista = "Lista de cobros"
	protected breadCrumbItems: object[] = []
	protected tableHeadersFormat: { [key: string]: unknown } = {}
  modalRef?: BsModalRef;
  dataCliente;

  private modalConfig: {
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    class: string;
  } = {
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-xl modal-scrollable",
  };

	constructor(
    protected cobroService: CobroService,
    private router: Router,
    private modalService: BsModalService,
  ) {
		super()
	}

	ngOnInit(): void {
    this.breadCrumbItems = [
			{ label: this.titulo },
			{ label: this.tituloLista, active: true },
		]
		this.getHeaders()
	}

	getHeaders = (): void => {
		this.tableHeadersFormat = {
			cabeceras: {
				acciones: this.getOpcionesCabecera('Acciones', 12, 'text', true, false),
				razonSocial: this.getOpcionesCabecera('Razón Social', 12),
				nroDocumento: this.getOpcionesCabecera('N° Documento', 12),
				totalCreditos: this.getOpcionesCabecera('Total Créditos', 12),
				totalPagado: this.getOpcionesCabecera('Total Pagado', 12),
				totalSaldo: this.getOpcionesCabecera('Saldo Pendiente', 12),
			},
		}
	}

	navigateToCollectForm = (): void => {
		this.router.navigateByUrl('/cobros/cobro-form')
	}

  verDetalles(data, template){
    console.log(data);
    this.dataCliente = data;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }
}
