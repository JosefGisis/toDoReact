import { useContext, useEffect, useState } from 'react'
import AuthContext from '../state-management/Token/AuthContext'

export function useLists() {
	const [activeList, setActiveList] = useState(null)
	const [errs, setErrs] = useState(null)
	const { token } = useContext(AuthContext)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
        const controller  = new AbortController()
        const signal = controller.signal

		fetch('http://localhost:3000/api/1/lists?sortBy=last_accessed', {
			headers: {
				'content-type': 'application/json',
				authorization:
					`Bearer ${token}`,
			},
			signal: signal,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data?.status === 401 || data?.status === 400) {
					setActiveList(null)
					setErrs({ message: data?.message })
				}
				if (data?.status === 200) {
					setActiveList(data.data[0])
					setErrs(null)
				}
			})
			.catch(() => {
				setErrs({ message: 'Error creating account. Please try again later' })
			})
		
		setLoading(false)
		return () => controller.abort()
	}, [])

	return { errs, activeList, loading }
}