import { createSlice } from '@reduxjs/toolkit'

export const activeListSlice = createSlice({
	name: 'activeList',
	initialState: {
		value: null,
	},
	reducers: {
		set: (state, action) => {
			state.value = action.payload
		},
		remove: (state) => {
			state.value = null
		},
	},
})

console.log(activeListSlice.actions.set())
export const { setActiveList, removeActiveList } = activeListSlice.actions

export default activeListSlice.reducer