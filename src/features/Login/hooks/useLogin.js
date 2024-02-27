import { useCallback, useState } from 'react'
import { BASE_URL } from '../../../constants/url'

export function useLogin() {
	const [meta, setMeta] = useState({ loading: false, errors: null })

	const login = useCallback(async (values) => {
		setMeta({ ...meta, loading: true })
		try {
			const { username, password } = values
			const response = await fetch(`${BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			})

			const json = await response.json()

			if (response.status === 200) {
				setMeta({ ...meta, errors: null })
				return [null, json.token]
			}

			if (response.status === 401) {
				setMeta({ ...meta, errors: { message: json.message } })
				return [json.message]
			}

			throw new Error(json.message)
		} catch (error) {
			console.log(error.message)
			setMeta({ ...meta, errors: { message: error.message } })
			return ['Error logging in. Please try again later.']
		} finally {
			setMeta({ ...meta, loading: false })
		}
	}, [])

	return { meta, login }
}
