import { createApi } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:3000/api/1'

const customFetchBaseQuery = async (args) => {
	// depending on query is structured url may be contained in args.url or as args itself
	// Puts url in in args.url
	if (typeof args === 'string') {
		args = { url: args }
	}

	const headers = { 'content-type': 'application/json' }
	// if not in auth router adds authorization to headers
	if (args.url !== '/auth/login' && args.url !== '/auth/register') {
		const token = localStorage.getItem('jwt')
		headers.Authorization = `Bearer ${token}`
	}

	const { url, body, method } = args
	const response = await fetch(`${BASE_URL}${url}`, {
		// rtkq does not pass method for GET requests
		method: method || 'GET',
		headers,
		body: JSON.stringify(body),
	})

	if (response.status === 401) return { error: { message: 'unauthorized', status: 401 } }
	else {
		const json = await response.json()
		if (response.ok) return { data: json.data }
		else return { error: { message: json.message, status: response.status } }
	}
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: customFetchBaseQuery,
	tagTypes: ['User', 'Lists', 'ToDos'],

	endpoints: (builder) => ({
		/**
		 * profile queries and mutations
		 */
		login: builder.query({
			query: (payload) => ({
				url: '/auth/login',
				body: payload,
			}),
		}),

		register: builder.query({
			query: (payload) => ({
				url: '/auth/register',
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
