import { apiSlice, transformErrorResponse } from './apiSlice'
import type { SingleResponse, ListResponse } from './types'

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
		getLists: builder.query<List[], void>({
			query: () => '/lists',
			// Provides tags is based on RTKQ documentation.
			// This method is used to solve an error where createList invalidatesTag does not
			// update cache when no lists have been create yet. I suspect it solves the issue by
			// providing the generic Lists tag to this endpoint.
			providesTags: (result) => (result?.length ? [...result.map((list) => ({ type: 'Lists' as const, id: list.id })), 'Lists'] : ['Lists']),
			transformResponse: (responseData: ListResponse<List>) => responseData.data,
			transformErrorResponse,
		}),

		getList: builder.query<List, number>({
			query: (listId) => ({
				url: `/lists/${listId}`,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			providesTags: (result) => [{ type: 'Lists', id: result?.id }],
			transformErrorResponse,
		}),

		createList: builder.mutation<List, CreateList>({
			query: (list) => ({
				url: '/lists',
				method: 'POST',
				body: list,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			invalidatesTags: ['Lists'],
			transformErrorResponse,
		}),

		updateList: builder.mutation<List, UpdateListPayload>({
			query: (payload) => ({
				url: `/lists/${payload.listId}`,
				method: 'PUT',
				body: payload.update,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			invalidatesTags: (result) => [{ type: 'Lists', id: result?.id }],
			transformErrorResponse,
		}),

		deleteList: builder.mutation<unknown, number>({
			query: (listId) => ({
				url: `/lists/${listId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (_, __, args) => [{ type: 'Lists', id: args }],
			transformErrorResponse,
		}),
	}),
})

export const { useGetListQuery, useGetListsQuery, useCreateListMutation, useUpdateListMutation, useDeleteListMutation } = listsSlice
