import { useCallback, useState } from 'react'
import { useAuth } from './useAuth'

function useUser() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const { logout, getToken } = useAuth()
	const token = getToken()

	const getUser = useCallback(async () => {
		try {
			const response = await fetch('http://localhost:3000/api/1/profile', {
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})

			const json = await response.json()

			if (response.status === 200) {
				return [null, json.data]
			} else if (response.status === 401) {
				logout()
				setMeta({ ...meta, errors: { message: 'unauthorized user' } })
				return ['unauthorized user']
			} else {
				console.log(json.message)
				setMeta({ ...meta, errors: { message: json.message } })
				return ['error getting user']
			}
		} catch (error) {
			setMeta({ ...meta, errors: { message: error.message } })
			return [error.message]
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])
	return { meta, getUser }
}

export default useUser
