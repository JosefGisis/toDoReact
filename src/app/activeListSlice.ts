import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { List } from '../api/listsSlice'
import { RootState } from './store'

export type ActiveListState = {
	data: null | List
}

const initialState: ActiveListState = {
	data: null
}

export const activeListSlice = createSlice({
	name: 'activeList',
	initialState,
	reducers: {
		setActiveList: (state, action: PayloadAction<List>) => {
			state.data = action.payload
		},
		removeActiveList: (state) => {
			state.data = null
		},	
	},
})

export const selectActiveList = (state: RootState) => state.activeList.data

export const { setActiveList, removeActiveList } = activeListSlice.actions

export default activeListSlice.reducer