import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
	name: 'activeList',
	initialState: { data: null },
	reducers: {
		setUser: (state, action) => {
			state.data = action.payload
		},
		removeUser: (state) => {
			state.data = null
		},
	},
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer