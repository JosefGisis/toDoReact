import { configureStore } from '@reduxjs/toolkit'
import listReducer from './listSlice'
import userReducer from '../state-management/User/userReducer'

export default configureStore({
	reducer: {
		list: listReducer,
        user: userReducer, 
	},
})

console.log('hello world')
