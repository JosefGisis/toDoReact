import { useContext, useEffect, useReducer, useState } from 'react'
import activeListReducer from './activeListReducer.js'
import ActiveListContext from './ActiveListContext.js'
import AuthContext from '../Token/AuthContext.js'
import LoadingPageIndicator from '../../components/LoadingPageIndicator.jsx'

// active list contains information about the active list's id, title, and creation date, .id, .title, .creationDate

const ActiveListProvider = ({ children }) => {
	const [activeList, dispatch] = useReducer(activeListReducer, {})
	const [loading, setLoading]	= useState(true)
	const { token } = useContext(AuthContext)

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		fetch('http://localhost:3000/api/1/lists?sortBy=last_accessed', {
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			signal: signal,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data?.status === 401 || data?.status === 400) {
					console.log('problem')
				}
				if (data?.status === 200) {
					const list = data.data[0]
					dispatch({ type: 'ASSIGN', payload: { id: list.id, title: list.title, creationDate: list.creation_date } })
					setLoading(false)
				}
			})
			.catch((err) => {
				console.log(err)
			})

		return () => controller.abort()
	}, [])

	if (loading) return <LoadingPageIndicator />

	return <ActiveListContext.Provider value={{ activeList, dispatch }}>{children}</ActiveListContext.Provider>
}

export default ActiveListProvider