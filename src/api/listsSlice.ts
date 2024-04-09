import { apiSlice } from './apiSlice'
import { SingleResponse, ListResponse } from './types'

export interface List {
	id: number
	title: string
	userId: number
	creationDate: string
	lastAccessed: string
	lastModified: string
}

export interface UpdateListPayload {
	listId: number
	update: UpdateList
}

export interface UpdateList {
	title?: string
}

export interface CreateList {
	title: string
}

export const listsSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLists: builder.query({
			query: () => '/lists',
			transformResponse: (responseData: ListResponse<List>) => responseData.data,
			providesTags: (result = []) => result.map((list) => ({ type: 'Lists', id: list.id })),
		}),

		getList: builder.query({
			query: (listId: number) => ({
				url: `/lists/${listId}`,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			providesTags: (result) => [{ type: 'Lists', id: result?.id }],
		}),

		createList: builder.mutation({
			// what is list?
			query: (list: CreateList) => ({
				url: '/lists',
				method: 'POST',
				body: list,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			invalidatesTags: ['Lists'],
			// This is not currently updating lists.
			// invalidatesTags: (result) => [{ type: 'Lists', id: result.id }],
		}),

		updateList: builder.mutation({
			// what is payload?
			query: (payload: UpdateListPayload) => ({
				// payload contains listId and update values
				url: `/lists/${payload.listId}`,
				method: 'PUT',
				body: payload.update,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			invalidatesTags: (result) => [{ type: 'Lists', id: result?.id }],
		}),

		deleteList: builder.mutation({
			query: (listId: number) => ({
				url: `/lists/${listId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, args) => [{ type: 'Lists', id: args }],
		}),
	}),
})

export const { useGetListQuery, useGetListsQuery, useCreateListMutation, useUpdateListMutation, useDeleteListMutation } = listsSlice
