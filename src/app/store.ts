import { configureStore } from '@reduxjs/toolkit'
import activeListReducer from './activeListSlice'
import { apiSlice } from '../api/apiSlice'

export default configureStore({
	reducer: {
		activeList: activeListReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
