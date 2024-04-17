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

// If response does not come as Json, RTKQ will throw an error. This function checks if the response is not Json and adjusts for the expected error format.
function isNotJsonErrorResponse(errorResponse: JsonErrorResponse | StringErrorResponse): errorResponse is StringErrorResponse {
	return typeof errorResponse.data === 'string' && typeof errorResponse.originalStatus === 'string'
}

// This checks if the response is a JsonErrorResponse and provides the expected errorResponse type
function isJsonErrorResponse(errorResponse: JsonErrorResponse | StringErrorResponse): errorResponse is JsonErrorResponse {
	return typeof errorResponse.data === 'object' && typeof errorResponse.data.message === 'string'
}

// transformErrorResponse formats errorResponse and provides consistent interface
export const transformErrorResponse = (errorResponse: any): CustomErrorType => {
	// Checks if we receive a status code as status or as originalStatus
	const status = typeof errorResponse?.status === 'number' ? errorResponse?.status : errorResponse?.originalStatus

	if (isNotJsonErrorResponse(errorResponse)) return { message: errorResponse.data, status }
	else if (isJsonErrorResponse(errorResponse)) return { message: errorResponse.data.message || 'Error performing request', status }
	else return { message: 'Error performing request', status: 500, originalError: errorResponse }
}