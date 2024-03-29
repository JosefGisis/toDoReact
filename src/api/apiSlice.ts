import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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