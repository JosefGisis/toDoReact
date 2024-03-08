import { createSlice } from '@reduxjs/toolkit'

export const activeListToDosSlice = createSlice({
	name: 'activeList',
	initialState: { data: [] },
	reducers: {
		assignActiveListToDos: (state, action, { getState }) => {
            const activeList = getState(activeList.data)
			state.data = action.payload
		},
		removeActiveListToDos: (state) => {
			state.data = []
		},	
	},
})

export const selectActiveList = state => state.activeList.data

export const { assignActiveListToDos, removeActiveListToDos } = activeListToDosSlice.actions

export default activeListToDosSlice.reducer