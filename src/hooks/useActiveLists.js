import { useEffect, useState } from 'react'

export function useLists() {
	const [lists, setLists] = useState(null)
	const [errs, setErrs] = useState(null)

	useEffect(() => {
        const controller  = new AbortController()
        const signal = controller.signal

		fetch('http://localhost:3000/api/1/lists?sortBy=last_accessed', {
			headers: {
				'content-type': 'application/json',
				authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTcwNTYwMTcwN30.h7_k-q5Mdtmm5M5m1gDwFp-uFJjThOy6-7JaLCRFKOA',
			},
			signal: signal,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data?.status === 401 || data?.status === 400) {
					setLists(null)
					setErrs({ message: data?.message })
				}
				if (data?.status === 200) {
					setLists(data.data)
					setErrs(null)
				}
			})
			.catch(() => {
				setErrs({ message: 'Error creating account. Please try again later' })
			})

		return () => controller.abort()
	}, [])

	return { errs, lists }
}