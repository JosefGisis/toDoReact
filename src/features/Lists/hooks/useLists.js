import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../state-management/Token/AuthContext'
import { useAuth } from '../../../hooks/useAuth'

export function useLists() {
	const { token } = useContext(AuthContext)
	const [lists, setLists] = useState(null)
	const [errs, setErrs] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const { logout } = useAuth()

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		setIsLoading(true)
		fetch('http://localhost:3000/api/1/lists?sortBy=last_accessed&order=desc', {
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			signal: signal,
		})
			.then((res) => {
				if (res.status === 200) return res.json()
				if (res.status === 401) logout()
				throw new Error('Error retrieving your data. Please try again later.')
			})
			.then((data) => {
				setLists(data.data)
				setErrs(null)
				setIsLoading(false)
			})
			.catch(() => {
				setLists(null)
				setErrs({ message: 'Error creating account. Please try again later' })
				setIsLoading(false)
			})

		return () => controller.abort()
	}, [])

	return { isLoading, errs, lists }
}
