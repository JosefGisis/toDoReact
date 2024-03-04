import { createSlice } from '@reduxjs/toolkit'

export const listsSlice = createSlice({
	name: 'activeList',
	initialState: { data: [] },
	reducers: {
		addLists: () => {},
		addList: () => {},
		updateList: () => {},
		removeList: () => {},
	},
})

export const { addList, addLists, updateList, removeList } = listsSlice.actions

export default listsSlice.reducer
