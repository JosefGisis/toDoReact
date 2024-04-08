import { apiSlice } from './apiSlice'
import { SingleResponse } from './types'

export type User = {
	id: number
	username: string
	email: string
	password: string
	creationDate: string
}

export const userSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (payload) => ({
				url: '/auth/login',
				method: 'POST',
				body: payload,
			}),
		}),

		register: builder.mutation({
			query: (payload) => ({
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