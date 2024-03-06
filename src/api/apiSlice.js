import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',

	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/api/1',
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('jwt')
			headers.set('Authorization', `Bearer ${token}`)
			return headers
		},
	}),

	tagTypes: ['User', 'Lists', 'ToDos'],

	endpoints: (builder) => ({
		/**
		 * profile queries and mutations
		 */
		getUser: builder.query({
			query: () => `/profile`,
			providesTags: 'User',
		}),

		/**
		 * Lists queries and mutations
		 */
		getLists: builder.query({
			query: () => '/lists',
			providesTags: ['Lists'],
		}),

		getList: builder.query({
			query: (listId) => ({
				url: `/lists/${listId}`,
			}),
		}),

		createList: builder.mutation({
			query: (list) => ({
				url: '/lists',
				method: 'POST',
				body: list,
			}),
			invalidatesTags: ['Lists'],
		}),

		updateList: builder.mutation({
			query: (payload) => ({
				url: `/lists/${payload.listId}`,
				method: 'PUT',
				body: payload.update,
			}),
			invalidatesTags: ['Lists'],
		}),

		deleteList: builder.mutation({
			query: (listId) => ({
				url: `/lists/${listId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Lists'],
		}),

		/**
		 * to-dos queries and mutations
		 */
		getToDos: builder.query({
			query: () => ({
				url: '/to-dos',
			}),
			providesTags: ['ToDos'],
		}),

		getToDo: builder.query({
			query: (toDoId) => ({
				url: `/to-dos/${toDoId}`,
			}),
		}),

		getToDosByList: builder.query({
			query: (membership) => ({
				url: '/to-dos/by-list',
				body: membership,
			}),
		}),

		deleteToDosByList: builder.mutation({
			query: (membership) => ({
				url: '/to-dos/by-list',
				method: 'DELETE',
				body: membership,
			}),
			invalidatesTags: ['ToDos'],
		}),

		createToDo: builder.mutation({
			query: (payload) => ({
				url: `/to-dos`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['ToDos'],
		}),

		deleteToDo: builder.mutation({
			query: (toDoId) => ({
				url: `/to-dos/${toDoId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['ToDos'],
		}),

		updateToDo: builder.mutation({
			query: (toDoId, update) => ({
				url: `/to-dos/${toDoId}`,
				method: 'PUT',
				body: update,
			}),
			invalidatesTags: ['ToDos'],
		}),
	}),
})

export const {
	useGetUserQuery,
	useGetListsQuery,
	useGetListQuery,
	useCreateListMutation,
	useUpdateListMutation,
	useDeleteListMutation,
	useGetToDosQuery,
	useGetToDosByListQuery,
	useGetToDoQuery,
	useCreateToDoMutation,
	useDeleteToDoMutation,
	useDeleteToDosByListMutation,
	useUpdateToDoMutation,
} = apiSlice
