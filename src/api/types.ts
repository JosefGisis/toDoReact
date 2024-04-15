export interface ListResponse<T> {
	data: T[]
}

export interface SingleResponse<T> {
	data: T
}

export interface TokenResponse {
	token: string
}

export interface ErrorResponse {
	data: { message: string}
	status: number
}