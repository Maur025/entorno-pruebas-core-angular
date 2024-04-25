export interface ApiResponseStandard {
	code: number | null
	message: number | string | object | null
	[key: string]: any
	pagination?: PaginatioResponse | null
}

interface PaginatioResponse {
	[key: string]: any
}
