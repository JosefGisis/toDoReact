import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:3000/api/1'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
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
			providesTags: 'User',
		}),

		/**
		 * Lists queries and mutations
		 */
		getLtypeists: builder.query({
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
				// payload contains listId and update values
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
			// payload contains membership param with listId
			query: (payload) => ({
				url: '/to-dos/by-list',
				body: payload,
			}),
		}),

		deleteToDosByList: builder.mutation({
			// payload contains membership param with listId
			query: (payload) => ({
				url: '/to-dos/by-list',
				method: 'DELETE',
				body: payload,
			}),
			invalidatesTags: ['ToDos'],
		}),

		createToDo: builder.mutation({
			query: (toDo) => ({
				url: `/to-dos`,
				method: 'POST',
				body: toDo,
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
			query: (payload) => ({
				url: `/to-dos/${payload.toDoId}`,
				method: 'PUT',
				body: payload.update,
			}),
			invalidatesTags: ['ToDos'],
		}),
	}),
})

export const {
	useLoginMutation,
	useRegisterMutation,
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
