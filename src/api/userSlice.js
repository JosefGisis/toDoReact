import { apiSlice } from './apiSlice'

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
            transformResponse: responseData => responseData.data,
			providesTags: 'User',
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = userSlice

// export const selectUsersResult = userSlice.endpoints.getUsers.select()
