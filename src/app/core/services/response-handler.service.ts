import { Injectable } from '@angular/core'
import { ApiResponseStandard } from 'src/app/shared/interface/common-api-response'
import { ResponseDataStandard } from 'src/app/shared/interface/common-list-interface'

@Injectable({
	providedIn: 'root',
})
export class ResponseHandlerService {
	constructor() {}

	/**
	 * Handle response and returns relevant data.
	 * @param response response received from server.
	 * @returns Relevant data of response.
	 */
	handleResponseAsArray = (
		response: ApiResponseStandard
	): ResponseDataStandard[] => {
		const responseData = response?.data || response?.content || []
		return Array.isArray(responseData) ? responseData : [responseData]
	}

	/**
	 * Handle response and returns relevant data.
	 * @param response response received from server.
	 * @returns Relevant data of response.
	 */
	handleResponseAsObject = (
		response: ApiResponseStandard
	): ResponseDataStandard => {
		const responseData = response?.data || response?.content || null
		if (Array.isArray(responseData)) {
			return responseData.length > 0 ? responseData[0] : null
		}
		return responseData
	}
}
