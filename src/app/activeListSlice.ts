import { createSlice } from '@reduxjs/toolkit'

export const activeListSlice = createSlice({
	name: 'activeList',
	initialState: { data: null },
	reducers: {
		setActiveList: (state, action) => {
			state.data = action.payload
		},
		removeActiveList: (state) => {
			state.data = null
		},	
	},
})

export const selectActiveList = (state) => state.activeList.data

export const { setActiveList, removeActiveList } = activeListSlice.actions

export default activeListSlice.reducer