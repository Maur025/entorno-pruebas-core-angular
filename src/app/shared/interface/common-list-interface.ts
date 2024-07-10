export interface FormatListInterface {
	cabeceras: HeadersListInterface
}

interface HeadersListInterface {
	[key: string]: {
		visible?: boolean
		buscable?: boolean
		buscableCheck?: boolean | null
		visibleCheck?: boolean | null
		sortable?: boolean | null
		filtrable?: boolean
		texto?: string
		colsize?: number
		filtrotipo?: string
		datos?: any[] | null
	}
}

export interface ResponseDataStandard {
	id: string | number | null
	[key: string]: any
}

export interface ResponseListDataStandard {
	code: number
	data?: ResponseDataStandard[]
	message: string
	pagination: ResponseListPagination
	content?: ResponseDataStandard[]
}

interface ResponseListPagination {
	count: number
	pages: number
}
