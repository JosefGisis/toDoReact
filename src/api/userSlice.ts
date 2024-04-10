import { apiSlice } from './apiSlice'
import { SingleResponse } from './types'

export type User = {
	id: number
	username: string
	email: string
	password: string
	creationDate: string
}

export type LoginPayload = {
	username: string
	password: string
}

export type RegisterPayload = {
	username: string
	email: string
	password: string
}

export const userSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (payload: LoginPayload) => ({
				url: '/auth/login',
				method: 'POST',
				body: payload,
			}),
		}),

		register: builder.mutation({
			query: (payload: RegisterPayload) => ({
				url: '/auth/register',
				method: 'POST',
				body: payload,
			}),
		}),

		getUser: builder.query({
			query: () => `/profile`,
			transformResponse: (responseData: SingleResponse<User>) => responseData.data,
			providesTags: ['User'],
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = userSlice
