import { apiSlice } from './apiSlice'

export const listsSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLists: builder.query({
			query: () => '/lists',
			transformResponse: responseData => responseData.data,
			providesTags: ['Lists'],
		}),
		
		getList: builder.query({
			query: (listId) => ({
				url: `/lists/${listId}`,
			}),
			transformResponse: responseData => responseData.data,
		}),
		
		createList: builder.mutation({
			query: (list) => ({
				url: '/lists',
				method: 'POST',
				body: list,
			}),
			transformResponse: responseData => responseData.data,
			invalidatesTags: ['Lists'],
		}),
		
		updateList: builder.mutation({
			query: (payload) => ({
				// payload contains listId and update values
				url: `/lists/${payload.listId}`,
				method: 'PUT',
				body: payload.update,
			}),
			transformResponse: responseData => responseData.data,
			invalidatesTags: ['Lists'],
		}),
		
		deleteList: builder.mutation({
			query: (listId) => ({
				url: `/lists/${listId}`,
				method: 'DELETE',
			}),
			transformResponse: responseData => responseData.data,
			invalidatesTags: ['Lists'],
		}),
	}),
})

export const { useGetListQuery, useGetListsQuery, useCreateListMutation, useUpdateListMutation, useDeleteListMutation } = listsSlice

// export const selectUsersResult = listsSlice.endpoints.getUsers.select()
