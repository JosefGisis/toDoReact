import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomErrorType, ErrorResponse, UnauthorizedErrorResponse } from './types'

const BASE_URL = 'http://localhost:3000/api/1'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('jwt')
			headers.set('Authorization', `Bearer ${token}-`)
			return headers
		},
	}),
	tagTypes: ['User', 'Lists', 'ToDos'],
	endpoints: () => ({}),
})

// checks if errorResponse is in unauthorized error form
function isUnauthorizedErrorResponse(errorResponse: ErrorResponse | UnauthorizedErrorResponse): errorResponse is UnauthorizedErrorResponse {
	return (typeof errorResponse.data === 'string')
}

// transformErrorResponse formats errorResponse and provides consistent interface
export const transformErrorResponse = (errorResponse: any): CustomErrorType => {
	return errorResponse
	// if (isUnauthorizedErrorResponse(errorResponse)) return { message: errorResponse.data, status: errorResponse.originalStatus}
	// else return { message: errorResponse.data.message, status: errorResponse.status}
}
