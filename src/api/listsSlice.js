import { apiSlice } from './apiSlice'

export const listsSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLists: builder.query({
			query: () => '/lists',
			transformResponse: (responseData) => responseData.data,
			providesTags: (result) => result?.map((list) => ({ type: 'Lists', id: list.id })),
		}),

		getList: builder.query({
			query: (listId) => ({
				url: `/lists/${listId}`,
			}),
			transformResponse: (responseData) => responseData.data,
			providesTags: (result) => [{ type: 'Lists', id: result.id }],
		}),

		createList: builder.mutation({
			query: (list) => ({
				url: '/lists',
				method: 'POST',
				body: list,
			}),
			transformResponse: (responseData) => responseData.data,
			invalidatesTags: ['Lists'],
			// invalidatesTags: (result) => [{ type: 'Lists', id: result.id }],
		}),

		updateList: builder.mutation({
			query: (payload) => ({
				// payload contains listId and update values
				url: `/lists/${payload.listId}`,
				method: 'PUT',
				body: payload.update,
			}),
			transformResponse: (responseData) => responseData.data,
			invalidatesTags: (result) => [{ type: 'Lists', id: result.id }],
		}),

		deleteList: builder.mutation({
			query: (listId) => ({
				url: `/lists/${listId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, args) => [{ type: 'Lists', id: args }],
		}),
	}),
})

export const { useGetListQuery, useGetListsQuery, useCreateListMutation, useUpdateListMutation, useDeleteListMutation } = listsSlice

// export const selectUsersResult = listsSlice.endpoints.getUsers.select()
