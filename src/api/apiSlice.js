import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/http://localhost:3000/api/1' }),
	endpoints: (builder) => ({
		getLists: builder.query({
			query: () => '/lists',
		}),

		getList: builder.query({
			query: (listId) => `/lists/${listId}`,
		}),

		addList: builder.mutation({
			query: (list) => ({
				url: '/lists',
				method: 'POST',
				body: list,
			}),
		}),

		updateList: builder.mutation({
			query: (listId, update) => ({
				url: `/lists/${listId}`,
				method: 'PUT',
				body: update,
			}),
		}),
	}),
})

export const { useGetListsQuery, useGetListQuery, useAddListMutation, useUpdateListMutation } = apiSlice
