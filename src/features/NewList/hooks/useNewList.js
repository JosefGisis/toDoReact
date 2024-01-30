import { useCallback, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

const useNewList = () => {
	const { logout, getToken } = useAuth()
	const [loading, setLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [newList, setNewList] = useState({})
	const token = getToken()

	const createList = useCallback((data) => {
		const controller = new AbortController()
		const signal = controller.signal
		setLoading(true)

		fetch('http://localhost:3000/api/1/lists', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title: data.listTitle,
			}),
			signal: signal,
		})
			.then((res) => {
				if (res.status === 200) return res.json()
				if (res.status === 401) logout()
				throw new Error('error stuff')
			})
			.then((data) => {
				setNewList(data.data)
				setLoading(false)
			})
			.catch((err) => {
				setErrs(err)
				setLoading(false)
			})
		return () => controller.abort()
	}, [])
	return { newList, loading, errs, createList }
}

export default useNewList
