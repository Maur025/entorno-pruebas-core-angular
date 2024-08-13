import { Injectable } from '@angular/core'
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr'
import { AuthenticationService } from 'src/app/core/services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import {
	ErrorDetailDataResponseStandard,
	ErrorResponseStandard,
} from 'src/app/shared/interface/common-api-response'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class NotificacionService {
	constructor(
		public toastService: ToastrService,
		public authServices: AuthenticationService,
		private router: Router
	) {}

	alertError(
		errorResponse: ErrorResponseStandard = null,
		messageCustom: {
			message?: string
			title?: string
			icon?: any
			confirmButtonText?: string
			showCancelButton?: boolean
		} = null
	) {
		const llamadoAccion: any = null

		const message: string = this.getMessageCodeError(
			errorResponse?.status || 0,
			errorResponse?.error?.message || '',
			llamadoAccion,
			errorResponse?.error?.detail || '',
			errorResponse?.error?.data || []
		)

		const errorMessageAlert = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger ms-2',
			},
			buttonsStyling: false,
		})
		if (!messageCustom && errorResponse) {
			errorMessageAlert
				.fire({
					title: 'Error',
					html: message,
					icon: 'warning',
					confirmButtonText: 'Entiendo',
					showCancelButton: false,
				})
				.then(result => {
					if (result.isConfirmed && llamadoAccion != null) {
						llamadoAccion()
					}
				})
		} else {
			errorMessageAlert.fire({
				title: messageCustom.title || 'Error',
				html: messageCustom.message || 'Ocurrió un error inesperado.',
				icon: messageCustom.icon || 'error',
				confirmButtonText: messageCustom.confirmButtonText || 'Entendido',
				showCancelButton: messageCustom.showCancelButton || false,
			})
		}
	}

	alertErrorOnlyMessage = (
		message: string = 'Ocurrio un error inesperado.',
		title: string = 'Error',
		confirmButtonText: string = 'Entiendo'
	): void => {
		const htmlMessage: string = `<div>${message}</div>`

		Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger ms-2',
			},
			buttonsStyling: false,
		}).fire({
			title: title,
			html: htmlMessage,
			icon: 'warning',
			confirmButtonText: confirmButtonText,
			showCancelButton: false,
		})
	}

	successStandar(text = 'Registrado exitosamente.') {
		this.toastService.success(text, '', { timeOut: 10000 })
	}

	dangerStandar(text = 'No se pudo registrar.') {
		this.toastService.error(text, '', { timeOut: 10000 })
	}

	warningStandar(text = 'No se pudo registrar.') {
		this.toastService.warning(text, '', { timeOut: 10000 })
	}

	closetoast() {
		this.toastService.clear()
	}

	closelasttoast() {
		this.toastService.remove(this.toastService.currentlyActive)
	}

	inhabilitarAlerta(messageValue = 'inhabilitar', functionCallback): void {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger ms-2',
			},
			buttonsStyling: false,
		})

		swalWithBootstrapButtons
			.fire({
				title: '¿Esta seguro que desea ' + messageValue + ' el registro?',
				icon: 'warning',
				confirmButtonText: 'Sí, ' + messageValue,
				cancelButtonText: 'No, cancelar',
				showCancelButton: true,
			})
			.then(result => {
				if (result.value) {
					functionCallback(true)
				} else {
					functionCallback(false)
				}
			})
	}

	alertaSimpleConfirmacion(
		functionCallback,
		message = '¿Esta seguro(a) que desea realizar el registro?'
	): void {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger ms-2',
			},
			buttonsStyling: false,
		})

		swalWithBootstrapButtons
			.fire({
				title: message,
				icon: 'warning',
				confirmButtonText: 'Sí, registrar',
				cancelButtonText: 'No, cancelar',
				showCancelButton: true,
			})
			.then(result => {
				if (result.value) {
					functionCallback(true)
				} else {
					functionCallback(false)
				}
			})
	}

	alertaEliminacion(messageValue = 'el registro', functionCallback): void {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger ms-2',
			},
			buttonsStyling: false,
		})

		swalWithBootstrapButtons
			.fire({
				title:
					'¿Esta seguro(a) que desea eliminar ' +
					messageValue +
					' definitivamente?',
				icon: 'warning',
				confirmButtonText: 'Sí, eliminar',
				cancelButtonText: 'No, cancelar',
				showCancelButton: true,
			})
			.then(result => {
				if (result.value) {
					functionCallback(true)
				} else {
					functionCallback(false)
				}
			})
	}

	warningMessage(mensaje) {
		Swal.fire({
			icon: 'warning',
			title: 'Oops...',
			text: mensaje,
			confirmButtonText: 'Aceptar',
		})
	}

	alertInhabilitarCierreApertura(estado, functionCallback): void {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger me-2',
        input:'ms-4'
			},
			buttonsStyling: false,
		})
		swalWithBootstrapButtons
			.fire({
				icon: 'warning',
				input: 'textarea',
				inputLabel: 'Introduzca el motivo de ' + estado + '.',
				inputPlaceholder: '...',
				confirmButtonText: 'Si, registrar',
				cancelButtonText: 'No, cancelar',
				showCancelButton: true,
        reverseButtons: true,
				inputValidator: value => {
					return (
						(!value || value.length < 4) &&
						'Debe introducir un motivo valido (minimo 4 carácteres). '
					)
				},
			})
			.then(result => {
				functionCallback(result)
			})
	}

	alertaSimpleConfirmacionBoton(
		message,
		confirmButton,
		functionCallback
	): void {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger ms-2',
			},
			buttonsStyling: false,
		})

		swalWithBootstrapButtons
			.fire({
				title: message,
				icon: 'warning',
				confirmButtonText: confirmButton,
				cancelButtonText: 'No, cancelar',
				showCancelButton: true,
			})
			.then(result => {
				if (result.value) {
					functionCallback(true)
				} else {
					functionCallback(false)
				}
			})
	}

	alertErrorOperacion(operacion, mensaje) {
		Swal.fire({
			icon: 'error',
			title: 'La operación de ' + operacion + ' ha fallado',
			text: mensaje,
			confirmButtonText: 'Aceptar',
		})
	}

	getMessageCodeError(
		codigo: number = 0,
		extramsg: any = null,
		llamado_accion: any,
		errorDetail: string = null,
		errorDataDetail: ErrorDetailDataResponseStandard[] = []
	): string {
		const msg: string[] = []
		let message: string = ''
		switch (codigo) {
			case 0:
				msg.push(`El Servidor no pudo obtener una respuesta a la solicitud.`)
				msg.push(`Es posible que el servicio no este disponible.`)
				llamado_accion = () => {
					window.location.href = '/'
				}
				break
			case 400:
				msg.push(
					`Se ha producido un inconveniente y el servidor ha respondido con el(los) siguiente(s) error(es): ${
						environment.production ? '</br>' : ''
					}`
				)
				break
			case 401:
				msg.push(
					`Usuario no autorizado, por favor inicie su sesión nuevamente.`
				)
				llamado_accion = () => window.location.reload()
				break
			case 403:
				msg.push(`Usuario no tiene los permisos necesarios.`)
				break
			case 404:
				msg.push(`No se puedo encontrar el contenido solicitado.`)
				break
			case 500:
				msg.push(
					`Error interno en servidor, no puede Intepretar, o el servicio no se encuentra disponible.`
				)
				break
			case 505:
				msg.push(
					`La versión de HTTP usada en la petición no está soportada por el servidor.`
				)
				break

			default:
				msg.push(
					`No se podido procesar su petición, refresque la pagina e intente nuevamente.`
				)
				llamado_accion = () => window.location.reload()
				break
		}
		if (!environment.production) {
			extramsg && msg.push(extramsg)
		}
		errorDetail && msg.push(`<span class="fs-6">${errorDetail}</span>`)
		if (errorDataDetail.length > 0) {
			for (const rowErrorDataDetail of errorDataDetail) {
				msg.push(
					`<p class="fs-6 text-start ms-3"><span class="fw-bold">Propiedad</span>: ${rowErrorDataDetail.propertyPath} <br/> <span class="fw-bold">Mensaje:</span> ${rowErrorDataDetail.message}</p>`
				)
			}
		}
		message = msg.join('<br>')
		return message
	}

	confirmAndContinueAlert = (
		dataImg,
		functionCallback = null,
		title: string = '¿Está seguro de enviar la información?',
		text: string = 'La información expuesta será enviada y estará sujeta a validación.'
	): void => {
		Swal.fire({
			title: title,
			text: text || '',
			html: `<div style="max-height: 80vh; overflow-y: auto;">
			${text && `<p>${text}</p>`}<img src="${URL.createObjectURL(
				dataImg || [0]
			)}" alt="Captura de Pantalla" style="max-width: 100%; height: auto;" /></div>`,
			customClass: {
				popup: 'swal2-popup',
				confirmButton: 'btn btn-success ms-2',
				cancelButton: 'btn btn-light',
			},
			width: 'auto',
			padding: '1em',
			allowOutsideClick: false,
			allowEscapeKey: false,
			showCancelButton: true,
			confirmButtonText: 'Continuar',
			cancelButtonText: 'Cancelar',
			reverseButtons: true,
			buttonsStyling: false,
		}).then(optionResponse => {
			functionCallback(optionResponse?.value ?? false)
		})
	}
}
