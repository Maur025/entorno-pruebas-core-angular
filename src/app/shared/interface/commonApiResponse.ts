export interface ApiResponseStandard {
	code: number | null
	message: number | string | object | null
	[key: string]: any
	pagination?: PaginatioResponse | null
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
