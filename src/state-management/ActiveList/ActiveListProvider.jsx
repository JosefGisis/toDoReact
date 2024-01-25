import { useContext, useEffect, useReducer, useState } from 'react'
import activeListReducer from './activeListReducer.js'
import ActiveListContext from './ActiveListContext.js'
import LoadingPageIndicator from '../../components/LoadingPageIndicator.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import AuthContext from '../Token/AuthContext.js'

// active list contains information about the active list's id, title, and creation date, .id, .title, .creationDate

const ActiveListProvider = ({ children }) => {
	const [activeList, dispatch] = useReducer(activeListReducer, {})
	const [loading, setLoading] = useState(true)
	const { logout } = useAuth()
	const { token } = useContext(AuthContext)
	const [errs, setErrs] = useState(null)
	
	useEffect(() => {
		fetch('http://localhost:3000/api/1/lists?sortBy=last_accessed&order=desc', {
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (res.status === 200) return res.json()
				if (res.status === 401) logout()
				throw new Error('Error retrieving your data. Please try again later.')
			})
			.then((data) => {
				const list = data.data[0]
				dispatch({ type:  'ASSIGN', payload: { id: list.id, title: list.title, creationDate: list.creation_date } })
				setLoading(false)
			})
			.catch((err) => {
				setErrs({message: err.message})
			})
	}, [])

	if (errs) return <p>Error getting your data. Please try again later.</p>

	if (loading) return <LoadingPageIndicator />

	return <ActiveListContext.Provider value={{ activeList, dispatch }}>{children}</ActiveListContext.Provider>
}

export default ActiveListProvider
