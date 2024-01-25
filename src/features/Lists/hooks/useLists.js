import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../state-management/Token/AuthContext'

export function useLists() {
	const { token } = useContext(AuthContext)
	const [lists, setLists] = useState(null)
	const [errs, setErrs] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		setIsLoading(true)
		fetch('http://localhost:3000/api/1/lists', {
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			signal: signal,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data?.status === 401 || data?.status === 400) {
					setLists(null)
					setErrs({ message: data?.message })
					setIsLoading(false)
				}
				if (data?.status === 200) {
					setLists(data.data)
					setErrs(null)
					setIsLoading(false)
				}
			})
			.catch(() => {
				setErrs({ message: 'Error creating account. Please try again later' })
				setIsLoading(false)
			})

		return () => controller.abort()
	}, [])

	return { isLoading, errs, lists }
}