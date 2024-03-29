import { useCallback, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function useRemoveDueDate() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const removeDueDate = useCallback(async (toDo) => {
		setMeta({ ...meta, loading: true })
		const url = toDo?.membership
			? `http://localhost:3000/api/1/lists/${toDo.membership}/to-dos/${toDo.id}`
			: `http://localhost:3000/api/1/to-dos/${toDo.id}`
		
        try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					removeDueDate: true
				}),
			})

			if (response.status === 200) {
				const json = await response.json()
				return [null, json.data]
			} else if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			} else {
				const json = await response.json()
				console.log(json.message)
				setMeta({ ...meta, errors: { message: json.message } })
				return ['error remove due-date']
			}
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, removeDueDate }
}
