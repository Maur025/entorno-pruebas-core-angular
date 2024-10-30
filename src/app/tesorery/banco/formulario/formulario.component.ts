import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotificacionService } from 'src/app/core/services/notificacion.service'
import { BancoService } from '../../services/tesoreria/banco.service'
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface'
import {
	ApiResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/common-api-response'

@Component({
	selector: 'app-formulario-de-banco',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
	@Input() bancoData: ResponseDataStandard = null
	@Output() alGuardar: EventEmitter<any> = new EventEmitter<any>()
	@Output() alActualizar: EventEmitter<any> = new EventEmitter<any>()
	public formGroup: FormGroup = null
	public submitted: boolean = false

	constructor(
		private FormBuilder: FormBuilder,
		private notificacionService: NotificacionService,
		private bancoService: BancoService
	) {}

	ngOnInit(): void {
		this.setForm()
		if (this.bancoData?.id) {
			this.setBanco()
		}
	}

	setForm() {
		this.formGroup = this.FormBuilder.group({
			id: [null, []],
			nombre: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(255),
				],
			],
			descripcion: ['', []],
		})
	}

	get form() {
		return this.formGroup.controls
	}

	setBanco() {
		this.formGroup.setValue({
			id: this.bancoData?.id || null,
			nombre: this.bancoData?.nombre || null,
			descripcion: this.bancoData?.descripcion || null,
		})
	}

	guardar() {
		this.submitted = true
		if (this.formGroup.valid) {
			this.submitted = false
			if (this.bancoData?.id) {
				this.bancoService.update(this.formGroup.value).subscribe(
					(response: ApiResponseStandard) => {
						this.notificacionService.successStandar()
						this.alActualizar.emit(response)
					},
					(error: ErrorResponseStandard) => {
						this.notificacionService.alertError(error)
					}
				)
			} else {
				this.bancoService.register(this.formGroup.value).subscribe(
					(response: ApiResponseStandard) => {
						this.notificacionService.successStandar()
						this.alActualizar.emit(response)
					},
					(error: ErrorResponseStandard) => {
						this.notificacionService.alertError(error)
					}
				)
			}
		}
	}
}
