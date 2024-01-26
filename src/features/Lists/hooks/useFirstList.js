import { useCallback, useContext, useState } from 'react'
import AuthContext from '../../../state-management/Token/AuthContext'
import { useAuth } from '../../../hooks/useAuth'

export function useFirstList() {
	const { logout } = useAuth()
	const [loading, setLoading] = useState(false)
	const [errs, setErrs] = useState(null)
	const [firstList, setFirstList] = useState({})
	const { token } = useContext(AuthContext)

	const createFirstList = useCallback(() => {
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
				title: "Tasks",
			}),
			signal: signal,
		})
			.then((res) => {
				if (res.status === 200) return res.json()
				if (res.status === 401) logout()
				throw new Error('error stuff')
			})
			.then((data) => {
				setFirstList(data.data)
				setLoading(false)
			})
			.catch((err) => {
				setErrs(err)
				setLoading(false)
			})
		return () => controller.abort()
	}, [])
	return { firstList, loading, errs, createFirstList }
}
