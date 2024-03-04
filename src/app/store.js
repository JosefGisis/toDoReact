import { configureStore } from '@reduxjs/toolkit'
import activeListReducer from './activeListSlice'
// import listsReducer from './listsSlice'
// import toDosReducer from './toDosSlice'
// import userReducer from './userSlice'
import { apiSlice } from '../api/apiSlice'

export default configureStore({
	reducer: {
		activeList: activeListReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})
