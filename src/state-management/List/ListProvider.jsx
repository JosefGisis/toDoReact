import { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import listReducer from './listReducer.js'
import ListContext from './ListContext.js'
import LoadingPageIndicator from '../../components/LoadingPageIndicator.jsx'

// active list contains information about the active list's id, title, and creation date, .id, .title, .creationDate

const ListProvider = ({ children }) => {
	const [activeList, dispatch] = useReducer(listReducer, {})
	const [loading, setLoading] = useState(true)
	const { logout, getToken } = useAuth()
	const [errs, setErrs] = useState(null)
	const token = getToken()
	
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
				if (data.data[0]) {
					const list = data.data[0]
					dispatch({ type:  'ASSIGN', payload: { id: list.id, title: list.title, creationDate: list.creation_date } })
				}
				setLoading(false)
			})
			.catch((err) => {
				setErrs({message: err.message})
			})
	}, [])

	if (errs) return <p>Error getting your data. Please try again later.</p>

	if (loading) return <LoadingPageIndicator />

	return <ListContext.Provider value={{ activeList, dispatch }}>{children}</ListContext.Provider>
}

export default ListProvider
