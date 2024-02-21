import { useCallback, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

export function useUpdateToDo() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const updateToDo = useCallback(async (toDoId, update) => {
		setMeta({ ...meta, loading: true })
		const url = update?.membership
		? `http://localhost:3000/api/1/lists/${update.membership}/to-dos/${toDoId}`
		: `http://localhost:3000/api/1/to-dos/${toDoId}`
		
		try {
			const { title, due_date, completed, membership } = update
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title,
					dueDate: due_date,
					completed,
					membership,
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
				return ['error updating to-do']
			}
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, updateToDo }
}
