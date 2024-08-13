import { Injectable } from '@angular/core'
import * as htmlToImage from 'html-to-image'

@Injectable({
	providedIn: 'root',
})
export class ScreenshotService {
	constructor() {}

	takeScreenshot = async (elementId: string): Promise<any> => {
		const node = document.getElementById(elementId)

		const filter = (node: HTMLElement) => {
			const exclusionClasses = [
				'is-invalid',
				'invalid-feedback',
				'no-include-in-screenshot',
			]
			if (
				exclusionClasses.some(classname => node.classList?.contains(classname))
			) {
				return false
			}
			if (
				node.tagName === 'STYLE' ||
				node.tagName === 'LINK' ||
				node.tagName === 'SCRIPT' ||
				(node.tagName === 'BUTTON' && !node.classList.contains('switch'))
			) {
				return false
			}

			return true
		}

		const fontEmbedCss = await htmlToImage.getFontEmbedCSS(node)

		const options = {
			backgroundColor: '#FFFFFF',
			quality: 0.1,
			filter: filter,
			fontEmbedCss: fontEmbedCss,
			cacheBust: true,
		}

		return htmlToImage
			.toBlob(node, options)
			.catch(error => console.log('Algo salio mal', error))
	}
}
