import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomErrorType, JsonErrorResponse, StringErrorResponse } from './types'

const BASE_URL = 'http://localhost:3000/api/1'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('jwt')
			headers.set('Authorization', `Bearer ${token}`)
			return headers
		},
	}),
	tagTypes: ['User', 'Lists', 'ToDos'],
	endpoints: () => ({}),
})

// checks errorResponse type
function isStringErrorResponse(errorResponse: JsonErrorResponse | StringErrorResponse): errorResponse is StringErrorResponse {
	return typeof errorResponse.data === 'string'
}

// transformErrorResponse formats errorResponse and provides consistent interface
export const transformErrorResponse = (errorResponse: any): CustomErrorType => {
	const status = typeof errorResponse.status === 'number' ? errorResponse.status : errorResponse.originalStatus

	if (isStringErrorResponse(errorResponse)) return { message: errorResponse.data, status }
	else return { message: errorResponse.data.message, status }
}
