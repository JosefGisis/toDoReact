import { createSlice } from '@reduxjs/toolkit'

export const toDosSlice = createSlice({
	name: 'activeList',
	initialState: { data: [] },
	reducers: {
		addToDos: () => {},
		addListToDos: () => {},
		removeListToDos: () => {},
		addToDo: () => {},
		removeToDo: () => {},
		toggleToDo: () => {},
		updateToDo: () => {},
	},
})

export const { addListToDos, addToDo, addToDos, removeListToDos, removeToDo, toggleToDo, updateToDo } = toDosSlice.actions

export default toDosSlice.reducer
