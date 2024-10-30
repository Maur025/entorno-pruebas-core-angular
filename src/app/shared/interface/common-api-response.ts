import { ResponseDataStandard } from './common-list-interface'

export interface ApiResponseStandard {
	code: number | null
	message: number | string | object | null
	pagination?: PaginatioResponse | null
	data?: ResponseDataStandard[] | ResponseDataStandard | null
	content?: ResponseDataStandard[] | ResponseDataStandard | null
	[key: string]: any
}

interface PaginatioResponse {
	[key: string]: any
}

export interface ErrorResponseStandard {
	error: ErrorDetailResponseStandard | null
	message: string | null
	status: number
	statusText: string
	url: string
	[key: string]: any
}

export interface ErrorDetailResponseStandard {
	code: number | null
	message: string
	detail?: string
	data?: ErrorDetailDataResponseStandard[]
	[key: string]: any
}

export interface ErrorDetailDataResponseStandard {
	propertyPath: any
	message: string | null
}
