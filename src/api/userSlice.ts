import { apiSlice } from './apiSlice'
import type { ErrorResponse, SingleResponse, TokenResponse } from './types'

export interface User {
	id: number
	username: string
	email: string
	password: string
	creationDate: string
}

export interface LoginPayload {
	username: string
	password: string
}

export interface RegisterPayload {
	username: string
	email: string
	password: string
}

export const userSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<string, LoginPayload>({
			query: (payload) => ({
				url: '/auth/login',
				method: 'POST',
				body: payload,
			}),
			transformResponse: (responseData: TokenResponse) => responseData.token,
			transformErrorResponse: (errorResponse: ErrorResponse) => errorResponse.data.message,
		}),

		register: builder.mutation<string, RegisterPayload>({
			query: (payload) => ({
				url: '/auth/register',
				method: 'POST',
				body: payload,
			}),
			transformResponse: (responseData: TokenResponse) => responseData.token,
			transformErrorResponse: (errorResponse: ErrorResponse) => errorResponse.data.message,
		}),

		getUser: builder.query<User, void>({
			query: () => `/profile`,
			transformResponse: (responseData: SingleResponse<User>) => responseData.data,
			providesTags: ['User'],
			transformErrorResponse: (errorResponse: ErrorResponse) => errorResponse.data.message,
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = userSlice
