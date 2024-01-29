import { useCallback, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

export function useLists() {
	const { getToken, logout } = useAuth()
	const [lists, setLists] = useState(null)
	const [errs, setErrs] = useState(null)
	const [loading, setLoading] = useState(false)
	const token = getToken()

	const getLists = useCallback(() => {
		setLoading(true)
		fetch('http://localhost:3000/api/1/lists?sortBy=last_accessed&order=desc', {
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			}
		})
			.then((res) => {
				if (res.status === 200) return res.json()
				if (res.status === 401) logout()
				throw new Error()
			})
			.then((data) => {
				setLists(data.data)
				setErrs(null)
				setLoading(false)
			})
			.catch(() => {
				setLists(null)
				setErrs({ message: 'Error retrieving lists for list component' })
				setLoading(false)
			})
	}, [])

	return { loading, errs, lists, getLists }
}