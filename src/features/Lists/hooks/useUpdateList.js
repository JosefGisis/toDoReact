import { useCallback, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

export function useUpdateList() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const updateList = useCallback(async (listId, values) => {
		setMeta({ ...meta, loading: true })
		try {
			const response = await fetch(`http://localhost:3000/api/1/lists/${listId}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title: values?.title }),
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
				return ['error deleting list']
			}
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, updateList }
}
