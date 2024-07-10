import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
	FormBuilder,
	FormGroup,
	FormControl,
	FormArray,
	Validators,
} from '@angular/forms'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { CentrocostoService } from '../../services/tesoreria/centrocosto.service'
import { EntidadService } from '../../services/tesoreria/entidad.service'
import { AnticipoService } from '../../services/tesoreria/anticipo.service'
import { TipoEntidadService } from '../../services/tesoreria/tipoentidad.service'
import { EstadoAnticipoService } from '../../services/tesoreria/estadoanticipo.service'
import { AplicacionAnticipoService } from '../../services/tesoreria/aplicacion-anticipo.service'
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { ResponseDataStandard } from 'src/app/shared/interface/commonListInterfaces'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/commonApiResponse'
import { firstValueFrom } from 'rxjs'
import { ProveedorService } from '../../services/compras/proveedor.service'
@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
	@Input() tipo
	@Input() anticipoData
	@Input() idRuta
	@Input() apertura
	@Input() isRefund: boolean = false
	@Output() alGuardar: EventEmitter<ApiResponseStandard> =
		new EventEmitter<ApiResponseStandard>()

	public titulo: string = null
	routeApi = 'anticipo'
	levelNavigate = 2
	service = null
	public formGroup: FormGroup = null
	public submitted: boolean = false

	public listaProveedores: ResponseDataStandard[] = []
	public listaCentroCostos: ResponseDataStandard[] = []
	public listaEstadoAnticipo: ResponseDataStandard[] = []
	public montoTotal: number = 0
	public estado: ResponseDataStandard = null
	public ingresoEgreso: { value: string; name: string }[] = [
		{ value: 'IN', name: 'INGRESO' },
		{ value: 'OUT', name: 'EGRESO' },
	]
	public tipoOperacion: { value: string; name: string }[] = [
		{ value: 'BN', name: 'Banco' },
		{ value: 'FNDO', name: 'Fondo Operativo' },
	]

	constructor(
		private formBuilder: FormBuilder,
		private notificacionService: NotificacionService,
		private centroCostoService: CentrocostoService,
		private entidadService: EntidadService,
		private anticipoService: AnticipoService,
		public tipoEntidadService: TipoEntidadService,
		private estadoAnticipoService: EstadoAnticipoService,
		private aplicacionAnticipoService: AplicacionAnticipoService,
		private _localeService: BsLocaleService,
    private _comprasProveedorService: ProveedorService
	) {
		this._localeService.use('es')
	}

	ngOnInit(): void {
		this.setForm()
		this.setTipoAnticipo()
    this.getProveedoresHabilitados('');

		if (this.tipo === 'nuevo') {
			this.formGroup
				.get('operaciones')
				?.valueChanges?.subscribe((newValue: object[]) =>
					this.setOnChangeOperations(newValue)
				)
		}
	}

	setOnChangeOperations = (value: object[]): void => {
		const amountControl = this.formGroup.get('monto')
		if (value.length > 0) {
			if (amountControl.value && amountControl.value > 0) {
				amountControl.disable({ emitEvent: false })
			}
		} else {
			amountControl.enable({ emitEvent: false })
		}
	}

	setForm() {
		this.formGroup = this.formBuilder.group({
			id: [null, []],
			fecha: [null, [Validators.required]],
			entidadReferencialId: [null, [Validators.required]],
			centroCostoId: [null, [Validators.required]],
			nroReferencia: [null, [Validators.required]],
			descripcion: [null, [Validators.required]],
			estado: [null, []],
			saldo: [null, [Validators.required]],
			monto: [null, []],
			operaciones: this.formBuilder.array([]),
		})
	}

	get form() {
		return this.formGroup.controls
	}

	setTipoAnticipo() {
		this.getCentroCostos()
		if (this.tipo === 'nuevo') {
			this.formGroup.removeControl('estado')
			this.formGroup.removeControl('saldo')
			this.getProveedoresHabilitados('')
		} else {
			this.getEstadoAnticipo()
			this.formGroup.removeControl('entidadReferencialId')
			this.form.estado.setValidators([Validators.required])
			this.form.monto.setValidators([
				Validators.required,
				Validators.max(this.anticipoData.saldo),
				Validators.pattern('^[0-9]+(.[0-9]*)?$'),
			])
			this.form.saldo.setValue(this.anticipoData.saldo)
			this.form.saldo.disable()
		}
	}

	setByDefaultRefund = (): void => {
		if (this.isRefund) {
			const advanceStatusFound: ResponseDataStandard =
				this.listaEstadoAnticipo?.find(
					(rowAdvanceStatus: ResponseDataStandard) =>
						rowAdvanceStatus.nombre === 'DEVOLUCION'
				)
			if (advanceStatusFound) {
				this.formGroup.patchValue({
					estado: advanceStatusFound.id || null,
				})
				this.cambioEstado()
				this.formGroup.removeControl('nroReferencia')
				this.tipoOperacion = this.tipoOperacion.filter(
					(row: { value: string }) => row.value !== 'FNDO'
				)
				this.formGroup
					.get('operaciones')
					?.valueChanges?.subscribe((newValue: object[]) => {
						this.setOnChangeOperations(newValue)
						this.calcularMontos()
					})
			}
		}
	}

	getCentroCostos = () => {
		this.centroCostoService.habilitados().subscribe({
			next: (response: ApiResponseStandard) =>
				(this.listaCentroCostos = response?.content || []),
			error: (error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error),
		})
	}

	getEntidadReferencialTipoEntidad = (id: string | number) => {
		this.entidadService.listaEntidadReferencialTipoEntidad(id).subscribe({
			next: (response: ApiResponseStandard) =>
				(this.listaProveedores = response?.content || []),
			error: (error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error),
		})
	}

  getProveedoresHabilitados = (keyword:string) => {
    this._comprasProveedorService.getAndFindProveedor(0,50,'id',false,keyword).subscribe({
			next: (response: ApiResponseStandard) =>{
				this.listaProveedores = response.content
      },
			error: (error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error),
		})
	}

	getTipoEntidadId = async (tipo: string) => {
		try {
			const response: ApiResponseStandard = await firstValueFrom(
				this.tipoEntidadService.habilitados()
			)
			const foundEntityByType: ResponseDataStandard = response?.content?.find(
				(data: ResponseDataStandard) => data.tipo === tipo
			)
			if (foundEntityByType) {
				return foundEntityByType.id
			} else {
				throw new Error('No se encontro la entidad con el tipo proporcionado.')
			}
		} catch (error) {
			this.notificacionService.alertError(error)
			return null
		}
	}

	getEstadoAnticipo = () => {
		this.estadoAnticipoService.habilitados().subscribe({
			next: (response: ApiResponseStandard) => {
				this.listaEstadoAnticipo = response?.content || []
				this.setByDefaultRefund()
			},
			error: (error: ErrorResponseStandard) =>
				this.notificacionService.alertError(error),
		})
	}

	cambioEstado() {
		if (this.form.estado.value != null) {
			this.estado = this.listaEstadoAnticipo.find(
				x => x.id === this.form.estado.value
			)
			switch (this.estado.nombre) {
				case 'COMPENZACION':
					this.formGroup.removeControl('operaciones')
					this.formGroup.addControl(
						'ingresoEgreso',
						new FormControl(null, Validators.required)
					)
					break
				case 'DEVOLUCION':
					this.formGroup.removeControl('ingresoEgreso')
					break
				case 'REGULARIZACION':
					this.formGroup.removeControl('operaciones')
					this.formGroup.removeControl('ingresoEgreso')
					break
			}
		} else {
			this.formGroup.removeControl('ingresoEgreso')
			this.estado = undefined
		}
	}

	get operaciones(): FormArray {
		return this.formGroup.get('operaciones') as FormArray
	}

	calcularMontos() {
		const formData = this.formGroup.value
		this.montoTotal = 0
		formData.operaciones.forEach(operacion => {
			if (operacion.monto != null) this.montoTotal += Number(operacion.monto)
		})
	}

	guardar() {
		this.submitted = true
		if (!this.formGroup?.valid) return
		this.calcularMontos()
		const montoForm: number = parseFloat(
			this.formGroup?.get('monto')?.value || 0
		)
		const saldoForm: number = parseFloat(
			this.formGroup.get('saldo')?.value || 0
		)

		if (montoForm <= 0) {
			this.notificacionService.alertErrorOnlyMessage(
				'Ingrese un monto valido para continuar.'
			)
			return
		}

		if (montoForm > saldoForm && this.tipo !== 'nuevo') {
			this.notificacionService.alertErrorOnlyMessage(
				'El monto ingresado, no puede ser mayor al saldo.'
			)
			return
		}
		if (this.montoTotal !== montoForm) {
			this.notificacionService.alertErrorOnlyMessage(
				'El monto total y el monto ingresado no son iguales, verifique los datos ingresados.'
			)
			return
		}

		const data: ResponseDataStandard = {
			...this.formGroup.value,
			monto: this.formGroup.get('monto').value || 0,
		}
		this.processWithRegistration(data)
	}

	private processWithRegistration = (dataSend: ResponseDataStandard) => {
		switch (this.tipo) {
			case 'aplicacion':
			case 'devolucion':
				dataSend.movimiento = 'MOVIMIENTO DE PROVEEDOR'
				dataSend.anticipoId = this.anticipoData.id
				this.aplicacionAnticipoService?.register(dataSend)?.subscribe({
					next: (response: ApiResponseStandard) => {
						this.notificacionService.successStandar()
						this.alGuardar.emit(response)
					},
					error: (error: ErrorResponseStandard) =>
						this.notificacionService.alertError(error),
				})
				break
			case 'nuevo':
				dataSend.saldo = Number(dataSend.monto)
				dataSend.saldo = dataSend.monto
				dataSend.origen = 'ANTICIPO'
				dataSend.ingresoEgreso = 'OUT'
				this.anticipoService?.register(dataSend)?.subscribe({
					next: (response: ApiResponseStandard) => {
						this.notificacionService.successStandar()
						this.alGuardar.emit(response)
					},
					error: (error: ErrorResponseStandard) =>
						this.notificacionService.alertError(error),
				})
				break
		}
	}
}
