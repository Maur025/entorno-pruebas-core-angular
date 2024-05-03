import { Injectable } from '@angular/core'
import { AbstractControl, UntypedFormGroup } from '@angular/forms'
import { NotificacionService } from 'src/app/core/services/notificacion.service'

@Injectable({
	providedIn: 'root',
})
export class UtilityService {
	constructor(private notificacionService: NotificacionService) {}

	onlyNumbers = (
		name: string = '',
		event: Event,
		reactiveForm: UntypedFormGroup
	): void => {
		const inputValue: string = (event.target as HTMLInputElement).value
		const sanitizedValue: string = inputValue.replace(
			/[^\d.]|(?<=\.\d*)\./g,
			''
		)
		if (event instanceof InputEvent) {
			const inputEvent: InputEvent = event
			if (
				(/^\./.test(sanitizedValue) ||
					(/^0\d/.test(sanitizedValue) && !/^0\.\d/.test(sanitizedValue))) &&
				inputEvent.inputType !== 'deleteContentBackward' &&
				inputEvent.inputType !== 'deleteContentForward'
			) {
				this.notificacionService.warningStandar(
					'El valor parece incorrecto, podria generar problemas.'
				)
			}
		}

		reactiveForm.get(name).setValue(sanitizedValue)
	}

	convertUppercase = (
		name: string = '',
		event: Event,
		reactiveForm: UntypedFormGroup = null
	): string | void => {
		const inputElement: HTMLInputElement = event.target as HTMLInputElement
		const inputValue: string = inputElement.value
		const cursorStart: number = inputElement.selectionStart
		const cursorEnd: number = inputElement.selectionEnd

		if (reactiveForm) {
			const controlInput: AbstractControl | null = reactiveForm.get(name)
			controlInput && controlInput.setValue(inputValue.toUpperCase())
		} else {
			inputElement.setSelectionRange(cursorStart, cursorEnd)
			return inputValue.toUpperCase()
		}

		inputElement.setSelectionRange(cursorStart, cursorEnd)
	}
}
