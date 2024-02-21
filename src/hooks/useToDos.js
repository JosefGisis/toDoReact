import { useCallback, useState } from 'react'
import { useAuth } from './useAuth'

function useToDos() {
	const [meta, setMeta] = useState({ loading: false, errors: null })
	const { logout, getToken } = useAuth()
	const token = getToken()

	const getToDos = useCallback(async () => {
		try {
			const response = await fetch('http://localhost:3000/api/1/to-dos', {
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			const json = await response.json()

			if (response.status === 200) {
				return [null, json.data]
			}

			if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			}

			console.log(json.message)
			throw new Error(json.message)
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, getToDos }
}

export default useToDos
