import { apiSlice } from './apiSlice'
import { ListResponse, SingleResponse } from './types'

export type ToDo = {
	id: number,
	title: string,
	completed: boolean, 
	creationDate: string,
	lastModified: string, 
	userId: number | null,
	dueDate: string | null,
	membership: number | null
}

export interface UpdateToDoPayload {
	toDoId: number
	update: UpdateToDo
}

export interface UpdateToDo {
	title?: string
	dueDate?: string
	completed?: boolean
	membership?: number
}

export interface CreateToDo {
	title: string
	dueDate?: string
	membership?: number
}

// interface for mutations that work with all of a lists to-dos
export interface ToDoMembershipType {
	membership: number
}

export const toDosSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getToDos: builder.query<ToDo[], void>({
			query: () => ({
				url: '/to-dos',
			}),
			transformResponse: (responseData: ListResponse<ToDo>) => responseData.data,
			providesTags: (result = []) => result.map((toDo) => ({ type: 'ToDos', id: toDo.id })),
		}),

		getToDo: builder.query<ToDo, number>({
			query: (toDoId) => ({
				url: `/to-dos/${toDoId}`,
			}),
			transformResponse: (responseData: SingleResponse<ToDo>) => responseData.data,
			providesTags: (result) => [{ type: 'ToDos', id: result?.id }],
		}),

		getToDosByList: builder.query<ToDo[], ToDoMembershipType>({
			query: (payload) => ({
				url: '/to-dos/by-list',
				body: payload,
			}),
			transformResponse: (responseData: ListResponse<ToDo>) => responseData.data,
			providesTags: (result = []) => result.map((toDo) => ({ type: 'ToDos', id: toDo.id })),
		}),

		deleteToDosByList: builder.mutation<unknown, ToDoMembershipType>({
			query: (payload) => ({
				url: '/to-dos/by-list',
				method: 'DELETE',
				body: payload,
			}),
			invalidatesTags: ['ToDos'],
		}),

		createToDo: builder.mutation<ToDo, CreateToDo>({
			query: (toDo) => ({
				url: `/to-dos`,
				method: 'POST',
				body: toDo,
			}),
			transformResponse: (responseData: SingleResponse<ToDo>) => responseData.data,
			// optimized invalidates tags is not working currently
			// invalidatesTags: (result) => [{ type: 'ToDos', id: result.id }],
			invalidatesTags: ['ToDos'],
		}),

		deleteToDo: builder.mutation<unknown, number>({
			query: (toDoId) => ({
				url: `/to-dos/${toDoId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, args) => [{ type: 'ToDos', id: args }],
		}),

		updateToDo: builder.mutation<ToDo, UpdateToDoPayload>({
			query: (payload) => ({
				url: `/to-dos/${payload.toDoId}`,
				method: 'PUT',
				body: payload.update,
			}),
			transformResponse: (responseData: SingleResponse<ToDo>) => responseData.data,
			invalidatesTags: (result) => [{ type: 'ToDos', id: result?.id }],
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
