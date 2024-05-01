// when api provides a list of objects
export interface ListResponse<T> {
	data: T[]
}

// when api provides a single object
export interface SingleResponse<T> {
	data: T
}

// token response for when api provides a token
export interface TokenResponse {
	token: string
}

// CustomErrorType is how the application receives error objects from query api
export interface CustomErrorType {
	message: string
	status: number
	// If the error format is not identified, the originalError will contain the original error object.
	unknownError?: any
}

// StringErrorResponse and JsonErrorResponse are based on RTKQ's FetchBaseQueryError.
// StringErrorResponse is the form taken when api provides a string only. Usually the base with unauthorized requests.
export interface StringErrorResponse {
	status: number | string
	data: string
	originalStatus?: number
}

// JsonErrorResponse is the form taken when api provides JSON object
export interface JsonErrorResponse {
	status: number | string
	data: { message?: string }
	originalStatus?: number
}
