import { useCallback, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const useToDos = () => {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const getToDos = useCallback(async (listId) => {
		setMeta({ ...meta, loading: true })
		try {
			const response = await fetch(`http://localhost:3000/api/1/lists/${listId}/to-dos`, {
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 200) {
				const json = await response.json()
				return [null, json.data]
			} 
			
			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			}

			const json = await response.json()
			throw new Error(json.message)
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return ['error getting to-dos']
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, getToDos }
}

export default useToDos
