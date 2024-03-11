import { apiSlice } from './apiSlice'

export const toDosSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getToDos: builder.query({
			query: () => ({
				url: '/to-dos',
			}),
			transformResponse: (responseData) => responseData.data,
			providesTags: ['ToDos'],
		}),

		getToDo: builder.query({
			query: (toDoId) => ({
				url: `/to-dos/${toDoId}`,
			}),
			transformResponse: (responseData) => responseData.data,
		}),

		getToDosByList: builder.query({
			// payload contains membership param with listId
			query: (payload) => ({
				url: '/to-dos/by-list',
				body: payload,
			}),
			transformResponse: (responseData) => responseData.data,
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
			transformResponse: (responseData) => responseData.data,
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
			transformResponse: (responseData) => responseData.data,
			invalidatesTags: ['ToDos'],
		}),
	}),
})

export const {
	useGetToDosQuery,
	useGetToDoQuery,
	useGetToDosByListQuery,
	useDeleteToDosByListMutation,
	useDeleteToDoMutation,
	useCreateToDoMutation,
	useUpdateToDoMutation,
} = toDosSlice

// export const selectUsersResult = toDosSlice.endpoints.getUsers.select()
