import { useCallback, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

const useToggleToDos = () => {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const toggleToDo = useCallback(async (toDo) => {
		setMeta({ ...meta, loading: true })
		const url = toDo?.membership
			? `http://localhost:3000/api/1/lists/${toDo.membership}/to-dos/${toDo.id}/toggle`
			: `http://localhost:3000/api/1/to-dos/${toDo.id}/toggle`
		try {
			const response = await fetch(url, {
                method: 'PUT',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			const json = await response.json()
			
			if (response.status === 200) return [null]

			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			}

			throw new Error(json.message)
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return ['error toggling to-do']
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, toggleToDo }
}

export default useToggleToDos
