import { apiSlice } from './apiSlice'
import { SingleResponse, ListResponse, ErrorResponse } from './types'

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
			providesTags: (result = []) => result.map((list) => ({ type: 'Lists', id: list.id })),
			transformResponse: (responseData: ListResponse<List>) => responseData.data,
			transformErrorResponse: (errorResponse: ErrorResponse) => errorResponse.data.message
		}),
		
		getList: builder.query<List, number>({
			query: (listId) => ({
				url: `/lists/${listId}`,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			providesTags: (result) => [{ type: 'Lists', id: result?.id }],
			transformErrorResponse: (errorResponse: ErrorResponse) => errorResponse.data.message
		}),
		
		createList: builder.mutation<List, CreateList>({
			query: (list) => ({
				url: '/lists',
				method: 'POST',
				body: list,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			invalidatesTags: ['Lists'],
			// This is not currently updating lists.
			// invalidatesTags: (result) => [{ type: 'Lists', id: result.id }],
			transformErrorResponse: (errorResponse: ErrorResponse) => errorResponse.data.message
		}),
		
		updateList: builder.mutation<List, UpdateListPayload>({
			query: (payload) => ({
				// payload contains listId and update values
				url: `/lists/${payload.listId}`,
				method: 'PUT',
				body: payload.update,
			}),
			transformResponse: (responseData: SingleResponse<List>) => responseData.data,
			invalidatesTags: (result) => [{ type: 'Lists', id: result?.id }],
			transformErrorResponse: (errorResponse: ErrorResponse) => errorResponse.data.message
		}),
		
		deleteList: builder.mutation<unknown, number>({
			query: (listId) => ({
				url: `/lists/${listId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, args) => [{ type: 'Lists', id: args }],
			transformErrorResponse: (errorResponse: ErrorResponse) => errorResponse.data.message
		}),
	}),
})

export const { useGetListQuery, useGetListsQuery, useCreateListMutation, useUpdateListMutation, useDeleteListMutation } = listsSlice
